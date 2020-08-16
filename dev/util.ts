import { readdAllPosts } from './post';

export async function readCommonRenderContext() {
    const allPosts = await readdAllPosts();
    const allTags = [...new Set(allPosts.flatMap(p => p.tags))];
    return {
        allPosts,
        allTags,
    };
}
