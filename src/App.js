import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './actionCreators/actionCreators';

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
      showModal: false,
      pokemonDetails: {}
    };
    this.handlePagination = this.handlePagination.bind(this);
    this.selectItemsPerPage = this.selectItemsPerPage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.fetchPokeDetails = this.fetchPokeDetails.bind(this);
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

  toggleModal(index) {
    this.setState(prevState=>({
      showModal: !prevState.showModal
    }),()=>{
      if(this.state.showModal) {
        this.fetchPokeDetails(this.state.copy[index].url);
      }
    })
  }

  fetchPokeDetails(url) {
    fetch(url).then(res=>res.json())
      .then(data=>{
        console.log(data)
        this.setState({
          pokemonDetails: data
        })
      });
  }

  componentDidMount() {
    this.props.getPokes(this.props.limit);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ItemPerPage
          itemsPerPage={this.state.itemsPerPage}
          selectItemsPerPage={this.selectItemsPerPage}
          limit={this.props.limit}
        />
        <PokeList 
          pokemons={this.props.pokemons} 
          toggleModal={this.toggleModal} 
        />
        <Pagination
          items={this.props.totalPages}
          activePage={this.props.activePage}
          clickPagination={this.handlePagination}
        />
        <Modal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          pokemon={this.state.pokemonDetails}
          stats={this.state.pokemonDetails.stats}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  limit: 60,
  activePage: state.activePage,
  totalPages: state.totalPages
});

const mapDispatchToProps = dispatch =>({
  getPokes: bindActionCreators(Actions.getPokesMiddleware, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
