import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="col-md-6">
        {(this.state.userReady) ?
        <div>
          <header>
            <h3>
              Profile
            </h3>
          </header>
          <p>
            <strong>Username:</strong>{" "}
            {currentUser.user.username}
          </p>
          <p>
            <strong>UserID:</strong>{" "}
            {currentUser.user._id}
          </p>
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.token.substring(0, 20)} ...{" "}
            {currentUser.token.substr(currentUser.token.length - 20)}
          </p>
        </div>: null}
      </div>
    );
  }
}
