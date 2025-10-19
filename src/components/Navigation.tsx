import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTags, faChartBar } from '@fortawesome/free-solid-svg-icons';

export const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Stash MVP</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>
              <FontAwesomeIcon icon={faHome} /> Library
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/tags">
            <Nav.Link>
              <FontAwesomeIcon icon={faTags} /> Tags
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/stats">
            <Nav.Link>
              <FontAwesomeIcon icon={faChartBar} /> Stats
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};