# 🎯 Kilo Skills Manager - 交互式 Skills 管理工具

一个优雅的终端工具，让你在 Kilo CLI 中轻松搜索、浏览和安装 **1320+ skills**。

## ✨ 特性

- 🎨 **漂亮的 TUI 界面** - 菜单式导航，彩色输出
- 🔍 **快速搜索** - 在 1320+ skills 中快速查找
- 📦 **热门仓库** - 预配置 4 个主要 skills 仓库
- ⚡ **快速预设** - 一键安装预定义的 skill 组合
  - Web 开发套件
  - Python 开发套件  
  - Go 开发套件
  - 全栈开发套件
  - DevOps 套件
  - 文档处理套件
- 🤖 **多代理支持** - 安装到 kilo、Claude Code、Cursor 等
- 🎯 **超简单** - 无需记复杂命令

## 📥 安装

### 方式 1：直接运行（推荐）

```bash
# 无需安装，直接运行
node skills-manager.js

# 或用 npx
npx skills-manager
```

### 方式 2：全局安装（可选）

```bash
# 克隆或下载本项目
git clone https://github.com/zss66/kilo-skills-manager.git
cd kilo-skills-manager

# 全局安装
npm install -g .

# 之后直接使用
kilo-skills
# 或
skills-manager
```

### 方式 3：放在 kilo 项目目录中

```bash
# 放到你的 kilo 项目根目录
cp skills-manager.js /path/to/your/project/

# 在项目目录运行
node skills-manager.js
```

## 🚀 快速开始

### 启动工具

```bash
node skills-manager.js
```

### 你会看到这样的菜单：

```
╔═══════════════════════════════════════════╗
║   🎯 Kilo Skills Manager                  ║
╚═══════════════════════════════════════════╝

选择操作：
1. 浏览热门仓库和 skills
2. 搜索特定 skill
3. 快速安装预设组合
4. 列出已安装的 skills
5. 手动输入仓库地址
0. 退出
```

## 📖 使用示例

### 示例 1：安装 React 开发套件

```
启动 → 选择 3 (快速预设) → 选择 1 (Web 开发套件) → 确认 → 完成
```

自动安装：
- frontend-design
- react-best-practices
- web-design-guidelines
- performance-optimization

### 示例 2：搜索 "api" 相关 skills

```
启动 → 选择 2 (搜索) → 输入 "api" → 查看结果 → 选择安装 → 完成
```

### 示例 3：浏览 Anthropic 官方仓库

```
启动 → 选择 1 (浏览仓库) → 选择 "anthropics/skills" 
→ 选择 "搜索" 或 "浏览全部" → 选择 skills → 完成
```

## 🎨 菜单详解

### 1️⃣ 浏览热门仓库和 Skills

列出 4 个预配置的流行仓库：

| 仓库 | Skills 数 | 描述 |
|------|----------|------|
| sickn33/antigravity-awesome-skills | 1320+ | 最大的社区 skills 库 |
| anthropics/skills | 18 | Anthropic 官方高质量 skills |
| vercel-labs/agent-skills | 6 | Vercel React/Next.js skills |
| ComposioHQ/awesome-claude-skills | 500+ | ComposioHQ 社区精选 |

选择一个仓库后，可以：
- 搜索 skills
- 安装指定 skills
- 浏览全部 skills（显示前 50 个）

### 2️⃣ 搜索特定 Skill

快速在 1320+ skills 中查找：

```
输入关键词 → 查看结果 (最多 20 个) → 选择安装
```

支持搜索：
- `react` - React 相关
- `api` - API 设计
- `test` - 测试
- `python` - Python 开发
- `docker` - Docker/容器
- 任何其他关键词...

### 3️⃣ 快速安装预设

一键安装预定义的 skill 组合：

#### Web 开发
```
frontend-design
react-best-practices
web-design-guidelines
performance-optimization
```

#### Python 开发
```
python-best-practices
fastapi
testing
documentation
```

#### Go 开发
```
golang
performance-optimization
testing
```

#### 全栈开发
```
frontend-design
react-best-practices
fastapi
api-design
testing
```

#### DevOps
```
docker
kubernetes
nginx-configuration
ci-cd
monitoring
```

#### 文档处理 (Anthropic)
```
docx
pdf
pptx
xlsx
```

### 4️⃣ 列出已安装的 Skills

显示已安装的所有 skills：

```bash
npx skills list
```

