import path from 'path';

export const isProduction = process.env.NODE_ENV === 'production';
export const origin = 'https://alphamagenta.com';
export const templatesDir = path.resolve(process.cwd(), 'templates');
export const staticDir = path.resolve(process.cwd(), 'static');
export const distDir = path.resolve(process.cwd(), 'dist');
export const postsSrcDir = path.join(process.cwd(), 'posts');
export const postsDstDir = distDir;
export const staticCssFiles = path.join(distDir, '**/*.css');
export const staticJsFiles = path.join(distDir, '**/*.js');
