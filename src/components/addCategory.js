import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth";
import CategoryService from "../services/category";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.newCategory = this.newCategory.bind(this);

    this.state = {
      redirect: null,
      newCategory: {
        title: "",
        accounts: []
      },
      handleAmount: 3,
      handles: [],
      submitted: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(prevState => ({
      newCategory: {
        ...prevState.newCategory,
        title: title
      }
    }));
  }

  onChangeHandle(e) {
    const input = e.target.value;
    const index = e.target.id;

    let accounts = [...this.state.newCategory.accounts];
    let account = { ...accounts[index] };
    account.handle = input;
    accounts[index] = account;

    this.setState(prevState => ({
      newCategory: {
        ...prevState.newCategory,
        accounts: accounts
      }
    }));
  }

  saveCategory() {
    let newCategory = this.state.newCategory;

    CategoryService.create(newCategory)
      .then(response => {
        this.setState({
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCategory() {
    this.setState({
      newCategory: {
        title: "",
        accounts: []
      },
      submitted: false
    });
  }

  createHandleInputs = () => {
    let inputs = []

    for (let i = 0; i < this.state.handleAmount; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          className="form-control"
          id={i}
          value={this.state.handles[i]}
          onChange={this.onChangeHandle}
        />
      )
    }
    return inputs
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { newCategory, handleAmount, handles } = this.state;

    handles.forEach(function (handle, index) {
      newCategory.accounts[index].handle = handle;
    });

    return (
      <div className="submit-form">
        <header>
          <h3>
            Add category
          </h3>
        </header>
        {this.state.submitted ? (
          <div>
            <h4>Submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCategory}>
              Add another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.newCategory.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="handle">Handles:</label>
              {this.createHandleInputs()}
            </div>

            <button onClick={this.saveCategory} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
