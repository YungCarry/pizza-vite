import { useState } from 'react';
import apiClient from '../apiClient/apiClient';
import { Rendeles } from '../types/Rendeles';
import CustomNavbar from '../components/Navbar';
import { Table } from 'react-bootstrap';

const Rendelesek = () => {
    const [data, setData] = useState(Array<Rendeles>);

    if (sessionStorage.getItem('userName') == null)
        return (
            <div>
                <CustomNavbar />
                <h1>Rendelések megketinéséhez be kell jelentkezned!</h1>
            </div>
        );
    else {
        apiClient
            .get('/rendelesek', {
                auth: {
                    username: sessionStorage.getItem('userName') || '',
                    password: sessionStorage.getItem('password') || '',
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        return (
            <div>
                <CustomNavbar />
                <h1>Rendelések</h1>
                <Table striped bordered hover>
                    <th>ID</th>
                    <th>Mennyiség</th>
                    {data.map((r) => (
                        <tr>
                            <td>{r.pizzaId.toString()} </td>
                            <td>{r.mennyiseg.toString()} db</td>
                        </tr>
                    ))}
                </Table>
            </div>
        );
    }
};

export default Rendelesek;
