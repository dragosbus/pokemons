import React, { Component } from 'react';
import './App.css';
import PokeList from './components/PokeList';
import Pagination from './components/Pagination';
import ItemPerPage from './components/ItemPerPage';
import Modal from './components/Modal';

const baseURL = 'https://pokeapi.co/api/v2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      activePage: 0,
      limit: 60,
      totalPages: 0,
      itemsPerPage: 10,
      copy: [],
      showModal: true,
      pokeDetails: 0
    };
    this.handlePagination = this.handlePagination.bind(this);
    this.selectItemsPerPage = this.selectItemsPerPage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handlePagination(index) {
    this.setState(
      prevState => ({
        activePage: index - 1,
        copy: prevState.pokemons.slice((index-1) * this.state.itemsPerPage, index * this.state.itemsPerPage)
      })
    );
  }

  selectItemsPerPage(e) {
    this.setState({
      itemsPerPage: +(e.target.value),
      copy: this.state.pokemons.slice(0, +(e.target.value)),
      totalPages: this.state.limit / +(e.target.value)
    });
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
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
        copy: JSON.parse(data).slice(0, 10),
        totalPages: this.state.totalPages + this.state.limit / 10
      });
    }
  }

  render() {
    return (
      <div>
        <ItemPerPage
          itemsPerPage={this.state.itemsPerPage}
          selectItemsPerPage={this.selectItemsPerPage}
          limit={this.state.limit}
        />
        <PokeList pokemons={this.state.copy} toggleModal={this.toggleModal}/>
        <Pagination
          items={this.state.totalPages}
          activePage={this.state.activePage}
          clickPagination={this.handlePagination}
        />
        <Modal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          pokemon={this.state.pokemons[this.state.pokeDetails]}
        />
      </div>
    );
  }
}

export default App;
