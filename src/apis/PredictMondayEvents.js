import React, { Component } from 'react'
import { Table, Dimmer, Loader, Message, Progress } from 'semantic-ui-react'
import axios from 'axios';

class PredictMondayEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Datas:{},
            success: true,
            loading: 1,
            progTotal:0,
            progValue:0,
            events_selected:[],
            error: {
                switch: 1,
                message:''
            }
        };
    }


    getMondayData = async ()=>{
        const GETMONDAYDATA_URL = "https://tippmix-backend.herokuapp.com/api/getmondaypredictions";
        const options = {
            method: 'GET',
            url: GETMONDAYDATA_URL,
            header: {
                'Accept-Language': 'en-US,en;q=0.9,hu;q=0.8,de;q=0.7',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',

            }
        };
        try {
            const result = await axios(options);
                return result;
            ;
        } catch (error) {
            console.log(error);
        }
        
    }

    componentDidMount(){
        (async () => {
            const res = await this.getMondayData()
            const events = res.data;
            const eventSelected = [];
            this.setState({ progTotal: events.length });
            for ( let id  in events){
                const eventId = events[id].eventId;
                const marketRealNo = events[id].marketRealNo;
                const eventName = events[id].eventName;
                const eventDate = events[id].eventDate;
                const hazai = events[id].hazai;
                const dontetlen = events[id].dontetlen;
                const vendeg = events[id].vendeg;
                const esely = events[id].esely;
                const megfordul = events[id].megfordul;
                const winner = events[id].winner;
                this.setState({ progValue: id });
                eventSelected.push(
                    <Table.Row key={marketRealNo} >
                        <Table.Cell>{eventId}</Table.Cell>
                        <Table.Cell textAlign='center'>{marketRealNo}</Table.Cell>
                        <Table.Cell>{eventName}</Table.Cell>
                        <Table.Cell>{eventDate}</Table.Cell>                           
                        <Table.Cell textAlign='center'>{hazai}</Table.Cell>
                        <Table.Cell textAlign='center'>{dontetlen}</Table.Cell>
                        <Table.Cell textAlign='center'>{vendeg}</Table.Cell>
                        <Table.Cell textAlign='center'>{esely}</Table.Cell>
                        <Table.Cell textAlign='center'>{megfordul?"igen":"nem"}</Table.Cell>
                        <Table.Cell textAlign='center'>{winner}</Table.Cell>
                    </Table.Row>
                )

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
                events_selected : eventSelected,
                loading:0,
                success : 1
            });

        })();
        
    }

    

    render(){
        return(
            <div>
                <Progress value={this.state.progValue} total={this.state.progTotal} progress='ratio' />                   
                <Table unstackable color = {'blue'} inverted size='small' celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ev.id</Table.HeaderCell>
                            <Table.HeaderCell>Market No.</Table.HeaderCell>
                            <Table.HeaderCell>Mérkőzés</Table.HeaderCell>
                            <Table.HeaderCell>Dátum</Table.HeaderCell>
                            <Table.HeaderCell>Hazai</Table.HeaderCell>
                            <Table.HeaderCell>Döntetlen</Table.HeaderCell>
                            <Table.HeaderCell>Vendég</Table.HeaderCell>
                            <Table.HeaderCell>Esély</Table.HeaderCell>
                            <Table.HeaderCell>Megfordulás</Table.HeaderCell>
                            <Table.HeaderCell>Nyerő</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.events_selected}                     
                    </Table.Body>
                </Table> 
                {this.state.loading?(<Dimmer active inverted><Loader inverted>Töltöm az adatokat</Loader></Dimmer>):''}  
                {this.state.error.switch?"":(
                <Message negative>
                    <Message.Header>
                        Kisebb hiba a letöltésben, kérlek próbáld később, vagy szólj a Colinak
                    </Message.Header>
                    <p>{this.state.error.message}</p>
                </Message>)}
                {this.state.success?'':'Nincs számunkra megfelelő meccs :-)'}                     

            </div>
        )

    }

}
export default PredictMondayEvents;



