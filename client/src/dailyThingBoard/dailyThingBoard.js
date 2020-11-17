import React, { useState, useRef, useEffect } from "react";
import { Container, Row, FormInput, Button } from 'shards-react';

import {header, board, footer} from './DailyThingBoardStyle';
import { serverAPI, getAxiosAuthHeader } from '../APIs';

import DailyThing from './dailyThing/dailyThing';

function getLocaleDate() {
    return (new Date()).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getHourMinutesFromTimestamp(t) {
    const d = new Date(t); 
    let m = d.getMinutes(); m = m < 10 ? "0"+m : m;
    let h = d.getHours(); h = h < 10 ? "0"+h : h;
    return h + ':' + m; 
}

export default function DailyThingBoard() {

    const listEnd = useRef(null);

    const [newThing, setNewThing] = useState('');
    const [things, setThings] = useState([]);

    useEffect(() => {
        serverAPI.get('/api/thing', getAxiosAuthHeader())
        .then(rep => {
            setThings(rep.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const onSubmit = () => {
        serverAPI.post('/api/thing', {description: newThing}, getAxiosAuthHeader()).then(resp => {
            setNewThing('');
            
            const createdThingId = resp.data.resource_id;
            serverAPI.get(`api/thing/${createdThingId}`, getAxiosAuthHeader())
            .then(resp2 => {
                setThings((previousThings) => [...previousThings, resp2.data]);
                listEnd.current.scrollIntoView({behavior: 'smooth'});
            })
            .catch(err2 => console.log(err2));

            
        })
        .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
        <Container style={header}>
            <span>{getLocaleDate()}</span>
        </Container>
        <Container style={board}>
            <Row>
                {things.map((thing, index) => {
                    return <DailyThing key={index} date={getHourMinutesFromTimestamp(thing.date)} description={thing.description}/>
                })}
            </Row>     
        </Container>
        <div ref={listEnd}></div>
        <Container style={footer}>
            <FormInput placeholder="Chose réalisée" value={newThing} onChange={(e) => {setNewThing(e.target.value);}}/>
            <Button theme="light" style={{marginLeft: '10px'}} disabled={newThing.length === 0} onClick={onSubmit}>Fait</Button>
        </Container>
        </React.Fragment>
        
        
    )

}