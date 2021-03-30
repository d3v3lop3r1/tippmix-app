//import fs from 'fs';
import React, { Component } from 'react';
//import request from 'request';
import axios from 'axios';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
//import FormData from 'form-data';


class FreshEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsSelected:[],
            success: 0,
            loading: 0
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        if (!this.state.success){
            var options = {
                method: 'GET',
                url: 'https://tippmix-backend.herokuapp.com/getdata',
                headers: {
                    'Accept-Language': 'en-US,en;q=0.9,hu;q=0.8,de;q=0.7',
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                    'Origin': 'https://tippmix-frontend.herokuapp.com',
                    'Referer': 'https://tippmix-frontend.herokuapp.com',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                    'Access-Control-Allow-Headers': "Content-Type"        
                },
                      
            };
            axios(options).then((response) => {
                //var eventsData = JSON.parse(response.body);
                var events = response.data.data.events;
                var event_selected = [];
                for ( let id  in events){
                    var competitionName = events[id].competitionName;
                    var eventDate = events[id].eventDate;
                    var eventName = events[id].eventName;
                    var bettingStatus = events[id].bettingStatus;
                    var hazai = 0;
                    var dontetlen = 0;
                    var vendeg = 0;
        
                    if (typeof events[id].markets[0] !== 'undefined'){
                        var marketRealNo = events[id].markets[0].marketRealNo;
                        if (typeof events[id].markets[0].outcomes[0] !== 'undefined' && typeof events[id].markets[0].outcomes[1] !== 'undefined' && typeof events[id].markets[0].outcomes[2] !== 'undefined'){
                            hazai = Number(events[id].markets[0].outcomes[0].fixedOdds);
                            dontetlen = Number(events[id].markets[0].outcomes[1].fixedOdds);
                            vendeg = Number(events[id].markets[0].outcomes[2].fixedOdds);
                        }
                        if ( hazai > 2.4 && hazai < 2.6 && hazai+0.25 <= vendeg ) {
                            event_selected.push(
                                <Table.Row key={marketRealNo}>
                                    <Table.Cell>{competitionName}</Table.Cell>
                                    <Table.Cell>{eventName}</Table.Cell>
                                    <Table.Cell textAlign='center'>{marketRealNo}</Table.Cell>
                                    <Table.Cell>{eventDate}</Table.Cell>                           
                                    <Table.Cell textAlign='center'>{bettingStatus}</Table.Cell>
                                    <Table.Cell textAlign='center'>{hazai}</Table.Cell>
                                    <Table.Cell textAlign='center'>{dontetlen}</Table.Cell>
                                    <Table.Cell textAlign='center'>{vendeg}</Table.Cell>
                                </Table.Row>
                            )
                        }
                            
                        if ( vendeg > 2.35 && vendeg < 2.6 && vendeg+0.25 <= hazai ) {
                            event_selected.push(
                                <Table.Row key={marketRealNo}>
                                    <Table.Cell>{competitionName}</Table.Cell>
                                    <Table.Cell>{eventName}</Table.Cell>
                                    <Table.Cell textAlign='center'>{marketRealNo}</Table.Cell>
                                    <Table.Cell>{eventDate}</Table.Cell>                           
                                    <Table.Cell textAlign='center'>{bettingStatus}</Table.Cell>
                                    <Table.Cell textAlign='center'>{hazai}</Table.Cell>
                                    <Table.Cell textAlign='center'>{dontetlen}</Table.Cell>
                                    <Table.Cell textAlign='center'>{vendeg}</Table.Cell>
                                </Table.Row>
                            )
                        }
                        
        
                    }
                }
    
                if (event_selected.length === 0 ){
                    event_selected.push(
                        <Table.Row>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
                        </Table.Row>
                    )
                } 
                this.setState({
                    success: 1, 
                    loading:1,
                    eventsSelected: event_selected
                });
            })
            
        }
    }


    render(){
        return(
            <div>
                <Table unstackable color = {'blue'} inverted striped size='small' celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Verseny neve</Table.HeaderCell>
                            <Table.HeaderCell>Mérkőzés</Table.HeaderCell>
                            <Table.HeaderCell>Mérkőzés száma</Table.HeaderCell>
                            <Table.HeaderCell>Dátum</Table.HeaderCell>
                            <Table.HeaderCell>Státusz</Table.HeaderCell>
                            <Table.HeaderCell>Hazai</Table.HeaderCell>
                            <Table.HeaderCell>Döntetlen</Table.HeaderCell>
                            <Table.HeaderCell>Vendég</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.eventsSelected}                     
                    </Table.Body>
                </Table> 
                {this.state.loading?'':<Dimmer active inverted><Loader inverted>Töltöm az adatokat</Loader></Dimmer>}                     

            </div>
        )

    }

}
export default FreshEvents;



