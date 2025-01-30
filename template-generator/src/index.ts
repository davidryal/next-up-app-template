#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { ProjectOptions, TemplateConfig } from './types';
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
      message: 'Enter your project name:',
      validate: (input: string) => validateProjectName(input)
    },
    {
      type: 'list',
      name: 'database',
      message: 'Select your database:',
      choices: [
        { name: 'Prisma + PostgreSQL', value: 'prisma' },
        { name: 'Drizzle ORM', value: 'drizzle' },
        { name: 'MongoDB', value: 'mongodb' },
        { name: 'None', value: 'none' }
      ]
    },
    {
      type: 'list',
      name: 'auth',
      message: 'Select your authentication method:',
      choices: [
        { name: 'NextAuth.js', value: 'next-auth' },
        { name: 'Firebase', value: 'firebase' },
        { name: 'Magic Links', value: 'magic-links' },
        { name: 'Web3/Wallet', value: 'web3' },
        { name: 'None', value: 'none' }
      ]
    },
    {
      type: 'checkbox',
      name: 'platforms',
      message: 'Select target platforms:',
      choices: [
        { name: 'Web', value: 'web' },
        { name: 'Mobile', value: 'mobile' },
        { name: 'Desktop', value: 'desktop' }
      ]
    }
  ] as const;

  const answers = await inquirer.prompt(questions as any);
  return {
    name: answers.name,
    database: answers.database,
    auth: answers.auth,
    platforms: answers.platforms
  };
}

async function main() {
  program
    .name('create-next-platform-app')
    .description('CLI to create a new cross-platform Next.js application')
    .version('1.0.0')
    .argument('[name]', 'Project name')
    .option('--database <type>', 'Database type (prisma, drizzle, mongodb, none)')
    .option('--auth <type>', 'Authentication type (firebase, magic-links, web3, none)')
    .option('--platforms <list>', 'Target platforms (comma-separated: web,mobile,desktop)')
    .action(async (name: string | undefined, cmd: Command) => {
      console.log(chalk.bold('\nWelcome to Next Platform App Generator! \n'));
    
      let options: ProjectOptions;

      if (name && cmd.opts().database && cmd.opts().auth && cmd.opts().platforms) {
        // Use command line arguments
        options = {
          name,
          database: cmd.opts().database as ProjectOptions['database'],
          auth: cmd.opts().auth as ProjectOptions['auth'],
          platforms: cmd.opts().platforms.split(',') as ProjectOptions['platforms']
        };
      } else {
        // Use interactive prompt
        options = await promptUser();
      }

      const spinner = ora('Creating your project...').start();

      try {
        const templatePath = path.resolve(__dirname, '../template');
        const targetPath = path.resolve(process.cwd(), options.name);

        // Ensure target directory doesn't exist
        if (await fs.pathExists(targetPath)) {
          spinner.fail(chalk.red(`Directory ${options.name} already exists`));
          process.exit(1);
        }

        // Create target directory
        await fs.ensureDir(targetPath);

        // Prepare template config
        const templateConfig: TemplateConfig = {
          name: options.name,
          dependencies: {},
          devDependencies: {},
          scripts: {},
          env: {}
        };

        // Copy template files
        spinner.text = 'Copying template files...';
        await copyTemplateFiles(templatePath, targetPath, options);

        // Update package.json
        spinner.text = 'Updating package.json...';
        await updatePackageJson(targetPath, templateConfig);

        // Create environment files
        spinner.text = 'Creating environment files...';
        await createEnvFiles(targetPath, templateConfig);

        // Install dependencies
        spinner.text = 'Installing dependencies...';
        
        spinner.succeed(chalk.green('Project created successfully!'));
        
        console.log('\nNext steps:');
        console.log(chalk.cyan(`  cd ${options.name}`));
        console.log(chalk.cyan('  npm run dev'));
        
        if (options.database === 'prisma') {
          console.log(chalk.yellow('\nNote: Run `npx prisma generate` after installing dependencies.'));
        }
      } catch (error) {
        spinner.fail(chalk.red('Failed to create project'));
        console.error(error);
        process.exit(1);
      }
    });

  program.parse(process.argv);
}

main().catch(console.error);
