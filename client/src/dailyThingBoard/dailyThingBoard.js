import React, { useState } from "react";
import {header, board, footer} from './DailyThingBoardStyle';

import { Container, Row, FormInput, Button } from 'shards-react';
import DailyThing from './dailyThing/dailyThing';

function getLocaleDate() {
    return (new Date()).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function dailyThingBoard() {


    return (
        <React.Fragment>
        <Container style={header}>
            <span>{getLocaleDate()}</span>
        </Container>
        <Container style={board}>
            <Row>
                <DailyThing date="10:20" description="Super chose à faire j'ai beaucoup aimé !" />
                <DailyThing date="10:20" description="Super chose à faire j'ai beaucoup aimé !" />
                <DailyThing date="10:20" description="Super chose à faire j'ai beaucoup aimé !" />
                <DailyThing date="10:20" description="Super chose à faire j'ai beaucoup aimé !" />
                <DailyThing date="10:20" description="Super chose à faire j'ai beaucoup aimé !" />
            </Row>     
        </Container>
        <Container style={footer}>
            <FormInput placeholder="Chose réalisée"/>
            <Button theme="light" style={{marginLeft: '10px'}}>Fait</Button>
        </Container>
        </React.Fragment>
        
        
    )

}