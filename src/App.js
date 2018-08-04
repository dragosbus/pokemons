import React, { Component } from 'react';
import './App.css';
import PokeList from './components/PokeList';
const baseURL = 'https://pokeapi.co/api/v2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      pokemons: []
    };
  }

  fetchData(url) {
    return fetch(url).then(res=>res.json());
  }

  componentDidMount() {
    this.fetchData(`${baseURL}/pokemon/23/`)
      .then(res=>{
        this.setState(prevState=>({
          pokemons: prevState.pokemons.concat(res)
        }));
      })
  }

  render() {
    return(
      <div>
        <PokeList pokemons={this.state.pokemons}/>
      </div>
    );
  }
}

export default App;
