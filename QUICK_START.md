# 🚀 30秒快速开始

## 这是什么？

一个漂亮的菜单式工具，让你在 kilo cli 中轻松安装 1320+ skills，无需记复杂命令。

## 安装和运行

### 最简单的方式（无需安装）

```bash
# 进入项目目录
cd /path/to/your/project

# 下载工具
curl -O https://raw.githubusercontent.com/your-repo/kilo-skills-manager/main/skills-manager.js

# 运行
node skills-manager.js
```

### 或者直接（在任何有 Node.js 的地方）

```bash
git clone https://github.com/your-org/kilo-skills-manager.git
cd kilo-skills-manager
node skills-manager.js
```

### 或全局安装（可选）

```bash
npm install -g .
kilo-skills
```

## 使用

启动后你会看到一个菜单：

```
🎯 Kilo Skills Manager

选择操作：
1. 浏览热门仓库和 skills
2. 搜索特定 skill
3. 快速安装预设组合  ← 推荐！
4. 列出已安装的 skills
5. 手动输入仓库地址
0. 退出
```

### 最快的方式：选择 3

选择 3 → 选择你的开发类型（Web/Python/Go/全栈/DevOps）→ 确认 → 完成！

```
快速预设（一键安装）：
1. Web 开发          → frontend-design + react + web-design + performance
2. Python 开发       → python + fastapi + testing + documentation  
3. Go 开发           → golang + optimization + testing
4. 全栈开发          → Web + Python 的组合
5. DevOps            → docker + k8s + nginx + ci-cd + monitoring
6. 文档处理          → docx + pdf + pptx + xlsx
```

## 然后在 Kilo 中使用

```bash
kilo
# 输入任务，skills 会自动激活
# > Create a React dashboard with TailwindCSS
```

## 所需条件

- ✅ Node.js 14+
- ✅ npm（随 Node 自带）
- ✅ 网络连接

## 文件说明

| 文件 | 用途 |
|------|------|
| `skills-manager.js` | 主程序（~400 行，无依赖） |
| `package.json` | npm 配置（全局安装用） |
| `run-skills-manager.sh` | 便捷启动脚本（macOS/Linux） |
| `README.md` | 完整文档 |
| `QUICK_START.md` | 本文件 |

## 常见问题

**Q: 需要安装什么依赖吗？**  
A: 不需要！纯 Node.js 内置模块，无外部依赖。

**Q: 支持什么操作系统？**  
A: Windows / macOS / Linux 完全支持。

**Q: 第一次很慢？**  
A: 第一次需要 clone 仓库（~50MB），之后会缓存。耐心等待或用搜索功能。

**Q: 如何卸载 skills？**  
A: `npx skills remove <skill-name>`

**Q: 支持自定义仓库吗？**  
A: 支持！选择菜单 5，输入自己的 GitHub 仓库地址。

## 技巧

- 💡 不确定选什么？直接选预设（菜单 3）
- 💡 安装 3-5 个针对你项目的 skills，不要贪多
- 💡 遇到问题？选菜单 4 看已安装的 skills

## 更新

保持工具最新：

```bash
# 检查 skills 有无更新
npx skills check

# 更新所有 skills
npx skills update
```

## 下一步

1. 启动工具：`node skills-manager.js`
2. 选择预设（菜单 3）
3. 在 kilo 中使用：`kilo`

---

**就这样！享受 1320+ skills 的强大功能吧！🎉**

有问题？查看 README.md 获取详细文档。
