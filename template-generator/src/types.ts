export interface ProjectOptions {
  name: string;
  database: 'prisma' | 'drizzle' | 'mongodb' | 'none';
  auth: 'firebase' | 'magic-links' | 'web3' | 'none';
  platforms: ('web' | 'mobile' | 'desktop')[];
}

export interface TemplateConfig {
  name: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  env: Record<string, string>;
}
