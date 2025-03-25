import React, { useState, useEffect, useRef } from 'react';
import { Pizza } from '../types/Pizza';
import CustomNavbar from '../components/Navbar';
import { Container, Table, Row, Col, Button } from 'react-bootstrap';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import apiClient from '../apiClient/apiClient';
import { Navigate, useNavigate } from 'react-router-dom';

const Kosar = () => {
    const [kosar, setKosar] = useState<Pizza[]>([]);
    const mennyiseg = useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
        const savedKosar = sessionStorage.getItem('kosar');
        if (savedKosar) {
            setKosar(JSON.parse(savedKosar));
        }
    }, []);

    const vegosszeg = kosar.reduce((total, item) => total + Number(item.ar), 0);

    const emptyCart = () => {
        sessionStorage.removeItem('kosar');

        window.location.reload();
        toast.success('Kosár sikeressen űrítve', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
        });
    };

    const removeFromCart = (index: number) => {
        const newKosar = [...kosar];
        newKosar.splice(index, 1);
        setKosar(newKosar);
        sessionStorage.setItem('kosar', JSON.stringify(newKosar));
        if (kosar.length === 1) {
            sessionStorage.removeItem('kosar');
        }
        toast.success('Tétel sikeresen törölve a kosárból');
    };

    const postOrder = () => {
        kosar.forEach((pizza) => {
            apiClient
                .post(
                    '/rendelesek',
                    { pizzaId: pizza.id, mennyiseg: 1 },
                    {
                        auth: {
                            username: sessionStorage.getItem('userName') || '',
                            password: sessionStorage.getItem('password') || '',
                        },
                    },
                )

                .then((response) => {
                    switch (response.status) {
                        case 201:
                            console.log('User created successfully');
                            break;
                        case 400:
                            console.error('Bad request');
                            break;
                        default:
                            console.error('An error occurred');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            sessionStorage.removeItem('kosar');
        });
        toast.success('Rendelés sikeresen leadva');
    };

    return (
        <div>
            <CustomNavbar />
            <Container className="mt-4">
                <h1 className="text-center">Kosár</h1>
                <div className="main">
                    {kosar.length > 0 ? (
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Kép</th>
                                        <th>Név</th>
                                        <th>Ár</th>
                                        <th>Mennyiség</th>
                                        <th>Törlés</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kosar.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    alt={item.nev}
                                                    src={`http://localhost:8001/api/kepek/${item.imageUrl}`}
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            </td>
                                            <td>{item.nev}</td>
                                            <td>{item.ar.toString()} Ft</td>
                                            <td></td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeFromCart(index)}
                                                >
                                                    Törlés
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Row className="justify-content-end gx-5">
                                <Col xs="auto" className="">
                                    <h2>Végösszeg: {vegosszeg} Ft</h2>

                                    <Col className="gx-5">
                                        <Button variant="primary" onClick={postOrder}>
                                            Rendelés leadása
                                        </Button>
                                        <Button
                                            data-testid="EmptyCartButton"
                                            variant="dark"
                                            onClick={emptyCart}
                                        >
                                            Kosár űrítése
                                        </Button>
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <p className="text-center">A kosár üres.</p>
                    )}
                </div>
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
                theme="light"
                transition={Bounce}
            />
        </div>
    );
};

export default Kosar;
