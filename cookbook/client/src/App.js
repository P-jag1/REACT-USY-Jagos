import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas'; 
import Nav from 'react-bootstrap/Nav';
import appStyles from './App.css';
import navbarStyles from './css/mainNavbar.module.css';

function App() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <div>
      <Navbar className={navbarStyles.mainNavbar} expand={"sm"}>
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            Vymazlená Kuchařka
          </Navbar.Brand>
          <Navbar.Toggle className={navbarStyles.customToggle} aria-controls={`offcanvasNavbar-expand-sm`} onClick={handleShow}/>
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`} show={showOffcanvas} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`} onClick={() => { navigate('/'); handleClose(); }}>
              Vymazlená Kuchařka
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link onClick={() => {navigate('/recipeList'); handleClose();}}>
                  Recepty
                </Nav.Link>
                <Nav.Link onClick={() => {navigate('/ingredientList'); handleClose();}}>
                  Ingredience
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;
