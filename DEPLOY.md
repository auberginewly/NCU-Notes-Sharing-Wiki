# 部署说明

本项目使用 Tencent CloudBase GitHub Action 自动部署到腾讯云开发环境。

## 📋 前置准备

### 1. 创建腾讯云开发环境

1. 访问 [腾讯云开发控制台](https://console.cloud.tencent.com/tcb)
2. 创建新环境（如果还没有）
3. 记录环境 ID（envId）

### 2. 获取访问密钥

1. 访问 [腾讯云访问管理](https://console.cloud.tencent.com/cam/capi)
2. 创建 API 密钥或使用现有密钥
3. 记录 `SecretId` 和 `SecretKey`

⚠️ **重要**：请妥善保管密钥，不要泄露！

## 🔐 配置 GitHub Secrets

在 GitHub 仓库中设置以下 Secrets：

1. 进入仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 添加以下三个 Secret：

| Secret 名称 | 说明 | 获取位置 |
|------------|------|---------|
| `TCB_SECRET_ID` | 腾讯云 SecretId | [访问管理控制台](https://console.cloud.tencent.com/cam/capi) |
| `TCB_SECRET_KEY` | 腾讯云 SecretKey | [访问管理控制台](https://console.cloud.tencent.com/cam/capi) |
| `TCB_ENV_ID` | 云开发环境 ID | [云开发控制台](https://console.cloud.tencent.com/tcb) |

> 💡 **多环境提示**：如果需要部署到多个环境（如开发、生产），可以创建不同的 Secret，例如 `TCB_ENV_ID_DEV` 和 `TCB_ENV_ID_PROD`。

## 🚀 自动部署

配置完成后，当你：

- **推送代码到 main 分支**时，会自动触发部署
- **手动触发**：在 Actions 页面可以手动运行 workflow

## 📁 配置文件说明

### `.github/workflows/deploy.yml`

GitHub Actions workflow 配置文件，定义了：
- 触发条件（push 到 main 分支）
- 构建步骤（安装依赖、构建 VitePress）
- 部署步骤（使用 CloudBase CLI 直接部署到静态托管）

部署流程：
1. 安装 CloudBase CLI
2. 使用 API 密钥登录
3. 直接部署构建产物到静态托管：`tcb hosting deploy ./docs/.vitepress/dist / -e ${{ secrets.TCB_ENV_ID }}`

## 🔍 查看部署状态

1. 进入 GitHub 仓库的 **Actions** 标签页
2. 查看最新的 workflow 运行状态
3. 如果部署成功，可以在云开发控制台查看网站地址

## 📝 相关链接

- [Tencent CloudBase GitHub Action](https://github.com/marketplace/actions/tencent-cloudbase-github-action)
- [云开发控制台](https://console.cloud.tencent.com/tcb)
- [CloudBase Framework 文档](https://docs.cloudbase.net/framework/)

