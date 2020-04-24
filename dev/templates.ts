import path from 'path';
import pug from 'pug';
import { promises as fs } from 'fs';
import {
    templatesDir,
    isProduction,
} from './config';

export async function isTemplateExists(templateName: string) {
    const file = path.join(templatesDir, templateName + '.pug');
    try {
        return (await fs.stat(file)).isFile();
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}

export function renderTemplate(templateName: string, data: any): string {
    const file = path.join(templatesDir, templateName + '.pug');
    return pug.renderFile(file, {
        basedir: templatesDir,
        cache: false,
        filename: templateName + '.pug',
        isProduction,
        ...data
    });
}
