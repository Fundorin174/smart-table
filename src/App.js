import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Loader from './components/loader/Loader';
import SmartTable from './components/SmartTable/SmartTable';

function App() {

  let [isDataLoading, setData] = useState(false);
  let dataRef = useRef('');
   useEffect(()=>{
    async function getTableData () {
      let url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstname={firstName}&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';      
      const response = await fetch(url);
      let data = await response.json();
      dataRef.current = await data;  
      setData(true);
      }
    getTableData();  

  },[isDataLoading]);

  return (
    <Container className="Container">
     { !isDataLoading ? <Loader /> : <SmartTable />}
    </Container>
  );
}

export default App;
