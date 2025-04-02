const userService = require('../services/userService');

exports.getTopUsers = async (req, res) => {
    try {
        const topUsers = await userService.getTopUsers();
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching top users' });
    }
};
