import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  ToastContainer,
} from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
//import useLocalStorage from 'use-local-storage';
import Home from "./Pages/Home";
import AboutMe from "./Pages/AboutMe";
import ErrorPage from "./Pages/ErrorPage";
import { LinkContainer } from "react-router-bootstrap";
//import './App.css';
import React from "react";
import LibraryDB from "./Pages/LibraryDB";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoginForm from "./pagecomponents/LoginForm";
import ErrorToast from "./pagecomponents/ErrorToast";
import MyLibrary from "./Pages/MyLibrary";

{
  /*
  function Heading(){

    const pathname = window.location.pathname;
    const Headings={"/":'Home Base','/home':'Home Base','/aboutme':'All About Me','/librarydatabase':"Encyclopedia Berb's Library Database"};
    return Headings[pathname];   
}
*/
}

{
  /*This is the stuff for dark and light theme.
const themepref=window.matchMedia('(preferes-color-scheme: dark)').matches;
const [theme,setTheme]=useLocalStorage('theme',themepref ? 'dark':'light');

const switchTheme= () =>{
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}
This below will go into the app div:
data-theme={theme}
*/
}
var jwt = sessionStorage.getItem("JWT");
var error = sessionStorage.getItem("Error");
class App extends React.Component {
  componentDidMount() {
    jwt = sessionStorage.getItem("JWT");
    error = sessionStorage.getItem("Error");
    console.log(jwt);
  }

  componentDidUpdate() {
    jwt = sessionStorage.getItem("JWT");
    error = sessionStorage.getItem("Error");
  }

  handleLogout = async (event) => {
    sessionStorage.clear();
    event.preventDefault();
    window.location.replace("/home");
  };

  render() {
    let payloadjson = JSON.parse(sessionStorage.getItem("Payload"));
    return (
      <>
        <div className="app">
          {/*
        <div id="Heading" className="container-fluid mb-3 mt-3">
        
        <h1>{Heading()}</h1>
        
        </div>
        */}

          <div id="Toolbar-Top">
            <Navbar bg="dark" variant="dark" expand="sm">
              <Container fluid>
                {jwt === null && (
                  <Navbar.Brand>
                    <strong>EmilBerbakov.com</strong>
                  </Navbar.Brand>
                )}
                {typeof jwt === "undefined" && (
                  <Navbar.Brand>
                    <strong>EmilBerbakov.com</strong>
                  </Navbar.Brand>
                )}
                {jwt !== null && typeof jwt !== "undefined" && (
                  <Navbar.Brand>
                    Welcome back, {payloadjson.firstname}!
                  </Navbar.Brand>
                )}
                {/*<Navbar.Brand>EmilBerbakov.com</Navbar.Brand>*/}
                <Navbar.Toggle aria-controls="navbar-main"></Navbar.Toggle>
                <Navbar.Collapse id="navbar-main">
                  <Nav className="me-auto">
                    <LinkContainer to="/home">
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="aboutme">
                      <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <NavDropdown
                      title="Projects"
                      id="navbar-projects-dropdown"
                      menuVariant="dark"
                    >
                      <LinkContainer to="/libraryDB">
                        <NavDropdown.Item>Library Database</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="#">
                        <NavDropdown.Item disabled>
                          More Coming Soon!
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>

                    {jwt === null && <LoginForm />}
                    {typeof jwt === "undefined" && <LoginForm />}
                    {/*}
                  <Button onClick={switchTheme} variant='dark'>Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</Button>  
                  */}

                    {jwt !== null && typeof jwt !== "undefined" && (
                      <>
                        <LinkContainer to="#">
                          <Nav.Link
                            onClick={(event) => this.handleLogout(event)}
                          >
                            Logout
                          </Nav.Link>
                        </LinkContainer>
                        {/*<LinkContainer to="/profile"><Nav.Link>My Profile</Nav.Link></LinkContainer>*/}
                        <NavDropdown
                          title="Profile"
                          id="navbar-profile-dropdown"
                          menuVariant="dark"
                        >
                          <LinkContainer to="/mylibrary">
                            <NavDropdown.Item>My Library</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>

          <Routing />
          <div id="footer">
            <Navbar bg="dark" fixed="bottom" className="px-3">
              <Navbar.Text className="text-white">
                Designed and built with React.JS and Bootstrap. There's some C#
                running in the background, too.
              </Navbar.Text>
            </Navbar>
          </div>
        </div>
        {error !== null && <ErrorToast errorMsg={error} />}
      </>
    );
  }
}

function Routing() {
  const location = useLocation();
  return (
    <div id="content" className="container-fluid mt-3 mb-3">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/libraryDB" element={<LibraryDB />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
