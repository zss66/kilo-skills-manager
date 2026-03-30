#!/bin/bash

# Kilo Skills Manager 快速启动脚本
# 用途：在任何地方快速运行 skills manager

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MANAGER_SCRIPT="$SCRIPT_DIR/skills-manager.js"

# 检查文件是否存在
if [ ! -f "$MANAGER_SCRIPT" ]; then
    echo "❌ 错误：找不到 skills-manager.js"
    echo "请确保 skills-manager.js 与此脚本在同一目录"
    exit 1
fi

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未安装 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

# 运行工具
node "$MANAGER_SCRIPT" "$@"
