import React, { Component } from 'react';
import './App.css';

const baseURL = 'https://pokeapi.co/api/v2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={

    };
  }

  fetchData(url) {
    return fetch(url).then(res=>res.json());
  }

  componentDidMount() {
    this.fetchData(`${baseURL}/pokemon/1/`)
      .then(res=>console.log(res))
  }

  render() {
    return(
      <div>
         
      </div>
    );
  }
}

export default App;
