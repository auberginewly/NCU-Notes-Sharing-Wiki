# 宝塔面板部署指南

使用 GitHub Actions 自动部署到宝塔面板服务器。

## 📋 部署流程

```
GitHub Actions → 构建 VitePress → SSH 上传到宝塔服务器 → Nginx 服务静态文件
```

## 🔧 宝塔面板配置步骤

### 步骤 1：在宝塔面板创建网站

1. **登录宝塔面板**
   - 访问 `http://你的服务器IP:8888`
   - 使用账号密码登录

2. **添加网站**
   - 点击左侧菜单"网站" → "添加站点"
   - **域名**：填写你的域名（如 `ncu-ns-wiki.auberginewly.site`）
   - **根目录**：`/www/wwwroot/ncu-notes-sharing-wiki`（或自定义路径）
   - **PHP版本**：选择"纯静态"（不需要 PHP）
   - 点击"提交"

3. **记录部署路径**
   - 记住你设置的网站根目录路径
   - 后续需要配置到 GitHub Secrets

### 步骤 2：配置 SSH 密钥

#### 2.1 在本地生成 SSH 密钥对

```bash
# 生成密钥对
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_deploy

# 会生成两个文件：
# ~/.ssh/github_actions_deploy      (私钥，给 GitHub)
# ~/.ssh/github_actions_deploy.pub (公钥，给服务器)
```

#### 2.2 将公钥添加到服务器

**方法一：通过宝塔面板（推荐）**
1. 宝塔面板 → "安全" → "SSH管理"
2. 点击"添加密钥"
3. 复制公钥内容：
   ```bash
   cat ~/.ssh/github_actions_deploy.pub
   ```
4. 粘贴到宝塔面板，保存

**方法二：通过 SSH 命令**
```bash
# 登录服务器
ssh root@你的服务器IP

# 添加公钥
mkdir -p ~/.ssh
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

#### 2.3 测试 SSH 连接

```bash
# 使用私钥测试连接
ssh -i ~/.ssh/github_actions_deploy root@你的服务器IP
```

如果能成功连接，说明配置正确。

### 步骤 3：配置 GitHub Secrets

在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `SERVER_HOST` | 服务器 IP 地址或域名 | `123.456.789.0` |
| `SERVER_USER` | SSH 用户名（通常是 `root`） | `root` |
| `SERVER_SSH_KEY` | SSH 私钥内容 | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SERVER_PORT` | SSH 端口（默认 22） | `22` |
| `SERVER_DEPLOY_PATH` | 宝塔网站根目录 | `/www/wwwroot/ncu-notes-sharing-wiki` |
| `VITEPRESS_BASE` | 网站路径（根路径用 `/`） | `/` |

#### 获取 SSH 私钥内容：

```bash
# 在本地查看私钥
cat ~/.ssh/github_actions_deploy

# 复制全部内容（包括 -----BEGIN 和 -----END 行）
# 粘贴到 GitHub Secret SERVER_SSH_KEY
```

### 步骤 4：配置 DNS 解析

在 DNSPod 或你的 DNS 服务商配置：

```
记录类型：A
主机记录：@（根域名）或 wiki（子域名）
记录值：你的服务器 IP 地址
TTL：600
```

### 步骤 5：配置 SSL 证书（推荐）

1. **在宝塔面板申请 SSL**
   - 网站设置 → "SSL"
   - 选择"Let's Encrypt"免费证书
   - 点击"申请"
   - 申请成功后，开启"强制 HTTPS"

2. **或使用其他证书**
   - 上传你的 SSL 证书文件
   - 配置证书路径

### 步骤 6：配置伪静态（支持 SPA 路由）

1. **在宝塔面板配置**
   - 网站设置 → "伪静态"
   - 添加以下规则：
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
   - 点击"保存"

2. **说明**
   - 这个配置让 VitePress 的单页应用路由正常工作
   - 访问 `/learning-resources/test` 时会正确显示内容

### 步骤 7：测试部署

1. **推送代码到 main 分支**
   ```bash
   git add .
   git commit -m "Setup Baota deployment"
   git push origin main
   ```

2. **查看 GitHub Actions**
   - 进入仓库的 "Actions" 标签
   - 查看部署进度
   - 如果失败，查看日志排查问题

3. **访问网站**
   - 部署成功后，访问你的域名
   - 如果配置了 SSL，使用 HTTPS 访问

## 🔧 高级配置

### 配置 Nginx 缓存（可选）

在宝塔面板中：

1. 网站设置 → "配置文件"
2. 在 `server` 块中添加：

```nginx
# 静态资源缓存
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

3. 点击"保存"并"重载配置"

### 配置安全头（可选）

在 Nginx 配置文件中添加：

```nginx
# 安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

## 📝 配置检查清单

- [ ] 在宝塔面板创建了网站
- [ ] 记录了网站根目录路径
- [ ] 生成了 SSH 密钥对
- [ ] 将公钥添加到服务器
- [ ] 配置了所有 GitHub Secrets
- [ ] 测试了 SSH 连接
- [ ] 配置了 DNS 解析
- [ ] 配置了 SSL 证书（可选但推荐）
- [ ] 配置了伪静态规则
- [ ] 推送代码测试了自动部署

## 🔍 常见问题

### Q: 部署后文件权限问题？

**解决**：
- GitHub Actions 会自动设置权限为 `www:www` 和 `755`
- 如果还有问题，在宝塔面板中手动设置：
  - 文件管理 → 选择目录 → 权限 → 设置为 `755`

### Q: 如何查看部署日志？

**方法**：
1. GitHub Actions 日志：仓库 → Actions → 查看运行记录
2. Nginx 错误日志：宝塔面板 → 网站 → 设置 → 日志

### Q: 如何手动部署？

**方法**：
1. 在本地构建：`pnpm docs:build`
2. 使用宝塔文件管理器上传 `docs/.vitepress/dist` 的内容
3. 或使用 SFTP 工具上传

### Q: 宝塔面板的默认路径是什么？

**常见路径**：
- 网站根目录：`/www/wwwroot/域名`
- Nginx 配置：`/www/server/panel/vhost/nginx/域名.conf`
- 日志目录：`/www/wwwlogs/`

### Q: SSH 连接失败怎么办？

**排查步骤**：
1. 检查服务器 IP 和端口是否正确
2. 检查 SSH 密钥是否正确配置
3. 检查服务器防火墙是否开放 SSH 端口
4. 在宝塔面板检查 SSH 服务是否运行

## 🎯 快速开始总结

1. ✅ 宝塔面板创建网站
2. ✅ 生成 SSH 密钥对
3. ✅ 公钥添加到服务器，私钥添加到 GitHub Secrets
4. ✅ 配置 GitHub Secrets（服务器信息）
5. ✅ 配置 DNS 解析
6. ✅ 推送代码自动部署

## 🔗 相关链接

- [宝塔面板官网](https://www.bt.cn/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

