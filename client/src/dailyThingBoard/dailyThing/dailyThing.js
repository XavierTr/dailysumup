import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from 'shards-react';

export default function dailyThing(props) {

    const { description, date } = props;

    return (
        <Card style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px', width: '100%'}}>
            <CardHeader>{date}</CardHeader>
            <CardBody>
                <CardTitle>{description}</CardTitle>
            </CardBody>
        </Card>
    )

}