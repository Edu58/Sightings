import { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card, Table } from "react-bootstrap";
import axiosClient from "./components/Axios.js";
import './App.css'

function App() {
    const [sightings, setSightings] = useState([])
    const [filteredSightings, setFilteredSightings] = useState([])
    const getSightings = async () => {
        await axiosClient.get("/api/v1/sightings")
            .then(response => {
                setSightings(response.data)
                setFilteredSightings(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);

        if (data.get("species") === "All") {
            setFilteredSightings(sightings)
        } else {
            await axiosClient.get(`/api/v1/sightings?species=${data.get('species')}`)
                .then(response => {
                    setFilteredSightings(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        getSightings()
    }, [])
    return (
        <div className={"App"}>
            <NavigationBar />

            <Container>
                <Form className={"mt-3"} onSubmit={handleSubmit}>
                    <Form.Label className='fw-bold fs-4'>Filter</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Select name='species'>
                            <option name="All">All</option>
                            {
                                sightings.map(sighting => {
                                    return (
                                        <option key={sighting.sighting_id} value={sighting.species}>{sighting.species}</option>
                                    )
                                })
                            }
                        </Form.Select>

                        <Button type='submit' variant="success">
                            Filter Results
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
                                        <th>Sighting ID</th>
                                        <th>Date & Time</th>
                                        <th>Species</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredSightings.map(sighting => {
                                            return (
                                                <tr key={sighting.sighting_id}>
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
