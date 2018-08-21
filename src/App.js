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
    let{limit, activePage, totalPages, itemsPerPage, pokemons, setActivePage, changeItemsPerPage} = this.props;

    let copy = pokemons.slice(activePage * itemsPerPage, (activePage + 1) * itemsPerPage);

    totalPages = limit / itemsPerPage;

    console.log(this.props);
    return (
      <div>
        <ItemPerPage
          itemsPerPage={itemsPerPage}
          selectItemsPerPage={changeItemsPerPage}
          limit={limit}
        />
        <PokeList 
          pokemons={copy} 
          toggleModal={this.toggleModal} 
        />
        <Pagination
          items={totalPages}
          activePage={activePage}
          clickPagination={setActivePage}
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
  totalPages: state.totalPages,
  itemsPerPage: state.itemsPerPage
});

const mapDispatchToProps = dispatch =>({
  getPokes: bindActionCreators(Actions.getPokesMiddleware, dispatch),
  setActivePage: bindActionCreators(Actions.setActivePage, dispatch),
  changeItemsPerPage: bindActionCreators(Actions.changeItemsPerPage, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
