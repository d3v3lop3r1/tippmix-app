import React, { Component } from 'react';
import axios from 'axios';
import { Table, Loader, Dimmer,Message } from 'semantic-ui-react';


class FreshEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsSelected:[],
            success: 0,
            loading: 0,
            error: {
                switch: 1,
                message:''
            }
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        const GETDATA_URL = "https://tippmix-backend.herokuapp.com/api/getdata";
        //const GETDATA_URL = "http://localhost:5000/api/getdata";
        if (!this.state.success){
            var options = {
                method: 'GET',
                url: GETDATA_URL,
                header: {
                    'Accept-Language': 'en-US,en;q=0.9,hu;q=0.8,de;q=0.7',
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Host':'api.tippmix.hu',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                    'Origin': 'https://tippmix-frontend.herokuapp.com',
                    'Referer': 'https://tippmix-frontend.herokuapp.com'
                    }
            };
            axios(options).then((response) => {
                //var eventsData = JSON.parse(response.body);
                var events = response.data.data.events;
                var eventSelected = [];
               
                for ( let id  in events){
                    if (typeof events[id].markets[0] !== 'undefined'){

                        var competitionName = events[id].competitionName;
                        var rawDate = events[id].eventDate;
                        var eventDate = rawDate.replace("T", " ").replace("+", " ");
                        var eventName = events[id].eventName;
                        var eventId = events[id].eventId;
                        var bettingStatus = events[id].bettingStatus;
                        var marketRealNo = events[id].markets[0].marketRealNo;
                        var hazai = 0;
                        var dontetlen = 0;
                        var vendeg = 0;
                        var valid = 0;
                        if (typeof events[id].markets[0].outcomes[0] !== 'undefined' && typeof events[id].markets[0].outcomes[1] !== 'undefined' && typeof events[id].markets[0].outcomes[2] !== 'undefined'){
                            hazai = Number(events[id].markets[0].outcomes[0].fixedOdds);
                            dontetlen = Number(events[id].markets[0].outcomes[1].fixedOdds);
                            vendeg = Number(events[id].markets[0].outcomes[2].fixedOdds);
                        }
                        if ( hazai > 2.4 && hazai < 2.6 && hazai+0.25 <= vendeg ) {
                            valid = 1;
                        }
                        
                        if ( vendeg > 2.35 && vendeg < 2.6 && vendeg+0.25 <= hazai ) {
                            valid = 1;
                        }
                        
                        
                        eventSelected.push(
                            <Table.Row key={marketRealNo}>
                                <Table.Cell>{eventId}</Table.Cell>
                                <Table.Cell>{competitionName}</Table.Cell>
                                <Table.Cell>{eventName}</Table.Cell>
                                <Table.Cell textAlign='center'>{marketRealNo}</Table.Cell>
                                <Table.Cell>{eventDate}</Table.Cell>                           
                                <Table.Cell textAlign='center'>{bettingStatus}</Table.Cell>
                                <Table.Cell textAlign='center'>{hazai}</Table.Cell>
                                <Table.Cell textAlign='center'>{dontetlen}</Table.Cell>
                                <Table.Cell textAlign='center'>{vendeg}</Table.Cell>
                                <Table.Cell textAlign='center'>{valid?"x":""}</Table.Cell>
                            </Table.Row>
                        )
                    }
                }
    
                if (eventSelected.length === 0 ){
                    eventSelected.push(
                        <Table.Row>
                            <Table.Cell>nincs adat</Table.Cell>
                            <Table.Cell>nincs adat</Table.Cell>
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
                    eventsSelected: eventSelected
                })
            }).catch((error)=>{
                this.setState({
                    success: 0, 
                    loading: 1,
                    error: {
                        switch:0,
                        message: error.message
                    }
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
                            <Table.HeaderCell>E.id</Table.HeaderCell>
                            <Table.HeaderCell>Verseny</Table.HeaderCell>
                            <Table.HeaderCell>M??rk??z??s</Table.HeaderCell>
                            <Table.HeaderCell>Hiv.sz??m</Table.HeaderCell>
                            <Table.HeaderCell>D??tum</Table.HeaderCell>
                            <Table.HeaderCell>St??tusz</Table.HeaderCell>
                            <Table.HeaderCell>H</Table.HeaderCell>
                            <Table.HeaderCell>D</Table.HeaderCell>
                            <Table.HeaderCell>V</Table.HeaderCell>
                            <Table.HeaderCell>Fontos</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.eventsSelected}                     
                    </Table.Body>
                </Table> 
                {this.state.loading?'':<Dimmer active inverted><Loader inverted>T??lt??m az adatokat</Loader></Dimmer>}                     
                {this.state.error.switch?'':(
                <Message negative>
                    <Message.Header>
                        Hiba a let??lt??sben, k??rlek pr??b??ld k??s??bb
                    </Message.Header>
                    <p>{this.state.error.message}</p>
                    <p>A hiba oka lehet m??g:</p>
                    <ul>
                        <li>
                            nincs internet kapcsolat
                        </li>
                        <li>
                            a backend szerver le??llt
                        </li>
                        <li>
                            vagy csak m??r ez sem akar dolgozni :-)
                        </li>
                    </ul>
                </Message>)}
            </div>
        )

    }

}
export default FreshEvents;



