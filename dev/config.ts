import path from 'path';

export const isProduction = process.env.NODE_ENV === 'production';
export const templatesDir = path.resolve(process.cwd(), 'templates');
export const staticDir = path.resolve(process.cwd(), 'static');
export const postsSrcDir = path.join(process.cwd(), 'posts');
export const postsDstDir = path.join(process.cwd(), 'static/posts');
export const staticCssFiles = path.join(staticDir, 'build/**/*.css');
export const staticJsFiles = path.join(staticDir, 'build/**/*.js');
