// src/components/Dashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';

const Dashboard = ({ balance, transactions }) => (
    <div className="mt-4">
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Баланс</Card.Title>
                        <Card.Text>${balance}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Транзакции</Card.Title>
                        <Card.Text>всего {transactions.length} транзакции</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
);

export default Dashboard;
