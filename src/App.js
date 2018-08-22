import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './actionCreators/actionCreators';

import './App.css';
import PokeList from './components/PokeList';
import Pagination from './components/Pagination';
import ItemPerPage from './components/ItemPerPage';
import Modal from './components/Modal';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPokes(this.props.limit);
  }

  render() {
    let{limit, activePage, totalPages, itemsPerPage, pokemons, setActivePage, changeItemsPerPage, toggleModal, showModal, pokemonDetails, getDetails} = this.props;

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
          toggleModal={toggleModal}
          getDetails={getDetails}
        />
        <Pagination
          items={totalPages}
          activePage={activePage}
          clickPagination={setActivePage}
        />
        <Modal
          showModal={showModal}
          toggleModal={toggleModal}
          pokemon={pokemonDetails}
          stats={pokemonDetails.stats}
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
  itemsPerPage: state.itemsPerPage,
  showModal: state.showModal,
  pokemonDetails: state.details
});

const mapDispatchToProps = dispatch =>({
  getPokes: bindActionCreators(Actions.getPokesMiddleware, dispatch),
  setActivePage: bindActionCreators(Actions.setActivePage, dispatch),
  changeItemsPerPage: bindActionCreators(Actions.changeItemsPerPage, dispatch),
  toggleModal: bindActionCreators(Actions.toggleModal, dispatch),
  getDetails: bindActionCreators(Actions.fetchDetailsMiddleWare, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
