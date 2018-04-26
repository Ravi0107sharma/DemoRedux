import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { HomePage } from "./Home";
import logo from "./logo.svg";

export class About extends React.Component {
  public render() {
    return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to About Page</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <ul>
          <li>
            <a href="/">App</a>
            </li>
          <li>
            <Link to={`/${HomePage}`}>Home</Link>
            </li>
            <li>
                <Link to={`/${About}`}>About</Link>
            </li>
            <li>
            <a href="#">Contact</a>
            </li>
            <li>
            <a href="#">Feedback</a>
            </li>
          </ul>
        </div>
      </div>
    </Router>
    );
  }
}

export default About;
