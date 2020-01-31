import path from 'path';
import pug from 'pug';

export const templatesDir = path.resolve(process.cwd(), 'templates');

export function renderTemplate(templateName: string, data: any): string {
    const file = path.join(templatesDir, templateName);
    return pug.renderFile(file, {
        basedir: templatesDir,
        cache: false,
        filename: templateName,
        ...data
    });
}
