import { useEffect, useState } from 'react';
import { Pizza } from '../types/Pizza';
import apiClient from '../apiClient/apiClient';
import Card from 'react-bootstrap/Card';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import './Pizzak.css';
import { Link } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Pizzak = () => {
    const [data, setData] = useState<Array<Pizza>>([]);

    const kosar: Array<Pizza> = [];

    useEffect(() => {
        apiClient
            .get('/pizzak')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="page-container" data-testid="pizzak-div">
            <Navbar />
            <Container className="content-container">
                <h1 className="text-center my-4">Pizzáink</h1>
                <Row xs={1} md={3} lg={4} className="g-4">
                    {data.map((p) => (
                        <Col key={p.id.toString()}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    className="card-image"
                                    variant="top"
                                    src={'http://localhost:8001/api/kepek/' + p.imageUrl}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-center">{p.nev}</Card.Title>
                                    <Card.Text className="text-muted">{p.leiras}</Card.Text>
                                    <Card.Text className="mt-auto text-center fw-bold">
                                        {p.ar.toString()} Ft
                                    </Card.Text>
                                    <Stack
                                        direction="horizontal"
                                        gap={2}
                                        className="d-flex justify-content-center"
                                    >
                                        <Link to={`pizza/${p.id}`}>
                                            <Button variant="dark">Megtekintés</Button>
                                        </Link>

                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                toast.success(
                                                    'Termék sikeressen hozzáadva a kosárhoz',
                                                    {
                                                        position: 'bottom-right',
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: false,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: 'dark',
                                                    },
                                                );
                                                kosar.push(p);
                                                sessionStorage.setItem(
                                                    'kosar',
                                                    JSON.stringify(kosar),
                                                );
                                            }}
                                        >
                                            Kosárba
                                        </Button>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    );
};

export default Pizzak;
