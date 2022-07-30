import React, { Component } from "react";
import axios from "axios";
class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/posts")
      .then((res) => {
        console.log(res);
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { posts } = this.state;
    return (
      <div>
        List of posts
        {posts.length
          ? posts.map((item) => <div key={item.id}>{item.title}</div>)
          : ""}
      </div>
    );
  }
}

export default PostList;
