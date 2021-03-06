import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth";
import CategoryService from "../services/category";

export default class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      redirect: null,
      currentCategory: null,
      message: "",
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({ currentUser: currentUser });
    if (!currentUser) {
      this.setState({ redirect: "/login" })
    } else {
      console.log('edit mount ' + this.props.match.params.id);
      this.getCategory(this.props.match.params.id);
    }
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          title: title
        }
      };
    });
  }

  onChangeHandle(e) {
    const input = e.target.value;
    const index = e.target.id;

    let accounts = [...this.state.currentCategory.accounts];
    let account = {...accounts[index]};
    account.handle = input;
    accounts[index] = account;

    this.setState(prevState => ({
      currentCategory: {
        ...prevState.currentCategory,
        accounts: accounts
      }
    }));
  }

  getCategory(id) {
    CategoryService.get(id)
      .then(response => {
        this.setState({
          currentCategory: response.data.data.category
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCategory() {
    CategoryService.update(this.state.currentCategory, this.state.currentUser)
      .then(response => {
        console.log('response ' + response.data.data.modifyCategory.id);
        this.setState({
          message: "The category was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCategory() {
    CategoryService.delete(this.state.currentCategory.id)
      .then(response => {
        this.props.history.push('/categories')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentCategory } = this.state;

    return (
      <div>
        {currentCategory ? (
          <div className="edit-form">
            <h3>Edit category</h3>
            <form>
              <div className="form-group">
                <label htmlFor="title">Category title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCategory.title}
                  onChange={this.onChangeTitle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="handle">Twitter profiles (without @):</label>
              </div>

              {currentCategory.accounts.map((account, index) => (
                <div className="form-group">
                  <input
                    key={index}
                    type="text"
                    className="form-control"
                    id={index}
                    value={account.handle}
                    onChange={this.onChangeHandle}
                  />
                </div>
              ))}
            </form>

            <button
              className="btn btn-danger"
              onClick={this.deleteCategory}
            >
              Delete
            </button>{" "}

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateCategory}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
