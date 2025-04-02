const axios = require('axios');

const BASE_URL = process.env.BASE_URL || "http://20.244.56.144/evaluation-service";

exports.fetchPostsAndComments = async (userId) => {
    try {
        const postsResponse = await axios.get(`${BASE_URL}/users/${userId}/posts`);
        const postsData = postsResponse.data.posts;

        const postCommentCounts = await Promise.all(
            postsData.map(async (post) => {
                try {
                    const commentsResponse = await axios.get(`${BASE_URL}/posts/${post.id}/comments`);
                    const commentsData = commentsResponse.data.comments;
                    return { postId: post.id, commentCount: commentsData.length };
                } catch (error) {
                    console.error(`Error fetching comments for post ${post.id}: ${error.message}`);
                    return { postId: post.id, commentCount: 0 };
                }
            })
        );

        return { postsData, postCommentCounts };
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}: ${error.message}`);
        return { postsData: [], postCommentCounts: [] };
    }
};
