const axios = require('axios');
const apiUtils = require('../utils/apiUtils');

const BASE_URL = process.env.BASE_URL || "http://20.244.56.144/evaluation-service";

exports.getTopUsers = async () => {
    try {
        const usersResponse = await axios.get(`${BASE_URL}/users`);
        const usersData = usersResponse.data.users;
        const userPostCounts = {};

        const userPostsPromises = Object.keys(usersData).map(async (userId) => {
            const { postsData } = await apiUtils.fetchPostsAndComments(userId);
            userPostCounts[userId] = postsData.length;
        });

        await Promise.all(userPostsPromises);

        const sortedUsers = Object.entries(userPostCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 5)
            .map(([userId, postCount]) => ({ user_id: userId, post_count: postCount }));

        return sortedUsers;
    } catch (error) {
        throw new Error('Error fetching top users');
    }
};
