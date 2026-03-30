# Kilo CLI + Skills 完整使用指南

## 快速开始

### 1. 安装最大的 Skills 仓库（1320+ skills）

```bash
# 直接用列表交互式安装
npx skills add sickn33/antigravity-awesome-skills -a kilo
```

这会显示一个交互式列表，你可以用**空格**选择要安装的 skills，然后按**回车**确认。

### 2. 其他大型 Skills 仓库选项

如果你想从不同的仓库选择，这些都有大量 skills：

```bash
# Anthropic 官方仓库（18 个高质量 skills）
npx skills add anthropics/skills -a kilo

# ComposioHQ 社区仓库
npx skills add ComposioHQ/awesome-claude-skills -a kilo

# Vercel 官方仓库（6 个高质量 skills）
npx skills add vercel-labs/agent-skills -a kilo
```

---

## 实用命令参考

### 查看可用的 Skills 列表

```bash
# 列出并可交互选择（显示 skill 描述）
npx skills add sickn33/antigravity-awesome-skills --list -a kilo

# 安装特定的 skills
npx skills add sickn33/antigravity-awesome-skills --skill frontend-design --skill code-review -a kilo

# 安装所有 skills
npx skills add sickn33/antigravity-awesome-skills --all -a kilo
```

### 查看已安装的 Skills

```bash
# 列出所有已安装的 skills
npx skills list

# 查看全局 skills
npx skills list --global

# 查看项目级 skills
npx skills list --local
```

### 更新和管理 Skills

```bash
# 检查是否有更新
npx skills check

# 更新所有 skills
npx skills update

# 删除某个 skill
npx skills remove frontend-design

# 交互式删除（选择要删除的）
npx skills remove
```

---

## 在 Kilo CLI 中使用 Skills

### 方式 1：自动触发（推荐）
当你描述任务时，kilo 会自动检测并使用相关的 skills：

```bash
kilo
# 输入你的任务，比如：
# > Create a beautiful React dashboard with Tailwind CSS
# → frontend-design skill 会自动激活
```

### 方式 2：显式调用
使用斜杠命令显式调用某个 skill：

```bash
kilo
# > /frontend-design Create a landing page
```

### 方式 3：组合多个 Skills
kilo 可以在一个任务中自动组合多个相关的 skills：

```bash
kilo
# > Build a TypeScript API with documentation and tests
# → 会自动使用 typescript, api-design, testing 等 skills
```

---

## 推荐的 Skills 组合（针对你的开发场景）

### SeekWeb4 项目
```bash
npx skills add sickn33/antigravity-awesome-skills \
  --skill fastapi \
  --skill python-best-practices \
  --skill api-design \
  --skill testing \
  --skill documentation \
  -a kilo
```

### QuantClaw 项目
```bash
npx skills add sickn33/antigravity-awesome-skills \
  --skill python-best-practices \
  --skill data-analysis \
  --skill trading-systems \
  --skill performance-optimization \
  -a kilo
```

### 前端/UI 项目
```bash
npx skills add sickn33/antigravity-awesome-skills \
  --skill frontend-design \
  --skill react-best-practices \
  --skill performance-optimization \
  --skill accessibility \
  -a kilo
```

### VPN/基础设施项目
```bash
npx skills add sickn33/antigravity-awesome-skills \
  --skill golang \
  --skill nginx-configuration \
  --skill docker \
  --skill security \
  -a kilo
```

---

## Skills 的存储位置

安装后，skills 会存放在：

```
~/.kilocode/skills/           # 全局 skills
<your-project>/.kilocode/     # 项目级 skills
```

你也可以手动编辑或添加自定义 skills 到这些目录。

---

## 创建自定义 Skills

如果现有 skills 不满足需求，可以创建自己的：

```bash
# 创建一个新 skill
npx skills init my-custom-skill

# 这会创建：
# my-custom-skill/
# └── SKILL.md (包含 YAML 前置和 markdown 说明)
```

### SKILL.md 格式示例

```yaml
---
name: my-custom-skill
description: Brief description of what this skill does and when to use it
---

# My Custom Skill

## When to Use
这个 skill 应该在以下情况被使用...

## Instructions
当这个 skill 被激活时，遵循以下步骤...

### Step 1
...

### Step 2
...
```

---

## 常见问题

### Q: 如何知道哪些 skills 可用？
A: 使用 `npx skills add <repo> --list` 查看完整列表和描述

### Q: 能在多个项目间共享 skills 吗？
A: 可以！全局 skills (`~/.kilocode/skills/`) 对所有项目可用
   项目级 skills (`.kilocode/skills/`) 仅对该项目可用

### Q: Skills 会占用多少空间？
A: 每个 skill 很小（通常 1-10KB），总共 1000+ skills 可能需要 50-100MB

### Q: 如何更新已安装的 skills？
A: 运行 `npx skills update` 或 `npx skills update <skill-name>`

### Q: 在 CI/CD 中安装 skills 怎么做？
A: 使用 `-y` 跳过交互：
   ```bash
   npx skills add sickn33/antigravity-awesome-skills \
     --skill frontend-design \
     -a kilo \
     -y
   ```

---

## 参考链接

- **Vercel Skills CLI**: https://github.com/vercel-labs/skills
- **Skills.sh Directory**: https://skills.sh
- **Antigravity Awesome Skills**: https://github.com/sickn33/antigravity-awesome-skills
- **Anthropic Skills**: https://github.com/anthropics/skills

---

## 总结

✅ **最快开始**：
```bash
npx skills add sickn33/antigravity-awesome-skills -a kilo
```

✅ **看完整列表**：
```bash
npx skills add sickn33/antigravity-awesome-skills --list -a kilo
```

✅ **在 kilo 中使用**：
```bash
kilo
# 输入任务，skills 会自动激活
```

现在你可以开始在 kilo cli 中使用 1320+ skills 了！🚀
