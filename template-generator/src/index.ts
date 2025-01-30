#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { ProjectOptions } from './types';
import { getTemplateConfig } from './templates';
import {
  copyTemplateFiles,
  updatePackageJson,
  createEnvFiles,
  validateProjectName,
} from './utils';

const program = new Command();

async function promptUser(): Promise<ProjectOptions> {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your project name?',
      validate: (input: string) => {
        if (validateProjectName(input)) return true;
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
    const templatePath = path.resolve(__dirname, '../template');
    const targetPath = path.resolve(process.cwd(), options.name);

    // Ensure target directory doesn't exist
    if (await fs.pathExists(targetPath)) {
      spinner.fail(chalk.red(`Directory ${options.name} already exists`));
      process.exit(1);
    }

    // Create project directory
    await fs.ensureDir(targetPath);

    // Get template configuration
    const config = getTemplateConfig(options);

    // Copy template files
    spinner.text = 'Copying template files...';
    await copyTemplateFiles(templatePath, targetPath, options);

    // Update package.json
    spinner.text = 'Updating package.json...';
    await updatePackageJson(targetPath, config);

    // Create environment files
    spinner.text = 'Creating environment files...';
    await createEnvFiles(targetPath, config);

    // Install dependencies
    spinner.text = 'Installing dependencies...';
    const installProcess = require('child_process').spawn('npm', ['install'], {
      cwd: targetPath,
      stdio: 'ignore',
      shell: true
    });

    await new Promise((resolve, reject) => {
      installProcess.on('close', (code: number) => {
        if (code !== 0) {
          reject(new Error('Failed to install dependencies'));
        } else {
          resolve(null);
        }
      });
    });

    spinner.succeed(chalk.green('Project created successfully! 🚀'));
    
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${options.name}`));
    console.log(chalk.cyan('  npm run dev'));
    
    if (options.database === 'prisma') {
      console.log('\nDatabase setup:');
      console.log(chalk.cyan('  npx prisma generate'));
      console.log(chalk.cyan('  npx prisma db push'));
    }

    if (options.platforms.includes('mobile')) {
      console.log('\nMobile setup:');
      console.log(chalk.cyan('  npx expo start'));
    }

    if (options.platforms.includes('desktop')) {
      console.log('\nDesktop setup:');
      console.log(chalk.cyan('  npm run tauri dev'));
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
  .argument('[name]', 'Project name')
  .option('--database <type>', 'Database type (prisma, drizzle, mongodb, none)')
  .option('--auth <type>', 'Authentication type (firebase, magic-links, web3, none)')
  .option('--platforms <list>', 'Target platforms (comma-separated: web,mobile,desktop)')
  .action(async (name: string | undefined, cmd) => {
    console.log(chalk.bold('\nWelcome to Next Platform App Generator! 🚀\n'));
    
    let options: ProjectOptions;

    if (name && cmd.database && cmd.auth && cmd.platforms) {
      // Use command line arguments
      options = {
        name,
        database: cmd.database,
        auth: cmd.auth,
        platforms: cmd.platforms.split(',') as ('web' | 'mobile' | 'desktop')[]
      };
    } else {
      // Use interactive prompts
      options = await promptUser();
    }

    await createProject(options);
  });

program.parse();
