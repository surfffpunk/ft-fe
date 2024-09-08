import React, { useEffect, useState } from 'react';
import { getBalance, getTransactions } from '../services/api';

const HomePage = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getBalance().then(response => setBalance(response.data));
        getTransactions().then(response => setTransactions(response.data));
    }, []);


};

export default HomePage;
