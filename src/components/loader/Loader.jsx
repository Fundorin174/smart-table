import React from 'react';
import './loader.css'
import { Container } from 'react-bootstrap';

export default function Loader() {
    return(
        <Container className='d-flex align-items-center justify-content-center'>
           <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </Container>
        );}