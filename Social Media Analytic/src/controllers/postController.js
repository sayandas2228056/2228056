const postService = require('../services/postService');

exports.getPosts = async (req, res) => {
    const { type } = req.query;
    if (type !== 'latest' && type !== 'popular') {
        return res.status(400).json({ error: 'Invalid query parameter. Accepted values for "type" are "latest" or "popular"' });
    }

    try {
        const posts = await postService.getPosts(type);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};
