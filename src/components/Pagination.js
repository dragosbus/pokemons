import React from 'react';

const Pagination = props => {
    let paginations = [];

    for(let i=0;i<props.items;i++) {
        paginations.push(i+1);
    }
    return(
        <div className="pagination">
            {
                paginations.map(index=> <p key={index} onClick={()=>props.clickPagination(index-1)}>{index}</p>)
            }
        </div>
    );
};

export default Pagination;