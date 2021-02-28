
import React, { useEffect, useState } from 'react';
import Header from './components/Header'
import { Container } from 'react-bootstrap';
import InfoWeather from './components/InfoWeather';

export default function App() {
  return (
    <>
      <Header />
      <Container>
        <InfoWeather />
      </Container>
    </>
  )
}
