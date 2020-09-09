import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

export default function SmartTable(props) {

    let [data, setData] = useState(props.data);
    let [dirOfSort, toggleDirOfSort] = useState('asc')//||desc
    let [selectedColumn, SetSelectedColumn] = useState('')//


    useEffect(()=>{
        sortBySomeColumn('id');
    }, []);

    let tableRows = data.map(client => {
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
        SetSelectedColumn(columnName);
    }

    const sortArrow = dirOfSort==='asc' ? <span>&#9660;</span> : <span>&#9650;</span>;

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={sortBySomeColumn.bind(null, 'id')}>ID {selectedColumn ==='id' && sortArrow}</th>
                        <th onClick={sortBySomeColumn.bind(null, 'firstname')}>First Name {selectedColumn ==='firstname' && sortArrow}</th>
                        <th onClick={sortBySomeColumn.bind(null, 'lastname')}>Last Name {selectedColumn ==='lastname' && sortArrow}</th>
                        <th onClick={sortBySomeColumn.bind(null, 'email')}>email {selectedColumn ==='email' && sortArrow}</th>
                        <th onClick={sortBySomeColumn.bind(null, 'phone')} className='d-flex justify-content-center'>phone {selectedColumn ==='phone' && sortArrow}</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
        </Container>
    )
}