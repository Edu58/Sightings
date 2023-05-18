import { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Card, Table} from "react-bootstrap";
import axiosClient from "./components/Axios.js";
import './App.css'

function App() {
    const [sightings, setSightings] = useState([])
    const getSightings = async () => {
        await axiosClient.get("/api/v1/sightings")
            .then(response => {
                setSightings(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getSightings()
    },[])
  return (
    <div className={"App"}>
      <NavigationBar />
      
      <Container>
        <Form className={"mt-3"}>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="e.g. lions"
                />
                <Button type={"submit"} variant="success" id="search">
                    Search
                </Button>
            </InputGroup>
        </Form>

          <div>
              <Card>
                  <Card.Header className={"fs-4 text-center"}>Wildlife Sightings</Card.Header>
                  <Card.Body>
                      <Table responsive="md">
                          <thead>
                          <tr>
                              <th>#</th>
                              <th>Sighting ID</th>
                              <th>Date & Time</th>
                              <th>Species</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              sightings.map((sighting, i) => {
                                  return (
                                      <tr>
                                          <td>{i+1}</td>
                                          <td>{sighting?.sighting_id}</td>
                                          <td>{sighting?.sighting_datetime}</td>
                                          <td>{sighting?.species}</td>
                                      </tr>
                                  )
                              })
                          }
                          </tbody>
                      </Table>
                  </Card.Body>
              </Card>
          </div>
      </Container>
    </div>
  )
}

export default App
