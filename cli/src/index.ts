#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const program = new Command();

interface ProjectOptions {
  name: string;
  database: 'prisma' | 'drizzle' | 'mongodb' | 'none';
  auth: 'firebase' | 'magic-links' | 'web3' | 'none';
  platforms: ('web' | 'mobile' | 'desktop')[];
}

async function promptUser(): Promise<ProjectOptions> {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your project name?',
      validate: (input: string) => {
        if (/^[a-z0-9-]+$/.test(input)) return true;
        return 'Project name can only contain lowercase letters, numbers, and dashes';
      }
    },
    {
      type: 'list',
      name: 'database',
      message: 'Select your database:',
      choices: [
        { name: 'Prisma + PostgreSQL (Full-featured, type-safe)', value: 'prisma' },
        { name: 'Drizzle (Lightweight, high-performance)', value: 'drizzle' },
        { name: 'MongoDB + Mongoose (Flexible schema)', value: 'mongodb' },
        { name: 'None', value: 'none' }
      ]
    },
    {
      type: 'list',
      name: 'auth',
      message: 'Select authentication method:',
      choices: [
        { name: 'Firebase Auth (with OAuth providers)', value: 'firebase' },
        { name: 'Magic Links + Email', value: 'magic-links' },
        { name: 'Web3/Wallet', value: 'web3' },
        { name: 'None', value: 'none' }
      ]
    },
    {
      type: 'checkbox',
      name: 'platforms',
      message: 'Select target platforms:',
      choices: [
        { name: 'Web', value: 'web', checked: true },
        { name: 'Mobile (Expo)', value: 'mobile' },
        { name: 'Desktop (Tauri)', value: 'desktop' }
      ],
      validate: (input: string[]) => {
        if (input.length < 1) return 'You must select at least one platform';
        return true;
      }
    }
  ];

  return inquirer.prompt(questions);
}

async function createProject(options: ProjectOptions) {
  const spinner = ora('Creating your project...').start();

  try {
    // Create project directory
    const projectPath = path.join(process.cwd(), options.name);
    fs.mkdirSync(projectPath, { recursive: true });

    // Clone base template
    execSync('git clone --depth 1 https://github.com/yourusername/next-platform-template.git .', {
      cwd: projectPath,
      stdio: 'ignore'
    });

    // Remove .git directory
    fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });

    // Configure database
    if (options.database !== 'none') {
      // Add database-specific setup
      const dbSetupScript = path.join(projectPath, 'scripts', `setup-${options.database}.js`);
      if (fs.existsSync(dbSetupScript)) {
        execSync(`node ${dbSetupScript}`, { cwd: projectPath });
      }
    }

    // Configure auth
    if (options.auth !== 'none') {
      // Add auth-specific setup
      const authSetupScript = path.join(projectPath, 'scripts', `setup-${options.auth}.js`);
      if (fs.existsSync(authSetupScript)) {
        execSync(`node ${authSetupScript}`, { cwd: projectPath });
      }
    }

    // Configure platforms
    const platformConfig = {
      expo: options.platforms.includes('mobile'),
      tauri: options.platforms.includes('desktop')
    };

    // Update package.json with selected configurations
    const pkgPath = path.join(projectPath, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.config = {
      ...pkg.config,
      platforms: options.platforms,
      database: options.database,
      auth: options.auth
    };
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    // Install dependencies
    spinner.text = 'Installing dependencies...';
    execSync('npm install', { cwd: projectPath, stdio: 'ignore' });

    spinner.succeed(chalk.green('Project created successfully! 🚀'));
    
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${options.name}`));
    console.log(chalk.cyan('  npm run dev'));
    
    if (options.database === 'prisma') {
      console.log('\nDatabase setup:');
      console.log(chalk.cyan('  npx prisma generate'));
      console.log(chalk.cyan('  npx prisma db push'));
    }

  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(error);
    process.exit(1);
  }
}

program
  .name('create-next-platform-app')
  .description('CLI to create a new cross-platform Next.js application')
  .version('1.0.0')
  .action(async () => {
    console.log(chalk.bold('\nWelcome to Next Platform App Generator! 🚀\n'));
    
    const options = await promptUser();
    await createProject(options);
  });

program.parse();
