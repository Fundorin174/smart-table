import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import PaginationBlock from '../PaginationBlock/PaginationBlock';

export default function SmartTable(props) {

    let [data, setData] = useState([]);
    let [dirOfSort, toggleDirOfSort] = useState('asc');//||desc
    let [selectedColumn, setSelectedColumn] = useState('');//
    let [numOfPages, setNumofPages] = useState(1);
    let [paginatedData, setPaginatedData] = useState([]);
    let [itemPerPageCount, setitemPerPageCount] = useState([10]);
    let [activePage, setActivePage] = useState(0);


    useEffect(() => {
        sortBySomeColumn('id');
    }, []);


    useEffect(() => {
        createPaginationArray();
    }, [data, itemPerPageCount]);


    const createPaginationArray = () => {
        let paginatedData = [];
        const numOfPages = Math.ceil(data.length / itemPerPageCount);
        setNumofPages(numOfPages);
        for (let i = 0; i < numOfPages; i++) {
            let startRow = (i) * itemPerPageCount;
            let finishRow = startRow + +itemPerPageCount;
            paginatedData = [...paginatedData, data.slice(startRow, finishRow)]
            setPaginatedData(paginatedData);
        }
    }

    const changeItemPerPageCount = (num)=> {
        num > 0 && num < data.length ? setitemPerPageCount(num) : num < data.length ? setitemPerPageCount(1) : setitemPerPageCount(data.length);
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

    const sortBySomeColumn = (columnName) => {
        let sortData = _.orderBy(props.data, [columnName], [dirOfSort])
        setData(sortData);
        dirOfSort === 'asc' ? toggleDirOfSort('desc') : toggleDirOfSort('asc');
        setSelectedColumn(columnName);
    }

    const sortArrow = dirOfSort === 'asc' ? <span>&#9660;</span> : <span>&#9650;</span>;

    return (
        <Container>
            <PaginationBlock numOfPages={numOfPages} setActivePage = {setActivePage}/>
            <label htmlFor="number-input">Вывести строк:</label>
            <Form.Control className={'col-md-1 number-input d-inline'} type="number" value={itemPerPageCount || '10'} onChange = {(e) => changeItemPerPageCount(e.target.value)}/>
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