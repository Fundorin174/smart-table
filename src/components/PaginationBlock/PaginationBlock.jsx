import React from 'react';

import Pagination from 'react-bootstrap/Pagination';

export default function PaginationBlock(props) {
    
    let active = 1;
    let items = [];
    for (let number = 1; number <= props.numOfPages; number++) {
        items.push(
          <Pagination.Item key={number} active={number === active}>
            {number}
          </Pagination.Item>,
        );
      }


    return (
        <Pagination size="sm">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Ellipsis />
            {items}
            <Pagination.Ellipsis />
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )


}  