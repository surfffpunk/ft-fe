// src/components/TransactionsTable.js
import React from 'react';
import { Table } from 'react-bootstrap';

const TransactionsTable = ({ transactions }) => (
    <Table striped bordered hover className="mt-4">
        <thead>
        <tr>
            <th>#</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Дата</th>
        </tr>
        </thead>
        <tbody>
        {transactions.map((tx, index) => (
            <tr key={tx.id}>
                <td>{index + 1}</td>
                <td>{tx.category}</td>
                <td>{tx.type}</td>
                <td>{tx.amount > 0 ? `+${tx.amount}` : `${tx.amount}`}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
            </tr>
        ))}
        </tbody>
    </Table>
);

export default TransactionsTable;
