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
    this.removeInput = this.removeInput.bind(this);
    this.addInput = this.addInput.bind(this);

    this.state = {
      redirect: null,
      newCategory: {
        title: "",
        accounts: []
      },
      handleAmount: 1,
      handles: [],
      submitted: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser });
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
    let { newCategory, currentUser } = this.state;

    CategoryService.create(newCategory, currentUser)
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

  removeInput() {
    if (this.state.handleAmount >= 1) {
      this.setState({
        handleAmount: this.state.handleAmount - 1
      });
    }
  }

  addInput() {
    this.setState({
      handleAmount: this.state.handleAmount + 1
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { newCategory, handles } = this.state;

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
            <h3>Submitted successfully!</h3>
            <button className="btn btn-success" onClick={this.newCategory}>
              Add another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Category title:</label>
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
              <label htmlFor="handle">Twitter profiles (without @):</label>
              {this.createHandleInputs()}
            </div>

            <div className="form-group"> 
              <button
                className="btn btn-danger"
                onClick={this.removeInput}
              >
                -
              </button>{" "}
              <button
                className="btn btn-success"
                onClick={this.addInput}
              >
                +
              </button>
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
