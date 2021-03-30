import Datas from './response.json';
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class CheckEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Datas,
            events_selected:[],
            success: true
        
        };
    }

    componentDidMount(){
        (async () => {
            var events = this.state.Datas.data.events;
            var event_selected = [];
            var hazai = 0;
            var dontetlen = 0;
            var vendeg = 0;
            for ( let id  in events){
                var competitionName = events[id].competitionName;
                var eventDate = events[id].eventDate;
                var eventName = events[id].eventName;
                var bettingStatus = events[id].bettingStatus;
                hazai = 0;
                dontetlen = 0;
                vendeg = 0;
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
                            <Table.Row  key={marketRealNo} >
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
                    {this.state.events_selected}                     
                    </Table.Body>
                </Table> 
                {this.state.success?'':'Nincs számunkra megfelelő meccs :-)'}                     

            </div>
        )

    }

}
export default CheckEvents;


