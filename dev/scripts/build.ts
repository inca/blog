import { buildPosts, buildPages } from '../build'

main();

async function main() {
    await buildPosts();
    await buildPages();
}