### 5️⃣ 手动输入

如果你知道：
- 仓库地址 (owner/repo)
- 要安装的 skills 名称

可以直接输入。

## ⚙️ 工作原理

这个工具实际上是对 `npx skills add` 的友好包装：

```
你的选择 
  ↓
工具解析并生成命令
  ↓
执行 npx skills add ... -y
  ↓
Skills 安装完成
```

所以它需要：
- Node.js 14+
- npm（内置）
- 网络连接（用于 Clone 仓库和下载 skills）

## 🎯 在 Kilo 中使用已安装的 Skills

安装后，在 kilo 中使用很简单：

```bash
kilo

# 在提示符下输入任务，skills 会自动激活：
# > Create a React dashboard with TailwindCSS
# 
# → frontend-design skill 自动激活
# → react-best-practices skill 自动激活
# → performance-optimization 可能被使用
```

或显式调用：

```bash
# > /frontend-design Create a landing page
```

## 💡 技巧和建议

### 1. 首次使用 - 推荐预设

如果你不确定选什么，直接用快速预设：
- Web 开发者？→ 选择 "Web 开发套件"
- Python 后端？→ 选择 "Python 开发套件"
- 全栈？→ 选择 "全栈开发套件"

### 2. 避免安装过多

不要一次安装几百个 skills。推荐：
- **最小化**：3-5 个针对你当前项目的 skills
- **均衡**：8-12 个用于多种任务
- **最大**：20+ 个用于全面功能（可能会拖累性能）

### 3. 搜索关键词

使用具体的关键词：

| 任务 | 搜索关键词 |
|------|----------|
| 构建 UI | frontend, react, design |
| 写 API | api, rest, fastapi |
| 测试代码 | test, testing, jest |
| 优化性能 | performance, optimization |
| 部署应用 | docker, deploy, ci-cd |

### 4. 组合使用

多个 skills 可以组合使用：

```bash
# Web 项目：frontend-design + react-best-practices + testing
# 后端项目：fastapi + api-design + testing
# DevOps：docker + kubernetes + ci-cd + monitoring
```

## 🔧 常见问题

### Q: 为什么第一次搜索这么慢？

A: 第一次需要 clone 整个仓库（~50-100MB），后续会缓存。

**解决方案**：耐心等待，或预先在项目目录运行：
```bash
git clone https://github.com/sickn33/antigravity-awesome-skills.git --depth 1
```

### Q: 如何卸载 skills？

A: 使用 Vercel 的官方工具：
```bash
npx skills remove <skill-name>
```

### Q: 能在 CI/CD 中使用吗？

A: 可以，加 `-y` 跳过交互：
```bash
echo "3" | node skills-manager.js  # 自动选择预设
```

### Q: 支持 Windows 吗？

A: 完全支持。颜色输出在 Windows Terminal、PowerShell 7+ 中正常工作。

### Q: 如何创建自己的 skills？

A: 
```bash
npx skills init my-custom-skill
# 编辑 my-custom-skill/SKILL.md
# 放到 ~/.kilocode/skills/my-custom-skill
```

## 📊 支持的仓库

### 内置仓库（开箱即用）

- **sickn33/antigravity-awesome-skills** (1320+)
- **anthropics/skills** (18)
- **vercel-labs/agent-skills** (6)
- **ComposioHQ/awesome-claude-skills** (500+)

### 自定义仓库

任何包含有效 SKILL.md 的 GitHub 仓库都可以用：

```
输入仓库地址 → 输入 skills 名称 → 安装
```

## 🚀 下一步

### 推荐工作流

1. **启动工具** - `node skills-manager.js`
2. **选择预设** - 基于你的开发方向
3. **验证安装** - `npx skills list`
4. **在 Kilo 中使用** - `kilo` 然后描述任务

### 优化建议

- 将此脚本加到 ~/.bashrc 或 ~/.zshrc：
  ```bash
  alias kilo-skills="node /path/to/skills-manager.js"
  ```

- 定期更新 skills：
  ```bash
  npx skills update
  ```

- 定期检查有无更新：
  ```bash
  npx skills check
  ```

## 📝 许可证

MIT License

## 🙏 致谢

- Vercel 的 `npx skills` CLI
- Anthropic 的 Agent Skills 规范
- 社区贡献的 1320+ skills

---

**Happy Coding! 🎉**

有任何问题或建议，欢迎反馈！
