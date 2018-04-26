import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
// import { allReducers } from './Reducer';

// import { combineReducers } from 'redux';
// import * as test from './Reducer/Contact_Reducer'; 
// import { test } from './Reducer/Contact_Reducer';

// export const allReducers=combineReducers({ user : test})
// const store = createStore(allReducers);

ReactDOM.render(
 // <Provider store={store}>
    <App />
  // </Provider>
  ,
  
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// export default allReducers;
