import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import FullPost from "./FullPost/FullPost";

// creating a lazy loading component
// import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";

const asyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    authenticated: false,
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Redirect from="/" to="/new-post" />
        <Switch>
          <Route path="/" exact component={Posts} />
          {/* {this is a guard} */}
          {/* {this.state.authenticated ? (
            <Route path="/new-post" component={NewPost} />
          ) : null} */}
          <Route path="/new-post" component={asyncNewPost} />
          <Route path="/:postId" component={FullPost} />
          {/* creating a 404 catch, or unknown paths */}
          {/* <Route render={() => <h1>404 NOT FOUND</h1>} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
