import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/post_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

export default (
  <Route path="/" component={ App } >
    <IndexRoute component={PostsIndex} />
    {/*  when the route path is posts/new it loads the component { PostsNew } */}
    <Route path="posts/new" component={PostsNew} />
    {/*  when the route path is url/this.props.params.id it loads the component { PostsShow } */}
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);
