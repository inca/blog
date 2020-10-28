import path from 'path';
import pug from 'pug';
import { promises as fs } from 'fs';
import marked from 'marked';
import moment from 'moment';
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

export function renderTemplate(template: string, data: any): string {
    const filename = template.endsWith('.pug') ? template : template + '.pug';
    const fullPath = path.join(templatesDir, filename);
    return pug.renderFile(fullPath, {
        basedir: templatesDir,
        cache: false,
        filename,
        isProduction,
        filters: {
            md: mdFilter
        },
        moment,
        ...data
    });
}

function mdFilter(text: string) {
    return marked.parseInline(text);
}
