# 作品集后台部署说明

这个项目使用 Vite + React 做公开作品集页面，使用 Supabase Auth + Supabase Database 做项目管理后台，使用 Vercel 部署前端。

## 1. 创建 Supabase 项目

1. 登录 Supabase，新建一个 Project。
2. 打开 SQL Editor。
3. 复制 `supabase/schema.sql` 的全部内容并执行。
4. 打开 Authentication，创建第一个管理员用户：
   - Email: 使用你自己的邮箱。
   - Password: 设置一个只给后台登录使用的密码。
5. 回到 SQL Editor，把这个用户加入后台白名单：

```sql
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'your-email@example.com'
on conflict (user_id) do update set email = excluded.email;
```

## 2. 配置环境变量

在 Supabase Project Settings -> API 里找到：

- Project URL
- anon public key

本地开发时创建 `.env.local`：

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

部署到 Vercel 时，在 Project Settings -> Environment Variables 添加同样两个变量。

## 3. 权限设计

`supabase/schema.sql` 已经包含 RLS 策略：

- 未登录访问者：只能读取 `published = true` 的项目。
- 登录且存在于 `admin_users` 白名单的用户：可以读取、创建、编辑和删除全部项目。
- 已登录但不在白名单的用户：不能进入后台管理数据。
- 公开作品集页面：只加载已发布项目。
- 管理后台：通过 `#/admin` 进入，登录后管理全部项目。

## 4. 发布第一个项目

1. 启动本地项目：`npm.cmd run dev -- --host 127.0.0.1 --port 5174`
2. 打开 `http://127.0.0.1:5174/#admin`
3. 使用 Supabase Auth 中创建、并写入 `admin_users` 白名单的邮箱和密码登录。
4. 新增项目，填写中英文标题、简介、问题、方案、成果和技术栈。
5. 勾选“发布到公开作品集”后保存。

## 5. 部署到 Vercel

### 方式 A：Vercel CLI

```powershell
npm.cmd install
npm.cmd run build
npx.cmd vercel login
npx.cmd vercel --yes
```

如果你已经有 Vercel Token，也可以不走浏览器登录：

```powershell
$env:VERCEL_TOKEN="your-vercel-token"
npx.cmd vercel --yes --token $env:VERCEL_TOKEN
```

生产部署：

```powershell
npx.cmd vercel --yes --prod --token $env:VERCEL_TOKEN
```

### 方式 B：Vercel Dashboard

1. 把 `portfolio-website` 推到 GitHub 仓库。
2. 打开 Vercel，选择 Add New Project。
3. 导入 GitHub 仓库。
4. Framework Preset 选择 Vite。
5. Build Command 使用 `npm run build`。
6. Output Directory 使用 `dist`。
7. 添加环境变量 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。
8. 点击 Deploy。

`vercel.json` 已经写好 Vite 构建配置，Vercel 通常会自动识别。

## 6. 后续维护

- 新作品：进入 `#/admin` 新增项目。
- 暂时不展示：取消“发布到公开作品集”。
- 首页重点项目：勾选“设为重点项目”。
- 排序：调小“排序”数字会更靠前。
- 公开链接：填写 Demo 链接后，项目卡片会优先打开真实项目；没有 Demo 但有源码链接时，会优先打开源码。

## 7. 上线前检查

本地检查：

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run build
```

线上检查：

1. 打开 Vercel 预览地址，确认首页可以访问。
2. 滚动到项目区域，确认已上线项目会显示“访问在线项目”，未上线项目会显示“项目待上线”。
3. 打开 `/#admin`，确认能看到登录页。
4. 使用 Supabase 管理员账号登录。
5. 新增一个测试项目，勾选发布，保存。
6. 回到首页，确认测试项目出现，并按 Demo/源码链接显示正确入口。
7. 回后台删除测试项目。
