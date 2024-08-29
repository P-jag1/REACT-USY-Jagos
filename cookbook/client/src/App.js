import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas'; 
import Nav from 'react-bootstrap/Nav';
import navbarStyles from './css/mainNavbar.module.css';
import UserContext from './UserProvider';

function App() {
  const { isAuthorized, Authorize } = useContext(UserContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <div>
      <Navbar className={navbarStyles.mainNavbar} expand={"sm"}>
        <Container fluid>
          <Navbar.Brand className={navbarStyles.title} onClick={() => navigate("/home")}>
            Vymazlená Kuchařka
          </Navbar.Brand>
          <Navbar.Toggle className={navbarStyles.customToggle} aria-controls={`offcanvasNavbar-expand-sm`} onClick={handleShow}/>
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`} show={showOffcanvas} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className={navbarStyles.title} id={`offcanvasNavbarLabel-expand-sm`} onClick={() => { navigate('/home'); handleClose(); }}>
              Vymazlená Kuchařka
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className={navbarStyles.navbarButton} onClick={() => {navigate('/recipeList'); handleClose();}}>
                  Recepty
                </Nav.Link>
                <Nav.Link className={navbarStyles.navbarButton} onClick={() => {navigate('/ingredientList'); handleClose();}}>
                  Ingredience
                </Nav.Link>
                <Nav.Link  onClick={() => { Authorize(); handleClose(); }} className={navbarStyles.navbarButton}>
                  {isAuthorized ? 'Odhlásit' : 'Přihlásit'}
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
