import React, { Component } from 'react';
import ApplicationContainer from "./Containers/ApplicationContainer";
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
          <ApplicationContainer />
      </div>
    );
  }
}

export default App;
