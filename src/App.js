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

  fetchData(url) {
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        let pages = this.state.limit / 10;
        console.log(res);
        this.setState(prevState => ({
          pokemons: [...prevState.pokemons, ...res.results],
          totalPages: prevState.totalPages + pages,
          copy: [...prevState.copy, ...res.results]
        }));
      });
  }

  handlePagination(index) {
    this.setState({
      activePage: index - 1,
      copy: this.state.pokemons.slice(this.state.activePage, 10 * index)
    });
  }

  componentDidMount() {
    let serializedData;
    if (!localStorage.getItem('pokemons')) {
      serializedData = this.fetchData(`${baseURL}/pokemon/?limit=${this.state.limit}&offset=0`);

      localStorage.setItem('pokemons', JSON.stringify(serializedData));
    } else {
      serializedData = localStorage.getItem('pokemons');
    }

    this.setState({
      pokemons: JSON.parse(serializedData)
    });
  }

  render() {
    return (
      <div>
        <PokeList pokemons={this.state.copy} />
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
