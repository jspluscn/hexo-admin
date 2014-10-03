
var App = require('./app');
var Post = require('./post')
var RemovePost = require('./remove-post')
var Posts = require('./posts')
var About = require('./about')
var Route = require('react-router').Route

module.exports = () => {
  return <Route handler={App}>
    <Route name="posts" handler={Posts} path="/"/>
    <Route name="post" handler={Post} path="/posts/:postId"/>
    <Route name="removepost" handler={RemovePost} path="/removepost/:postId"/>
    <Route name="about" handler={About}/>
  </Route>
}

