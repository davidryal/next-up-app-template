#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const templates_1 = require("./templates");
const utils_1 = require("./utils");
const program = new commander_1.Command();
async function promptUser() {
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is your project name?',
            validate: (input) => {
                if ((0, utils_1.validateProjectName)(input))
                    return true;
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
            validate: (input) => {
                if (input.length < 1)
                    return 'You must select at least one platform';
                return true;
            }
        }
    ];
    return inquirer_1.default.prompt(questions);
}
async function createProject(options) {
    const spinner = (0, ora_1.default)('Creating your project...').start();
    try {
        const templatePath = path_1.default.resolve(__dirname, '../template');
        const targetPath = path_1.default.resolve(process.cwd(), options.name);
        // Ensure target directory doesn't exist
        if (await fs_extra_1.default.pathExists(targetPath)) {
            spinner.fail(chalk_1.default.red(`Directory ${options.name} already exists`));
            process.exit(1);
        }
        // Create project directory
        await fs_extra_1.default.ensureDir(targetPath);
        // Get template configuration
        const config = (0, templates_1.getTemplateConfig)(options);
        // Copy template files
        spinner.text = 'Copying template files...';
        await (0, utils_1.copyTemplateFiles)(templatePath, targetPath, options);
        // Update package.json
        spinner.text = 'Updating package.json...';
        await (0, utils_1.updatePackageJson)(targetPath, config);
        // Create environment files
        spinner.text = 'Creating environment files...';
        await (0, utils_1.createEnvFiles)(targetPath, config);
        // Install dependencies
        spinner.text = 'Installing dependencies...';
        const installProcess = require('child_process').spawn('npm', ['install'], {
            cwd: targetPath,
            stdio: 'ignore',
            shell: true
        });
        await new Promise((resolve, reject) => {
            installProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error('Failed to install dependencies'));
                }
                else {
                    resolve(null);
                }
            });
        });
        spinner.succeed(chalk_1.default.green('Project created successfully! 🚀'));
        console.log('\nNext steps:');
        console.log(chalk_1.default.cyan(`  cd ${options.name}`));
        console.log(chalk_1.default.cyan('  npm run dev'));
        if (options.database === 'prisma') {
            console.log('\nDatabase setup:');
            console.log(chalk_1.default.cyan('  npx prisma generate'));
            console.log(chalk_1.default.cyan('  npx prisma db push'));
        }
        if (options.platforms.includes('mobile')) {
            console.log('\nMobile setup:');
            console.log(chalk_1.default.cyan('  npx expo start'));
        }
        if (options.platforms.includes('desktop')) {
            console.log('\nDesktop setup:');
            console.log(chalk_1.default.cyan('  npm run tauri dev'));
        }
    }
    catch (error) {
        spinner.fail(chalk_1.default.red('Failed to create project'));
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
    .action(async (name, cmd) => {
    console.log(chalk_1.default.bold('\nWelcome to Next Platform App Generator! 🚀\n'));
    let options;
    if (name && cmd.database && cmd.auth && cmd.platforms) {
        // Use command line arguments
        options = {
            name,
            database: cmd.database,
            auth: cmd.auth,
            platforms: cmd.platforms.split(',')
        };
    }
    else {
        // Use interactive prompts
        options = await promptUser();
    }
    await createProject(options);
});
program.parse();
