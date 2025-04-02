const axios = require('axios');
const apiUtils = require('../utils/apiUtils');

const BASE_URL = process.env.BASE_URL || "http://20.244.56.144/evaluation-service";

exports.getPosts = async (typeParam) => {
    try {
        const usersResponse = await axios.get(`${BASE_URL}/users`);
        const usersData = usersResponse.data.users;
        let allPosts = [];
        let postCommentCounts = [];

        const postDataPromises = Object.keys(usersData).map(async (userId) => {
            const { postsData, postCommentCounts: postComments } = await apiUtils.fetchPostsAndComments(userId);
            allPosts = allPosts.concat(postsData);
            postCommentCounts = postCommentCounts.concat(postComments);
        });

        await Promise.all(postDataPromises);

        if (typeParam === 'latest') {
            const latestPosts = allPosts.sort((a, b) => b.id - a.id).slice(0, 5);
            return latestPosts;
        } else if (typeParam === 'popular') {
            const maxComments = Math.max(...postCommentCounts.map(post => post.commentCount));
            const popularPosts = allPosts.filter(post => {
                const postComments = postCommentCounts.find(p => p.postId === post.id);
                return postComments && postComments.commentCount === maxComments;
            });
            return popularPosts;
        } else {
            return [];
        }
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
