import Datas from './response.json';
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class CheckEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Datas,
            events_selected:''
        
        };
    }

    componentDidMount(){
        (async () => {
            //var stack = await fs.readFileSync('./response.json',{encoding:'utf8', flag:'r'});
            // var parsed_stack = JSON.parse(this.state.events_selected);
            // console.log(event_selected)
            // console.log(parsed_stack);  
            var events = this.state.Datas.data.events;
            var event_selected = [];
            for ( let id  in events){
                var eventId = events[id].eventId;
                var eventName = events[id].eventName;
                var bettingStatus = events[id].bettingStatus;
                var hazai = Number(events[id].markets[0].outcomes[0].fixedOdds);
                var dontetlen = Number(events[id].markets[0].outcomes[1].fixedOdds);
                var vendeg = Number(events[id].markets[0].outcomes[2].fixedOdds);
                
                if ( hazai > 2.37 && hazai < 2.6 && vendeg > 2.37 && vendeg < 2.6 ){
                    event_selected.push(
                        <Table.Row>
                            <Table.Cell>{eventId}</Table.Cell>
                            <Table.Cell>{eventName}</Table.Cell>
                            <Table.Cell>{bettingStatus}</Table.Cell>
                            <Table.Cell>{hazai}</Table.Cell>
                            <Table.Cell>{dontetlen}</Table.Cell>
                            <Table.Cell>{vendeg}</Table.Cell>
                        </Table.Row>)
                    console.log(eventId);
                }
            }
            this.setState({events_selected : event_selected});
        })();
        
    }

    

    render(){
        return(
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Név</Table.HeaderCell>
                        <Table.HeaderCell>Státusz</Table.HeaderCell>
                        <Table.HeaderCell>Hazai odds</Table.HeaderCell>
                        <Table.HeaderCell>Döntetlen odds</Table.HeaderCell>
                        <Table.HeaderCell>Vendég odds</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                   {this.state.events_selected}                     

                    
                </Table.Body>
            </Table>    
        )

    }

}
export default CheckEvents;



