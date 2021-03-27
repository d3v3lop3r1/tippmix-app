import fs from 'fs';
import React from 'react'
import { Table } from 'semantic-ui-react'

const checkEvents = async () => {
    const stack = await fs.readFileSync('./response.json','utf-8');
    const parsed_stack = JSON.parse(stack);  
    const events = parsed_stack.data.events;
    var event_selected = '';
    var id;

    for (id in events){
        var eventId = events[id].eventId;
        var eventName = events[id].eventName;
        var bettingStatus = events[id].bettingStatus;
        var hazai = Number(events[id].markets[0].outcomes[0]);
        var dontetlen = Number(events[id].markets[0].outcomes[1]);
        var vendeg = Number(events[id].markets[0].outcomes[2]);
        
        if ( hazai > 2.37 && hazai < 2.6 && vendeg > 2.37 && vendeg < 2.6 ){
            event_selected += `<Table.Row><Table.Cell>${eventId}</Table.Cell><Table.Cell>${eventName}</Table.Cell><Table.Cell>${bettingStatus}</Table.Cell><Table.Cell>${hazai}</Table.Cell><Table.Cell>${dontetlen}</Table.Cell><Table.Cell>${vendeg}</Table.Cell></Table.Row>`;
            console.log(eventId);
        }

    };

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
                {event_selected}
            </Table.Body>
        </Table>    
    )
    
    }

export default checkEvents;



