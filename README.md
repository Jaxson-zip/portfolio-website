# AI Application Portfolio

一个面向求职展示的作品集网站，包含公开作品展示页和真实可部署的 Supabase 管理后台。

## 功能

- 中文默认展示，支持中英文切换。
- 公开页面展示已发布项目、项目详情、能力证据和联系方式。
- `#/admin` 管理后台支持邮箱密码登录。
- 后台可新增、编辑、发布/隐藏、设为重点项目、删除作品。
- 项目数据来自 Supabase；未配置 Supabase 时使用本地静态数据兜底。
- Supabase RLS 已限制公开访问者只能读取已发布项目。

## 技术栈

- Vite
- React
- TypeScript
- Tailwind CSS
- Supabase Auth + Database
- Vercel

## 本地开发

```powershell
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1 --port 5174
```

打开：

```text
http://127.0.0.1:5174/
```

管理后台：

```text
http://127.0.0.1:5174/#admin
```

## Supabase 配置

1. 新建 Supabase 项目。
2. 在 SQL Editor 执行 `supabase/schema.sql`。
3. 可选：执行 `supabase/seed.example.sql` 导入一个初始项目。
4. 在 Authentication 创建第一个管理员用户。
5. 把管理员用户加入 `admin_users` 白名单。
6. 创建 `.env.local`：

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 部署

Vercel 部署时添加同样两个环境变量：

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

然后运行：

```powershell
npm.cmd run build
npx.cmd vercel --yes
```

更完整的部署说明见 [docs/deployment.md](docs/deployment.md)。

## 维护作品

部署后进入：

```text
https://your-domain.vercel.app/#admin
```

登录后新增或编辑项目。只有勾选“发布到公开作品集”的项目会被访问者看到。更多填写建议见 [docs/add-project.md](docs/add-project.md)。

## 验证命令

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run build
```
