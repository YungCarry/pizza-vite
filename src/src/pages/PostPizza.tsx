import { Container, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const PostPizza = () => {
    const [nev, setNev] = useState('');
    const [leiras, setLeiras] = useState('');
    const [ar, setAr] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const newPizza = {
        nev: nev,
        leiras: leiras,
        ar: Number(ar),
        imageUrl: imageUrl,
    };

    const handleSubmit = () => {
        axios
            .post('/pizzak', newPizza)
            .then((response) => {
                switch (response.status) {
                    case 201:
                        alert('Sikeresen hozzáadva a pizza!');
                        toast.success('Pizza sikeressen hozáadva', {
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
                        break;
                    default:
                        toast.error('Hiba!', {
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
                        break;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <CustomNavbar />
            <Container className="mt-4">
                <h1 className="text-center">Pizza Hozzáadása</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Név</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Pizza neve"
                            value={nev}
                            onChange={(e) => setNev(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formLeiras" className="mb-3">
                        <Form.Label>Leírás</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Pizza leírása"
                            value={leiras}
                            onChange={(e) => setLeiras(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAr" className="mb-3">
                        <Form.Label>Ár</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Pizza ára"
                            value={ar}
                            onChange={(e) => setAr(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formImageUrl" className="mb-3">
                        <Form.Label>Kép URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Kép URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Hozzáadás
                    </Button>
                </Form>
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
        </>
    );
};

export default PostPizza;
