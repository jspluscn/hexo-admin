var DataFetcher = require('./data-fetcher');
var api = require('./api');
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var marked = require('marked')
var Editor = require('./editor')
var _ = require('lodash')
var moment = require('moment')

var RemovePost = React.createClass({
  mixins: [DataFetcher((params) => {
    return {
      post: (api.remove(params.postId), 1)
    }
  })],

  getInitialState: function () {
    return {
      updated: moment()
    }
  },

  componentDidMount: function () {
    this._post = _.debounce((update) => {
      var now = moment()
      api.post(this.props.params.postId, update).then(() => {
        this.setState({
          updated: now
        })
      })
    }, 1000, {trailing: true, loading: true})
  },

  handleChange: function (update) {
    var now = moment()
    api.post(this.props.params.postId, update).then((data) => {
      this.setState({
        tagsAndCategories: data.tagsAndCategories,
        post: data.post,
        updated: now
      })
    })
  },

  handleChangeContent: function (text) {
    if (text === this.state.raw) {
      return
    }
    this.setState({
      raw: text,
      updated: null,
      rendered: marked(text)
    })
    this._post({_content: text})
  },

  handleChangeTitle: function (title) {
    if (title === this.state.title) {
      return
    }
    this.setState({title: title});
    this._post({title: title})
  },

  handlePublish: function () {
    if (!this.state.post.isDraft) return
    api.publish(this.state.post._id).then((post) => {
      this.setState({post: post})
    });
  },

  handleUnpublish: function () {
    if (this.state.post.isDraft) return
    api.unpublish(this.state.post._id).then((post) => {
      this.setState({post: post})
    });
  },

  dataDidLoad: function (name, data) {
    if (name !== 'post') return
    var parts = data.raw.split('---');
    var raw = parts.slice(1).join('---').trim();
    this.setState({
      title: data.title,
      initialRaw: raw,
      raw: raw,
      rendered: data.content
    })
  },

  render: function () {
    var post = this.state.post
    if (!post) {
      return <span>Loading...</span>
    }
    var permaLink = '/' + post.path
    return <div>done</div>
  }
});

module.exports = RemovePost;

