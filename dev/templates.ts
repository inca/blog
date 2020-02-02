import path from 'path';
import pug from 'pug';
import {
    templatesDir,
    isProduction,
} from './config';

export function renderTemplate(templateName: string, data: any): string {
    const file = path.join(templatesDir, templateName);
    return pug.renderFile(file, {
        basedir: templatesDir,
        cache: false,
        filename: templateName,
        isProduction,
        ...data
    });
}
