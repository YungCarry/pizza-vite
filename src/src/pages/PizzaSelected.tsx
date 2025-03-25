import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient/apiClient';
import { Pizza } from '../types/Pizza';
import CustomNavbar from '../components/Navbar';

const PizzaSelected = () => {
    const { id } = useParams();
    const [data, setData] = useState<Pizza>();

    useEffect(() => {
        apiClient
            .get(`/pizzak/${id}`)
            .then((response) => {
                setData(response.data);
            })
            .then((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <CustomNavbar />
            <h1>Pizza: {id}</h1>
        </div>
    );
};

export default PizzaSelected;
