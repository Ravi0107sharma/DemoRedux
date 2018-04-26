import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.css';
import { GridControl } from "./contactApp";
import { ContactForm } from "./contactForm";
import logo from './logo.svg';
import 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Examples.scss.js'

const About = () => {
  return(<h1>Welcome About</h1>);
}
const Contact = () => {
  return(<h1>Welcome Contact</h1>);
}
const Home = () => {
  return(<h1>Welcome Home</h1>);
}

export class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Home Page</h1>
          </header>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/ContactEntity">Contact Entity</Link>
              </li>
            </ul>
          </div>
        <div>
          <Route path="/" exact={true} strict={true}  component={Home} />
          <Route path="/about" exact={true} strict={true}  component={About} />
          <Route path="/contact" exact={true} strict={true}  component={Contact} />
          <Route path="/ContactEntity" exact={true} strict={true}  component={GridControl} />
          <Route path="/ContactEditForm" exact={true} strict={true}  component={ContactForm} />
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
