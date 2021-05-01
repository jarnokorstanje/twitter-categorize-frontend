import React, { Component } from "react";
import CategoryService from "../services/category";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.newCategory = this.newCategory.bind(this);

    this.state = {
      newCategory: {
        Title: "",
        Accounts: []
      },
      submitted: false
    };
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(prevState => ({
      newCategory: {
        ...prevState.newCategory,
        Title: title
      }
    }));
  }

  onChangeHandle(e) {
    const input = e.target.value;
    const index = e.target.id;

    let accounts = [...this.state.newCategory.Accounts];
    let account = {...accounts[index]};
    account.Handle = input;
    accounts[index] = account;

    this.setState(prevState => ({
      newCategory: {
        ...prevState.newCategory,
        Accounts: accounts
      }
    }));
  }

  saveCategory() {
    let newCategory = this.state.newCategory;

    CategoryService.create(newCategory)
      .then(response => {
        console.log(response);
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
      newCategory: null,
      submitted: false
    });
  }

  render() {
    const { newCategory } = this.state;

    let handle0 = "";
    let handle1 = "";
    let handle2 = "";

    if (typeof newCategory.Accounts[0] !== 'undefined') {
      handle0 = newCategory.Accounts[0].Handle;
    }

    if (typeof newCategory.Accounts[1] !== 'undefined') {
      handle1 = newCategory.Accounts[1].Handle;
    }

    if (typeof newCategory.Accounts[2] !== 'undefined') {
      handle2 = newCategory.Accounts[2].Handle;
    }

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCategory}>
              Add
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
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
                <label htmlFor="handle">Handles:</label>
                  <input
                    key={0}
                    type="text"
                    className="form-control"
                    id={0}
                    value={handle0}
                    onChange={this.onChangeHandle}
                  />
                  <input
                    key={1}
                    type="text"
                    className="form-control"
                    id={1}
                    value={handle1}
                    onChange={this.onChangeHandle}
                  />
                  <input
                    key={2}
                    type="text"
                    className="form-control"
                    id={2}
                    value={handle2}
                    onChange={this.onChangeHandle}
                  />
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
