import React from 'react';


const ItemPerPage = props => {
    return(
        <select onChange={props.selectItemsPerPage} value={props.itemsPerPage}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value={props.limit}>All</option>
        </select>
    );
};

export default ItemPerPage;