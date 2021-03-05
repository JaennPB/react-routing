import React, { Component } from "react";

import "./Posts.css";
import Post from "../../../components/Post/Post";

class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts ");
      if (!res.ok) throw new Error("Failed to fetch...");

      const data = await res.json();
      const dataShortened = data.slice(0, 4);
      const updatedData = dataShortened.map((element) => {
        return {
          ...element,
          author: "Jaenn",
        };
      });

      this.setState({ posts: updatedData });
      console.log("ASYNC --- FETCHING DATA FROM SERVER ---");
    } catch (err) {
      //   this.setState({ error: true });
      console.log(err);
    }
  }

  selectedPost = (id) => {
    this.setState({ selectedPost: id });
  };

  render() {
    let posts = (
      <p style={{ textAlign: "center" }}>FAILED TO FETCH... PLEASE TRY AGAIN</p>
    );

    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            title={post.title}
            key={post.id}
            author={post.author}
            clicked={() => this.selectedPost(post.id)}
          />
        );
      });
    }

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
