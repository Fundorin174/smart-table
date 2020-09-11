import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationBlock(props) {
  let [activePage, setActivePage] = useState(1);
  let active = activePage;
  let items = [];
  for (let number = 1; number <= props.numOfPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => changeCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  const changeCurrentPage = (neededPage) => {
    switch (neededPage) {
      case -1: setActivePage(activePage - 1);
        props.setActivePage(activePage - 2); //fist row = 0, but first pagination number = 1
        break;
      case 0: setActivePage(activePage + 1);
        props.setActivePage(activePage);//fist row = 0, but first pagination number = 1
        break;
      default: {
        setActivePage(neededPage);
        props.setActivePage(neededPage - 1);//fist row = 0, but first pagination number = 1
      }

    }

  }



  return (
    <Pagination size="sm">
      <Pagination.First className={(activePage === 1) && 'disabled'} onClick={() => changeCurrentPage(1)} />
      <Pagination.Prev className={(activePage === 1) && 'disabled'} onClick={() => changeCurrentPage(-1)} />
      {items}
      <Pagination.Next className={(activePage === props.numOfPages) && 'disabled'} onClick={() => changeCurrentPage(0)} />
      <Pagination.Last className={(activePage === props.numOfPages) && 'disabled'} onClick={() => changeCurrentPage(props.numOfPages)} />
    </Pagination>
  )


}  