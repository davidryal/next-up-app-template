"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateFiles = exports.validateProjectName = exports.createEnvFiles = exports.updatePackageJson = exports.copyTemplateFiles = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
const copyTemplateFiles = async (templatePath, targetPath, options) => {
    // Copy base template
    await fs_extra_1.default.copy(path_1.default.join(templatePath, 'base'), targetPath);
    // Copy database template
    if (options.database !== 'none') {
        const dbTemplatePath = path_1.default.join(templatePath, 'database', options.database);
        if (await fs_extra_1.default.pathExists(dbTemplatePath)) {
            await fs_extra_1.default.copy(dbTemplatePath, targetPath, { overwrite: true });
        }
    }
    // Copy auth template
    if (options.auth !== 'none') {
        const authTemplatePath = path_1.default.join(templatePath, 'auth', options.auth);
        if (await fs_extra_1.default.pathExists(authTemplatePath)) {
            await fs_extra_1.default.copy(authTemplatePath, targetPath, { overwrite: true });
        }
    }
    // Copy platform-specific templates
    for (const platform of options.platforms) {
        const platformTemplatePath = path_1.default.join(templatePath, 'platforms', platform);
        if (await fs_extra_1.default.pathExists(platformTemplatePath)) {
            await fs_extra_1.default.copy(platformTemplatePath, targetPath, { overwrite: true });
        }
    }
};
exports.copyTemplateFiles = copyTemplateFiles;
const updatePackageJson = async (targetPath, config) => {
    const pkgPath = path_1.default.join(targetPath, 'package.json');
    const pkg = await fs_extra_1.default.readJson(pkgPath);
    pkg.name = config.name;
    pkg.dependencies = {
        ...pkg.dependencies,
        ...config.dependencies,
    };
    pkg.devDependencies = {
        ...pkg.devDependencies,
        ...config.devDependencies,
    };
    pkg.scripts = {
        ...pkg.scripts,
        ...config.scripts,
    };
    await fs_extra_1.default.writeJson(pkgPath, pkg, { spaces: 2 });
};
exports.updatePackageJson = updatePackageJson;
const createEnvFiles = async (targetPath, config) => {
    const envContent = Object.entries(config.env)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    await fs_extra_1.default.writeFile(path_1.default.join(targetPath, '.env'), envContent);
    await fs_extra_1.default.writeFile(path_1.default.join(targetPath, '.env.example'), envContent);
};
exports.createEnvFiles = createEnvFiles;
const validateProjectName = (name) => {
    return /^[a-z0-9-]+$/.test(name);
};
exports.validateProjectName = validateProjectName;
const getTemplateFiles = async (templatePath) => {
    return glob_1.glob.sync('**/*', {
        cwd: templatePath,
        dot: true,
        nodir: true,
    });
};
exports.getTemplateFiles = getTemplateFiles;
