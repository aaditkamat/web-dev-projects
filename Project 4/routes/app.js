const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogDB');
const blogSchema = {
  title: 'string',
  content: 'string',
};
const Blog = mongoose.model('blog', blogSchema);

const router = express.Router();

/* Show home page */
router.get('/', (req, res) => {
  const homeStartingContent = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
  Blog.find({}, (err, docs) => {
    if (err) {
      res.render('home', { homeStartingContent });
    } else {
      res.render('home', {
        homeStartingContent,
        docs,
      });
    }
  });
});

/* Show about page */
router.get('/about', (req, res) => {
  res.render('about', {
    aboutContent:
      'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.',
  });
});

/* Show contact page */
router.get('/contact', (req, res) => {
  res.render('contact', {
    contactContent:
      'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.',
  });
});

/* Show blog posts */
router.get('/posts/:postId', (req, res) => {
  Blog.findOne({ id: req.params.postId }, (err, docs) => {
    if (err) {
      throw new mongoose.Error('Could not find blog post');
    }
    res.render('post', {
      title: docs.title,
      content: docs.content,
    });
  });
});

/* Show page to compose blog posts */
router.get('/compose', (req, res) => {
  res.render('compose');
});

router.post('/compose', (req, res) => {
  const doc = new Blog({
    title: req.body.title,
    post: req.body.post,
  });
  /* eslint-disable no-console */
  doc.save().then(console.log).then(console.error);
  res.redirect('/');
});

module.exports = router;
