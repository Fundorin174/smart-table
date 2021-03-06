import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import PaginationBlock from '../PaginationBlock/PaginationBlock';

export default function SmartTable(props) {

  let [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  let [dirOfSort, toggleDirOfSort] = useState('asc');//||desc
  let [selectedColumn, setSelectedColumn] = useState('');//
  let [numOfPages, setNumofPages] = useState(1);
  let [paginatedData, setPaginatedData] = useState([]);
  let [itemPerPageCount, setitemPerPageCount] = useState([10]);
  let [activePage, setActivePage] = useState(0);
  let [userFilterText, setUserFilterText] = useState('');



  useEffect(() => {
    sortBySomeColumn('id');

  }, []);

  useEffect(() => {
    createPaginationArray();
    setFilteredData(data)
  }, [data, itemPerPageCount]);


  const createPaginationArray = (filterredArray) => {
    let paginatedData = [];
    const numOfPages = filterredArray ? Math.ceil(filterredArray.length / itemPerPageCount) : Math.ceil(data.length / itemPerPageCount);
    setNumofPages(numOfPages);
    for (let i = 0; i < numOfPages; i++) {
      let startRow = (i) * itemPerPageCount;
      let finishRow = startRow + +itemPerPageCount;
      let newPageData = filterredArray ? filterredArray.slice(startRow, finishRow) : data.slice(startRow, finishRow);
      paginatedData = [...paginatedData, newPageData]
      setPaginatedData(paginatedData);
    }
  }

  const filterDataByUser = (usersData) => {
    
    let localFilteredData = filteredData?.filter((row) =>
      row.id.toString().toLowerCase().includes(usersData.toLowerCase()) ||
      row.firstname.toString().toLowerCase().includes(usersData.toLowerCase()) ||
      row.lastname.toString().toLowerCase().includes(usersData.toLowerCase()) ||
      row.email.toString().toLowerCase().includes(usersData.toLowerCase()) ||
      row.phone.toString().toLowerCase().includes(usersData.toLowerCase())
    );
    createPaginationArray(localFilteredData);
    setUserFilterText('');
  }

  const changeItemPerPageCount = (num) => {
    if (num > 0 && num < data.length && data.length < 50) {
      setitemPerPageCount(num);
    } else
      if (num < data.length && data.length < 50) {
        setitemPerPageCount(1);
      } else
        if (num > data.length && data.length < 50) {
          setitemPerPageCount(data.length);
        } else {
          setitemPerPageCount(50);
        }
  }

  const sortBySomeColumn = (columnName) => {
    let sortData = _.orderBy(props.data, [columnName], [dirOfSort])
    setData(prevData => prevData = sortData);
    dirOfSort === 'asc' ? toggleDirOfSort('desc') : toggleDirOfSort('asc');
    setSelectedColumn(columnName);
  }

  const changeUserFilterData = (text) => {
    setUserFilterText(text);
  }

  let tableRows = paginatedData[activePage]?.map(client => {
    return (
      <tr key={client.id + client.firstname}>
        <td>{client.id}</td>
        <td>{client.firstname}</td>
        <td>{client.lastname}</td>
        <td>{client.email}</td>
        <td className='d-flex justify-content-center'>{client.phone}</td>
      </tr>
    );
  })



  const sortArrow = dirOfSort === 'asc' ? <span>&#9660;</span> : <span>&#9650;</span>;

  return (
    <Container>
      <PaginationBlock numOfPages={numOfPages} setActivePage={setActivePage} />
      <Form.Group className={'d-flex align-items-center'}>
        <Form.Label>Поиск по таблице:</Form.Label>
        <Form.Control className={'col-md-3 number-input d-inline ml-2 mr-2'} type="text" placeholder="Фильтр" value={userFilterText} onChange={e => changeUserFilterData(e.target.value)} />
        <Button onClick={() => filterDataByUser(userFilterText)} variant="secondary" type="submit">Найти</Button>
      </Form.Group>
      <br />
      <label htmlFor="number-input">Вывести строк:</label>
      <Form.Control className={'col-md-1 number-input d-inline'} type="number" value={itemPerPageCount || '10'} onChange={(e) => changeItemPerPageCount(e.target.value)} />


      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={sortBySomeColumn.bind(null, 'id')}>ID {selectedColumn === 'id' && sortArrow}</th>
            <th onClick={sortBySomeColumn.bind(null, 'firstname')}>First Name {selectedColumn === 'firstname' && sortArrow}</th>
            <th onClick={sortBySomeColumn.bind(null, 'lastname')}>Last Name {selectedColumn === 'lastname' && sortArrow}</th>
            <th onClick={sortBySomeColumn.bind(null, 'email')}>email {selectedColumn === 'email' && sortArrow}</th>
            <th onClick={sortBySomeColumn.bind(null, 'phone')} className='d-flex justify-content-center'>phone {selectedColumn === 'phone' && sortArrow}</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    </Container>
  )
}