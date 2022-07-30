import React, { Component } from "react";
import axios from "axios";

export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      title: "",
      body: "",
    };
  }
  handleUserInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler=e=>{
    e.preventDefault()
    // console.log(this.state)
    axios
    .post("https://jsonplaceholder.typicode.com/users/1/posts",this.state)
    .then((res) => {
      // console.log(res);
    //   this.setState({
    //     posts: res.data,
    //   });
    })
    .catch((err) => {
    //   console.log(err);
    });
  }

  render() {
    const { userId, title, body } = this.state;
    return (
      <div>
        <form className="form-inline" onSubmit={this.submitHandler}>
          <div className="form-group">
            <input placeholder="userId"
              type="text"
              name="userId"
              value={this.userId}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="title" placeholder="title"
              value={this.userId}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="form-group">
            <input
              type="text" placeholder="body"
              name="body"
              value={this.userId}
              onChange={this.handleUserInput}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
