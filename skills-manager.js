#!/usr/bin/env node

/**
 * Interactive Skills Manager for Kilo CLI
 * 一个简单但强大的 skills 搜索和安装工具
 * 
 * 使用方法：
 * node skills-manager.js
 * 或 npm install -g && skills-manager
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// 预定义的常用 skills
const POPULAR_SKILLS = {
  'sickn33/antigravity-awesome-skills': {
    count: 1320,
    description: '最大的 skills 仓库，包含 1320+ 社区 skills',
    categories: ['All', 'Development', 'AI', 'DevOps', 'Design', 'Data', 'Security'],
    popular: ['frontend-design', 'code-review', 'testing', 'api-design', 'python-best-practices']
  },
  'anthropics/skills': {
    count: 18,
    description: 'Anthropic 官方 skills，高质量文档和工具集成',
    categories: ['Document', 'API', 'Code', 'Design'],
    popular: ['docx', 'pdf', 'pptx', 'xlsx', 'frontend-design', 'api-design']
  },
  'vercel-labs/agent-skills': {
    count: 6,
    description: 'Vercel 官方 skills，React/Next.js 优化',
    categories: ['React', 'Next.js', 'Deployment', 'Performance'],
    popular: ['react-best-practices', 'next-best-practices', 'web-design-guidelines']
  },
  'ComposioHQ/awesome-claude-skills': {
    count: 500,
    description: '社区精选 skills',
    categories: ['All', 'Integration', 'Automation'],
    popular: []
  }
};

const REPOSITORIES = {
  'sickn33/antigravity-awesome-skills': '1320+ 社区 skills 的最大库',
  'anthropics/skills': 'Anthropic 官方高质量 skills',
  'vercel-labs/agent-skills': 'Vercel React/Next.js skills',
  'ComposioHQ/awesome-claude-skills': 'ComposioHQ 社区精选',
};

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

function clearScreen() {
  console.clear();
}

function header(title) {
  console.log('\n' + colors.bright + colors.cyan + '╔' + '═'.repeat(title.length + 2) + '╗' + colors.reset);
  console.log(colors.bright + colors.cyan + '║ ' + title + ' ║' + colors.reset);
  console.log(colors.bright + colors.cyan + '╚' + '═'.repeat(title.length + 2) + '╝' + colors.reset + '\n');
}

function showMainMenu() {
  clearScreen();
  header('🎯 Kilo Skills Manager');
  
  console.log(colors.bright + '选择操作：' + colors.reset);
  console.log('1. 浏览热门仓库和 skills');
  console.log('2. 搜索特定 skill');
  console.log('3. 快速安装预设组合');
  console.log('4. 列出已安装的 skills');
  console.log('5. 手动输入仓库地址');
  console.log('0. 退出\n');
}

async function browsRepositories() {
  clearScreen();
  header('📦 热门 Skills 仓库');
  
  const repos = Object.entries(POPULAR_SKILLS);
  repos.forEach((entry, idx) => {
    const [repo, info] = entry;
    console.log(`${colors.bright}${idx + 1}.${colors.reset} ${repo}`);
    console.log(`   ${colors.dim}${info.description}${colors.reset}`);
    console.log(`   ${colors.yellow}📊 ${info.count} skills${colors.reset}\n`);
  });
  
  const choice = await question(`${colors.bright}选择仓库 (1-${repos.length}) 或 0 返回: ${colors.reset}`);
  
  if (choice === '0') return;
  
  const selectedRepo = repos[parseInt(choice) - 1];
  if (selectedRepo) {
    await browseRepoSkills(selectedRepo[0], selectedRepo[1]);
  }
}

async function browseRepoSkills(repo, info) {
  clearScreen();
  header(`📚 ${repo}`);
  
  console.log(colors.dim + info.description + colors.reset);
  console.log(`${colors.yellow}共 ${info.count} 个 skills${colors.reset}\n`);
  
  if (info.popular && info.popular.length > 0) {
    console.log(colors.bright + '⭐ 热门 skills:' + colors.reset);
    info.popular.slice(0, 5).forEach((skill, idx) => {
      console.log(`   ${idx + 1}. ${colors.magenta}${skill}${colors.reset}`);
    });
    console.log();
  }
  
  console.log(colors.bright + '选项:' + colors.reset);
  console.log('1. 搜索此仓库的 skills');
  console.log('2. 安装指定 skills');
  console.log('3. 浏览全部 skills (列表很长，请谨慎)');
  console.log('0. 返回\n');
  
  const choice = await question('选择: ');
  
  switch(choice) {
    case '1':
      await searchInRepository(repo);
      break;
    case '2':
      await installFromRepository(repo);
      break;
    case '3':
      await listAllSkills(repo);
      break;
    default:
      return;
  }
}

async function searchInRepository(repo) {
  clearScreen();
  header(`🔍 搜索 ${repo}`);
  
  const keyword = await question('输入搜索关键词 (如 "react", "api", "test"): ');
  
  if (!keyword.trim()) {
    console.log(colors.yellow + '关键词不能为空' + colors.reset);
    await pause();
    return;
  }
  
  console.log('\n' + colors.dim + '正在获取 skills 列表...这可能需要一分钟' + colors.reset);
  
  try {
    const output = execSync(`npx skills add ${repo} --list 2>&1`, { 
      encoding: 'utf-8',
      timeout: 120000
    });
    
    // 解析输出找到 skills
    const lines = output.split('\n');
    const results = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (line.includes(keyword.toLowerCase())) {
        // 提取 skill 名称
        const match = lines[i].match(/^\s*([a-z0-9\-]+)/);
        if (match) {
          const skillName = match[1];
          // 获取描述（下一行通常是描述）
          const desc = i + 1 < lines.length ? lines[i + 1].trim() : '';
          results.push({ name: skillName, desc });
        }
      }
    }
    
    if (results.length === 0) {
      console.log(colors.yellow + `没有找到包含 "${keyword}" 的 skills` + colors.reset);
    } else {
      clearScreen();
      header(`✅ 搜索结果 (${results.length})`);
      results.slice(0, 20).forEach((result, idx) => {
        console.log(`${colors.bright}${idx + 1}.${colors.reset} ${colors.magenta}${result.name}${colors.reset}`);
        if (result.desc) {
          console.log(`   ${colors.dim}${result.desc.substring(0, 80)}${colors.reset}`);
        }
      });
      
      if (results.length > 20) {
        console.log(colors.dim + `... 还有 ${results.length - 20} 个结果` + colors.reset);
      }
      
      const installChoice = await question(`\n选择要安装的 skill 编号 (1-${Math.min(results.length, 20)}) 或 0 跳过: `);
      if (installChoice !== '0') {
        const selected = results[parseInt(installChoice) - 1];
        if (selected) {
          await confirmAndInstall(repo, [selected.name]);
        }
      }
    }
  } catch (error) {
    console.error(colors.bright + colors.yellow + '错误: 无法获取 skills 列表' + colors.reset);
    console.error(colors.dim + error.message.substring(0, 200) + colors.reset);
  }
  
  await pause();
}

async function installFromRepository(repo) {
  clearScreen();
  header(`📥 安装 ${repo}`);
  
  const skills = await question('输入要安装的 skills (用逗号分隔，如 "react-best-practices,api-design"): ');
  
  if (!skills.trim()) {
    console.log(colors.yellow + '请输入至少一个 skill' + colors.reset);
    await pause();
    return;
  }
  
  const skillList = skills.split(',').map(s => s.trim()).filter(s => s);
  await confirmAndInstall(repo, skillList);
}

async function confirmAndInstall(repo, skills) {
  clearScreen();
  header('⚠️  确认安装');
  
  console.log(colors.bright + '仓库：' + colors.reset + repo);
  console.log(colors.bright + 'Skills：' + colors.reset);
  skills.forEach(skill => {
    console.log(`  • ${colors.magenta}${skill}${colors.reset}`);
  });
  
  console.log(colors.bright + '\n代理：' + colors.reset);
  console.log('• kilo (推荐)');
  console.log('• claude-code');
  console.log('• cursor');
  console.log('• codex');
  console.log('• 全部');
  
  const agent = await question('\n选择安装代理 (默认 kilo): ');
  const targetAgent = agent.trim() || 'kilo';
  
  const confirm = await question(`\n开始安装到 ${colors.green}${targetAgent}${colors.reset}? (y/n): `);
  
  if (confirm.toLowerCase() !== 'y') {
    console.log(colors.yellow + '已取消' + colors.reset);
    await pause();
    return;
  }
  
  console.log(colors.dim + '\n⏳ 安装中，请稍候...' + colors.reset);
  
  try {
    const skillFlags = skills.map(s => `--skill "${s}"`).join(' ');
    const agentFlag = targetAgent === '全部' ? '' : `-a ${targetAgent}`;
    const cmd = `npx skills add ${repo} ${skillFlags} ${agentFlag} -y`;
    
    console.log(colors.dim + '\n执行命令: ' + colors.reset);
    console.log(colors.cyan + cmd + colors.reset + '\n');
    
    execSync(cmd, { stdio: 'inherit' });
    
    console.log('\n' + colors.green + colors.bright + '✅ 安装完成！' + colors.reset);
    console.log(colors.dim + '\n提示：在 kilo 中输入你的任务，skills 会自动激活。\n例如: "Build a React component with TailwindCSS"' + colors.reset);
  } catch (error) {
    console.error(colors.bright + colors.yellow + '\n❌ 安装失败' + colors.reset);
    console.error(colors.dim + error.message + colors.reset);
  }
  
  await pause();
}

async function quickInstallPresets() {
  clearScreen();
  header('⚡ 快速安装预设');
  
  const presets = {
    'web': {
      repo: 'sickn33/antigravity-awesome-skills',
      skills: ['frontend-design', 'react-best-practices', 'web-design-guidelines', 'performance-optimization'],
      desc: 'Web 开发完整套件'
    },
    'python': {
      repo: 'sickn33/antigravity-awesome-skills',
      skills: ['python-best-practices', 'fastapi', 'testing', 'documentation'],
      desc: 'Python 开发完整套件'
    },
    'go': {
      repo: 'sickn33/antigravity-awesome-skills',
      skills: ['golang', 'performance-optimization', 'testing'],
      desc: 'Go 开发完整套件'
    },
    'fullstack': {
      repo: 'sickn33/antigravity-awesome-skills',
      skills: ['frontend-design', 'react-best-practices', 'fastapi', 'api-design', 'testing'],
      desc: '全栈开发完整套件'
    },
    'devops': {
      repo: 'sickn33/antigravity-awesome-skills',
      skills: ['docker', 'kubernetes', 'nginx-configuration', 'ci-cd', 'monitoring'],
      desc: 'DevOps 完整套件'
    },
    'docs': {
      repo: 'anthropics/skills',
      skills: ['docx', 'pdf', 'pptx', 'xlsx'],
      desc: 'Anthropic 文档处理套件'
    }
  };
  
  Object.entries(presets).forEach(([key, preset], idx) => {
    console.log(`${colors.bright}${idx + 1}. ${preset.desc}${colors.reset}`);
    console.log(`   ${colors.dim}${preset.skills.join(', ')}${colors.reset}\n`);
  });
  
  const choice = await question(`选择预设 (1-${Object.keys(presets).length}) 或 0 返回: `);
  
  if (choice === '0') return;
  
  const presetKeys = Object.keys(presets);
  const selectedPreset = presets[presetKeys[parseInt(choice) - 1]];
  
  if (selectedPreset) {
    await confirmAndInstall(selectedPreset.repo, selectedPreset.skills);
  }
}

async function listInstalledSkills() {
  clearScreen();
  header('📋 已安装的 Skills');
  
  try {
    console.log(colors.dim + '正在获取已安装的 skills...' + colors.reset + '\n');
    const output = execSync('npx skills list 2>&1', { encoding: 'utf-8' });
    console.log(output);
  } catch (error) {
    console.log(colors.yellow + '暂无已安装的 skills，或出现错误。' + colors.reset);
    console.log(colors.dim + '执行命令: npx skills list' + colors.reset);
  }
  
  await pause();
}

async function listAllSkills(repo) {
  clearScreen();
  header(`📚 ${repo} 的所有 Skills`);
  
  console.log(colors.yellow + '⚠️  这会显示很多内容，建议使用搜索功能' + colors.reset + '\n');
  console.log(colors.dim + '正在获取 skills 列表...这可能需要 1-2 分钟' + colors.reset);
  
  try {
    const output = execSync(`npx skills add ${repo} --list 2>&1`, { 
      encoding: 'utf-8',
      timeout: 120000
    });
    
    // 简化显示
    const lines = output.split('\n');
    let skillCount = 0;
    const displayed = [];
    
    for (const line of lines) {
      if (line.match(/^\s*[a-z0-9\-]+\s*$/)) {
        skillCount++;
        if (skillCount <= 50) {
          displayed.push(line.trim());
        }
      }
    }
    
    clearScreen();
    header(`📚 ${repo} - 前 50 个 Skills`);
    
    displayed.forEach((skill, idx) => {
      console.log(`${colors.magenta}${skill}${colors.reset}`);
    });
    
    console.log(colors.dim + `\n... 共 ${skillCount} 个 skills，这里只显示前 50 个\n使用搜索功能查找你需要的 skill。` + colors.reset);
  } catch (error) {
    console.error(colors.yellow + '获取 skills 列表失败' + colors.reset);
  }
  
  await pause();
}

async function manualInput() {
  clearScreen();
  header('🔗 手动输入');
  
  const repo = await question('输入 GitHub 仓库地址 (格式: owner/repo): ');
  
  if (!repo.trim()) {
    console.log(colors.yellow + '仓库地址不能为空' + colors.reset);
    await pause();
    return;
  }
  
  const skills = await question('输入要安装的 skills (用逗号分隔，或留空浏览全部): ');
  
  if (!skills.trim()) {
    const listChoice = await question('是否列出此仓库的所有 skills? (y/n): ');
    if (listChoice.toLowerCase() === 'y') {
      await listAllSkills(repo);
    }
  } else {
    const skillList = skills.split(',').map(s => s.trim()).filter(s => s);
    await confirmAndInstall(repo, skillList);
  }
}

async function pause() {
  await question(colors.dim + '按 Enter 继续...' + colors.reset);
}

async function main() {
  let running = true;
  
  while (running) {
    showMainMenu();
    const choice = await question(`${colors.bright}选择 (0-5): ${colors.reset}`);
    
    switch(choice) {
      case '1':
        await browsRepositories();
        break;
      case '2':
        const searchRepo = await question('选择仓库 (1-默认1320+ skills): ');
        const selectedRepo = Object.keys(POPULAR_SKILLS)[0];
        await searchInRepository(selectedRepo);
        break;
      case '3':
        await quickInstallPresets();
        break;
      case '4':
        await listInstalledSkills();
        break;
      case '5':
        await manualInput();
        break;
      case '0':
        running = false;
        console.log(colors.green + '\n👋 再见！' + colors.reset + '\n');
        break;
      default:
        break;
    }
  }
  
  rl.close();
}

main().catch(console.error);
