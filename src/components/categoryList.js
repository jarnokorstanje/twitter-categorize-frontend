import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth";
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
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      this.setState({ redirect: "/login" })
    } else {
      this.retrieveCategories();
    }
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { categories, currentCategory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <header>
            <h3>
              All categories
            </h3>
          </header>

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
                  {category.title}
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
                {currentCategory.title}
              </div>
              <div>
                <label>
                  <strong>User:</strong>
                </label>{" "}
                {currentCategory.userId}
              </div>
              <div>
                <label>
                  <strong>Handles:</strong>
                </label>{" "}
                <ul>
                  {currentCategory.accounts.map((account, index) => (
                    <li key={index}>
                      {account.handle}
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
