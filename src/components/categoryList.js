import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth";
import CategoryService from "../services/category";
import { Link } from "react-router-dom";
import { Timeline } from 'react-twitter-widgets'

export default class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCategories = this.setActiveCategory.bind(this);

    this.state = {
      categories: [],
      currentCategory: null,
      currentIndex: -1,
      currentAccountIndex: -1,
      currentAccount: null
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
      currentIndex: index,
      currentAccount: null,
      currentAccountIndex: -1,
    });
  }

  setActiveAccount(account, index) {
    this.setState({
      currentAccount: account,
      currentAccountIndex: index
    });
  }

  toEdit(id) {
    this.props.history.push('/categories/' + this.state.currentCategory.id);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { categories, currentCategory, currentIndex, currentAccount, currentAccountIndex } = this.state;

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
              <ul className="list-group">
                {currentCategory.accounts.map((account, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentAccountIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveAccount(account, index)}
                    key={index}
                    >
                    {account.handle}
                  </li>
                ))}
              </ul>
            </div>
            {currentAccount ? (
            <div className="col-md-6">
              <Timeline
                dataSource={{
                  sourceType: 'profile',
                  screenName: currentAccount.handle
                }}
                options={{
                  height: '600'
                }}
                renderError={
                  (_err) => <p>Could not load tweets, check if profile is correct</p>
                }
              />
            </div>
            ) : (
            <p>Click on a profile</p>
            )}
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
