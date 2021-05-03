import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth";
import CategoryService from "../services/category";
import { Link } from "react-router-dom";
import { Timeline } from 'react-twitter-widgets'

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
      this.retrieveCategories(currentUser);
    }
  }

  retrieveCategories(currentUser) {
    CategoryService.getByUser(currentUser.user._id)
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

  toEdit(id) {
    this.props.history.push('/categories/' + this.state.currentCategory.id);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { categories, currentCategory, currentIndex } = this.state;

    return (
      <div className="row">
        <div className="col-md-4">
          <header>
            <h3>
              Your categories
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
          {currentCategory ? (
            <div className="col-md-6">
              <header>
                <h3>
                Category: {currentCategory.title}
                </h3>
              </header>
              <Link
                to={"/categories/" + currentCategory.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <div>
                <label>
                  <strong>Twitter profiles:</strong>
                </label>{" "}
                <ul>
                  {currentCategory.accounts.map((account, index) => (
                    <li key={index}>
                      {account.handle}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: 'elonmusk'
                  }}
                  options={{
                    height: '600'
                  }}
                  renderError={
                    (_err) => <p>Could not load tweets, check if profiles are correct</p>
                  }
                />
              </div>
            </div>
          ) : (
            <div className="col-md-6">
              <header>
                <h3>
                  Click on a category...
                </h3>
              </header>
            </div>
          )}
        </div>
    );
  }
}
