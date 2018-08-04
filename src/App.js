import React, { Component } from 'react';
import './App.css';
import PokeList from './components/PokeList';
import Pagination from './components/Pagination';

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
    return fetch(url).then(res=>res.json())
    .then(res=>{
      let pages = Math.round(res.count / this.state.limit)
      this.setState(prevState=>({
        pokemons: [...prevState.pokemons, ...res.results],
        totalPages: prevState.totalPages + pages
      }));
    })
  }

  componentDidMount() {
    this.fetchData(`${baseURL}/pokemon/?limit=${this.state.limit}&offset=0`);
  }

  render() {
    return(
      <div>
        <PokeList pokemons={this.state.pokemons}/>
        <Pagination
          items={this.state.totalPages}
          activePage={this.state.activePage}
          onSelect={this.handlePagination}
        />
      </div>
    );
  }
}

export default App;
