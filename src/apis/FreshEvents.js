//import fs from 'fs';
import React, { Component } from 'react';
import request from 'request';
//import axios from 'axios';
import { Table } from 'semantic-ui-react';
//import FormData from 'form-data';


class FreshEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events_selected:[],
            success: true
        };
    }

    componentDidMount(){
          this.fetchEvents();  
    
        
    }

    fetchEvents = () =>{
        var options = {
            'method': 'POST',
            'url': 'https://api.tippmix.hu/tippmix/search',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Accept-Language': 'en-US,en;q=0.9,hu;q=0.8,de;q=0.7',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Host':'api.tippmix.hu',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                'Origin': 'https://www.tippmix.hu',
                'Referer': 'https://www.tippmix.hu/',
                'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'Access-Control-Allow-Headers': "Content-Type"
            },
            body: JSON.stringify({"sportId":1,"competitionGroupId":0,"competitionId":0,"type":0,"minOdds":null,"maxOdds":null})
          
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
          //   var d = new Date();
          //   var month = d.getMonth()+1;
          //   var day = d.getDay();
          //   var hour = d.getHours();
          //   var min = d.getMinutes();
            var reqDatas = response.body;
            this.updateDom(reqDatas); 

          });            
    }

    updateDom = (reqDatas) =>{
        var events = reqDatas.data.events;
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
                        <Table.Row>
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
                        <Table.Row>
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

    };


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
export default FreshEvents;



