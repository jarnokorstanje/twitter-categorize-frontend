import React, { Component } from "react";
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
      currentCategory: null,
      message: ""
    };
  }

  componentDidMount() {
    this.getCategory(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          title: title
        }
      };
    });
  }

  onChangeHandle(e) {
    const handle = e.target.value;
    
    this.setState(prevState => ({
      currentCategory: {
        ...prevState.currentCategory,
        handle: handle
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
    CategoryService.update(
      this.state.currentCategory.id,
      this.state.currentCategory
    )
      .then(response => {
        console.log(response.data.data);
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
        console.log(response.data.data);
        this.props.history.push('/categories')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCategory } = this.state;

    return (
      <div>
        {currentCategory ? (
          <div className="edit-form">
            <h4>Category</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Category title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCategory.Title}
                  onChange={this.onChangeTitle}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="handle">Handles:</label>
                {currentCategory.Accounts.map((account, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control"
                    id="handle"
                    value={account.Handle}
                    onChange={this.onChangeHandle}
                  />
                ))}
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCategory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
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
