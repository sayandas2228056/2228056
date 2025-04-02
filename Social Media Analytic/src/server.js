const express = require('express');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("server is running now apply routes");
})

app.get('/users', userController.getTopUsers);
app.get('/posts', postController.getPosts);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
