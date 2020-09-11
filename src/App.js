import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Loader from './components/loader/Loader';
import SmartTable from './components/SmartTable/SmartTable';

function App() {

  let [isDataLoading, setDataLoadingFlag] = useState(false);
  let [usersFilter, setUsersFilter] = useState('');//сюда не приходит данные из таблицы
  let dataRef = useRef('');
   useEffect(()=>{
    async function getTableData () {
      let url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstname={firstName}&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';      
      const response = await fetch(url);
      let data = await response.json();
      dataRef.current = await data;  
      await filterDataByUser(usersFilter);
      setDataLoadingFlag(true);
      }
    getTableData();  

  },[isDataLoading]);

  // useEffect(()=>{
  //   console.log(usersFilter)
  //   filterDataByUser(usersFilter);
  // }, [usersFilter]);

  const filterDataByUser = (usersData) => {        
    let filteredData = dataRef.current?.filter((row)=>
        row.id.toString().toLowerCase().includes(usersData.toLowerCase()) ||
        row.firstname.toString().toLowerCase().includes(usersData.toLowerCase()) ||
        row.lastname.toString().toLowerCase().includes(usersData.toLowerCase()) ||
        row.email.toString().toLowerCase().includes(usersData.toLowerCase()) ||
        row.phone.toString().toLowerCase().includes(usersData.toLowerCase())
        );
        dataRef.current = filteredData;  

}

  return (
    <Container className="Container mt-3">
     { !isDataLoading ? <Loader /> : <SmartTable data={dataRef.current} setUsersFilter={setUsersFilter} />}
    </Container>
  );
}

export default App;
