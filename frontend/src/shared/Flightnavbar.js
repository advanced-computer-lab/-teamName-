import react from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import './navbar.css'
const Flightnavbar = () => {
    return (
        <div>
            <Navbar  className='custom-border-fill' expand="lg">
                <Container>
                    <Navbar.Brand href="#home"> <img src='../flightBrand.png' className='flightBrand'/> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home" className ="links">Flights</Nav.Link>
                            <Nav.Link href="#link"  className ="links">Login</Nav.Link>
                            <Nav.Link href="#link"  className ="links">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Flightnavbar
