
import React from 'react';
import logo from './../assets/sap_logo.svg';
import { Navbar} from 'react-bootstrap';

export default function Header() {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            className="d-inline-block align-top"
          />

        </Navbar.Brand>
        <h1>Тестовое задание №3а</h1>
      </Navbar>
    </>
  )
}
