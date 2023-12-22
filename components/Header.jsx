'use client'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import './Header.scss'

function BasicExample() {
  return (
    <Navbar expand='lg' className='header bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='#home'>geoapi.pt</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as='span'>
              <Link href='/municipios'>Municípios</Link>
            </Nav.Link>
            <NavDropdown title='Distritos' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/distritos/Lisboa'>
                Lisboa
              </NavDropdown.Item>
              <NavDropdown.Item href='/distritos/Porto'>Porto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/distritos'>
                Todos os distritos
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BasicExample
