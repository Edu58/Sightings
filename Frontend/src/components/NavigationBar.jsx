import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
      <>
          <Navbar bg="dark" variant='dark'>
              <Container>
                  <Navbar.Brand href="#home">Sightings</Navbar.Brand>
              </Container>
          </Navbar>
      </>
  )
}

export default NavigationBar;