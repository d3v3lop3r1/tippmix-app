import Datas from './response.json';
import React, { Component } from 'react'
import { Table, Dimmer, Loader, Message } from 'semantic-ui-react'
import axios from 'axios';

class CheckEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Datas,
            events_selected:[],
            success: true,
            loading: 0,
            error: {
                switch: 1,
                message:''
            }
        };
    }

    getResult = async (participants)=>{
        try {
            const GETRESULT_URL = "https://tippmix-backend.herokuapp.com/api/getresult/";
            //const GETRESULT_URL = "http://localhost:5000/api/getresult/";
            const results = await axios.get(GETRESULT_URL + participants);
            console.log(results);
            return results;
        } catch (error) {
            console.log(error.Body)
        }
    };

    componentDidMount(){
        (async () => {
            var events = this.state.Datas.data.events;
            var event_selected = [];
            var hazai = 0;
            var dontetlen = 0;
            var vendeg = 0;
            var valid = 0;
            var score1 = "nincs";
            var score2 = "nincs";
            var matchStatus = "nincs";

            for ( let id  in events){
                var competitionName = events[id].competitionName;
                var eventDate = events[id].eventDate;
                var eventName = events[id].eventName;
                var eventId = events[id].eventId;
                var bettingStatus = events[id].bettingStatus;
                hazai = 0;
                dontetlen = 0;
                vendeg = 0;
                valid = 0;
                score1 = "nincs";
                score2 = "nincs";
                matchStatus = "nincs";

                if (typeof events[id].markets[0] !== 'undefined'){
                    var marketRealNo = events[id].markets[0].marketRealNo;
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

                    if(valid){
                        score1 = "nincs";
                        score2 = "nincs";
                        matchStatus = "nincs";
                        try {
                            const eventNameURL = encodeURI(eventName);
                            const result = await this.getResult(eventNameURL);
                            if(result.data.data.length !== 0 ){
                                if (typeof(result.data.data[0].sportCompetitions[0].events[0].scoreResults[0].scoreParticipant1) !== undefined ){
                                    score1 =  result.data.data[0].sportCompetitions[0].events[0].scoreResults[0].scoreParticipant1.toString();
                                }
                                if (typeof(result.data.data[0].sportCompetitions[0].events[0].scoreResults[0].scoreParticipant2) !== undefined ){
                                    score2 =  result.data.data[0].sportCompetitions[0].events[0].scoreResults[0].scoreParticipant2.toString();
                                }
                                if (typeof(result.data.data[0].sportCompetitions[0].events[0].matchStatus) !== undefined ){
                                    matchStatus = result.data.data[0].sportCompetitions[0].events[0].matchStatus
                                }
                                
                            } else {
                                score1 = "nincs";
                                score2 = "nincs";
                                matchStatus = "nincs";
                            }
                            event_selected.push(
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
                                    <Table.Cell textAlign='center'>{score1}:{score2}</Table.Cell>
                                    <Table.Cell textAlign='center'>{matchStatus}</Table.Cell>
                                </Table.Row>
                            )
                            this.setState({
                                success: 1, 
                                loading:1,
                                eventsSelected: event_selected
                            })
                                        
                        } catch (error) {
                            this.setState({
                                success: 0, 
                                loading: 1,
                                error: {
                                    switch:0,
                                    message: error.message
                                }
                            });
                                        console.log('Hiba az eredmény lekérésében');
                        }    
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
                        <Table.Cell>nincs adat</Table.Cell>
                        <Table.Cell>nincs adat</Table.Cell>
                        <Table.Cell>nincs adat</Table.Cell>
                    </Table.Row>
                )
    } 
            this.setState({
                events_selected : event_selected,
                success : 1
            });

        })();
        
    }

    

    render(){
        return(
            <div>
                <Table unstackable color = {'blue'} inverted striped size='small' celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ev.id</Table.HeaderCell>
                            <Table.HeaderCell>Verseny neve</Table.HeaderCell>
                            <Table.HeaderCell>Mérkőzés</Table.HeaderCell>
                            <Table.HeaderCell>Mérkőzés száma</Table.HeaderCell>
                            <Table.HeaderCell>Dátum</Table.HeaderCell>
                            <Table.HeaderCell>Státusz</Table.HeaderCell>
                            <Table.HeaderCell>Hazai</Table.HeaderCell>
                            <Table.HeaderCell>Döntetlen</Table.HeaderCell>
                            <Table.HeaderCell>Vendég</Table.HeaderCell>
                            <Table.HeaderCell>Eredmény</Table.HeaderCell>
                            <Table.HeaderCell>matchStatus</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.events_selected}                     
                    </Table.Body>
                </Table> 
                {this.state.loading?'':<Dimmer active inverted><Loader inverted>Töltöm az adatokat</Loader></Dimmer>}                     
                {this.state.error.switch?'':(
                <Message negative>
                    <Message.Header>
                        Hiba a letöltésben, kérlek próbáld később
                    </Message.Header>
                    <p>{this.state.error.message}</p>
                </Message>)}
                {this.state.success?'':'Nincs számunkra megfelelő meccs :-)'}                     

            </div>
        )

    }

}
export default CheckEvents;



