import * as React from 'react';
import { Link } from "react-router-dom";
import { About } from './About'
import './App.css';

import logo from './logo.svg';

export class HomePage extends React.Component {
  public render() {
    return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Other Home Page</h1>
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
   
    );
  }
}

export default HomePage;
