'use client'

import { createContext } from 'react'
import { GiPortugal } from 'react-icons/gi'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import HeaderDropdown from './header-children/HeaderDropdown'
import './Header.scss'

export const navigatorContext = createContext()

function Header() {
  const navInfo = {
    platform: navigator.platform,
    vendor: navigator.vendor,
    appCodeName: navigator.appCodeName,
    appName: navigator.appName,
    connection: navigator.connection.effectiveType,
    deviceMemory: navigator.deviceMemory
  }

  return (
    <navigatorContext.Provider value={navInfo}>
      <Navbar
        expand='lg'
        className='header bg-body-tertiary justify-content-between'>
        <Container>
          <Navbar.Brand href='/'>
            <span className='pt'>
              <GiPortugal />
            </span>
            <span className='nome'>geoapi.pt</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavDropdown title='Distritos' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/distritos/Lisboa'>
                  Lisboa
                </NavDropdown.Item>
                <NavDropdown.Item href='/distritos/Porto'>
                  Porto
                </NavDropdown.Item>
                <NavDropdown.Item href='/distritos'>
                  Todos os distritos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/distritos-demografia'>
                  Demografia
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as='span'>
                <Link href='/municipios'>Municípios</Link>
              </Nav.Link>
              <Nav.Link as='span'>
                <Link href='/freguesias'>Freguesias</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end'>
            <HeaderDropdown />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </navigatorContext.Provider>
  )
}

export default Header
