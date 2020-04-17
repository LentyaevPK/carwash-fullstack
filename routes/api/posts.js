const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        name: req.body.name,
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
}); 



async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://me:qwe123@cluster0-shard-00-00-4vktt.mongodb.net:27017,cluster0-shard-00-01-4vktt.mongodb.net:27017,cluster0-shard-00-02-4vktt.mongodb.net:27017/vue_express?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('vue_express').collection('posts');
}


module.exports = router;