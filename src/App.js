import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';

function App() {

  
  let dataRef = useRef('');
   useEffect(()=>{
    async function getTableData () {
      let url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstname={firstName}&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';      
      const response = await fetch(url);
      let data = await response.json();
      dataRef.current = data; 
      
    }
    getTableData();  
    //setData(dataRef.current)
    setTimeout(()=>{
      console.log(dataRef.current);
    }, 2000)
  },[]);

  return (
    <Container className="Container">
     Hello
    </Container>
  );
}

export default App;
