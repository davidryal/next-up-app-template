import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { ProjectOptions, TemplateConfig } from './types';

export const copyTemplateFiles = async (
  templatePath: string,
  targetPath: string,
  options: ProjectOptions
) => {
  // Copy base template
  await fs.copy(path.join(templatePath, 'base'), targetPath);

  // Copy database template
  if (options.database !== 'none') {
    const dbTemplatePath = path.join(templatePath, 'database', options.database);
    if (await fs.pathExists(dbTemplatePath)) {
      await fs.copy(dbTemplatePath, targetPath, { overwrite: true });
    }
  }

  // Copy auth template
  if (options.auth !== 'none') {
    const authTemplatePath = path.join(templatePath, 'auth', options.auth);
    if (await fs.pathExists(authTemplatePath)) {
      await fs.copy(authTemplatePath, targetPath, { overwrite: true });
    }
  }

  // Copy platform-specific templates
  for (const platform of options.platforms) {
    const platformTemplatePath = path.join(templatePath, 'platforms', platform);
    if (await fs.pathExists(platformTemplatePath)) {
      await fs.copy(platformTemplatePath, targetPath, { overwrite: true });
    }
  }
};

export const updatePackageJson = async (
  targetPath: string,
  config: TemplateConfig
) => {
  const pkgPath = path.join(targetPath, 'package.json');
  const pkg = await fs.readJson(pkgPath);

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

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
};

export const createEnvFiles = async (
  targetPath: string,
  config: TemplateConfig
) => {
  const envContent = Object.entries(config.env)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await fs.writeFile(path.join(targetPath, '.env'), envContent);
  await fs.writeFile(path.join(targetPath, '.env.example'), envContent);
};

export const validateProjectName = (name: string): boolean => {
  return /^[a-z0-9-]+$/.test(name);
};

export const getTemplateFiles = async (templatePath: string): Promise<string[]> => {
  return glob.sync('**/*', {
    cwd: templatePath,
    dot: true,
    nodir: true,
  });
};
