import React, { Component } from "react";
import CategoryService from "../services/category";
import { Link } from "react-router-dom";

export default class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutorials = this.retrieveCategories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveCategory.bind(this);

    this.state = {
      categories: [],
      currentCategory: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveCategories();
  }

  retrieveCategories() {
    CategoryService.getAll()
      .then(response => {
        this.setState({
          categories: response.data.data.categories
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCategories();
    this.setState({
      currentCategory: null,
      currentIndex: -1
    });
  }

  setActiveCategory(category, index) {
    this.setState({
      currentCategory: category,
      currentIndex: index
    });
  }

  render() {
    const { categories, currentCategory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>All categories</h4>

          <ul className="list-group">
            {categories &&
              categories.map((category, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCategory(category, index)}
                  key={index}
                >
                  {category.Title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCategory ? (
            <div>
              <h4>Category</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentCategory.Title}
              </div>
              <div>
                <label>
                  <strong>User:</strong>
                </label>{" "}
                {currentCategory.UserId}
              </div>
              <div>
                <label>
                  <strong>Handles:</strong>
                </label>{" "}
                <ul>
                  {currentCategory.Accounts.map((account, index) => (
                    <li key={index}>
                      {account.Handle}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={"/categories/" + currentCategory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a category...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
