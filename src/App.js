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
      showModal: false,
      pokemonDetails: {}
    };
    this.selectItemsPerPage = this.selectItemsPerPage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.fetchPokeDetails = this.fetchPokeDetails.bind(this);
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
    let{activePage, totalPages, pokemons} = this.props;
    let copy = pokemons.slice(activePage * 10, (activePage + 1) * 10);
    return (
      <div>
        <ItemPerPage
          itemsPerPage={this.state.itemsPerPage}
          selectItemsPerPage={this.selectItemsPerPage}
          limit={this.props.limit}
        />
        <PokeList 
          pokemons={copy} 
          toggleModal={this.toggleModal} 
        />
        <Pagination
          items={this.props.totalPages}
          activePage={this.props.activePage}
          clickPagination={this.props.setActivePage}
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
  getPokes: bindActionCreators(Actions.getPokesMiddleware, dispatch),
  setActivePage: bindActionCreators(Actions.setActivePage, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
