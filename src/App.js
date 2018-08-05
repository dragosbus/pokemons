import React, { Component } from 'react';
import './App.css';
import PokeList from './components/PokeList';
import Pagination from './components/Pagination';

const baseURL = 'https://pokeapi.co/api/v2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      activePage: 0,
      limit: 60,
      totalPages: 0,
      copy: []
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  handlePagination(index) {
    this.setState({
      activePage: index - 1,
      copy: this.state.pokemons.slice(this.state.activePage, 10 * index)
    });
  }

  componentDidMount() {
    let data = localStorage.getItem('pokemons');
    if (data === null) {
      fetch(`${baseURL}/pokemon/?limit=${this.state.limit}&offset=0`)
        .then(res => res.json())
        .then(res => localStorage.setItem('pokemons', JSON.stringify(res.results)))
        .catch(err => console.log(err));
    } else {
      this.setState({
        pokemons: JSON.parse(data),
        totalPages: this.state.totalPages + this.state.limit / 10
      });
    }
  }

  render() {
    return (
      <div>
        <PokeList pokemons={this.state.pokemons} />
        <Pagination
          items={this.state.totalPages}
          activePage={this.state.activePage}
          clickPagination={this.handlePagination}
        />
      </div>
    );
  }
}

export default App;
