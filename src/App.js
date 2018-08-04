import React, { Component } from 'react';
import './App.css';
import PokeList from './components/PokeList';
const baseURL = 'https://pokeapi.co/api/v2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      pokemons: [],
      activePage: 0,
      limit: 50,
      totalPages: 0
    };
  }

  fetchData(url) {
    return fetch(url).then(res=>res.json());
  }

  componentDidMount() {
    this.fetchData(`${baseURL}/pokemon/?limit=${this.state.limit}&offset=0`)
      .then(res=>{
        this.setState(prevState=>({
          pokemons: [...prevState.pokemons, ...res.results]
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
