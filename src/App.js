import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCategory from "./components/addCategory";
import Category from "./components/editCategory";
import CategoryList from "./components/categoryList";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/categories"} className="navbar-brand">
            Twitter Categorize
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/categories"]} component={CategoryList} />
            <Route exact path="/add" component={AddCategory} />
            <Route path="/categories/:id" component={Category} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
