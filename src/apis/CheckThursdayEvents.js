import React, { Component } from 'react'
import { Table, Dimmer, Loader, Message } from 'semantic-ui-react'
import axios from 'axios';

class CheckThursdayEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Datas:{},
            events_selected:[],
            success: true,
            loading: 1,
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

    getThursdayData = async ()=>{
        const GETTHURSDAY_URL = "https://tippmix-backend.herokuapp.com/api/getnewthursdaydata";
        //const GETTHURSDAY_URL = "http://localhost:5000/api/getthursdaydata";
        var options = {
            method: 'GET',
            url: GETTHURSDAY_URL,
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
           const res = await this.getThursdayData()
           if (!res) return "Nincs adat!"; 
            var events = res.data;
            var eventSelected = [];
            var hazai = 0;
            var dontetlen = 0;
            var vendeg = 0;
            var score1 = "nincs";
            var score2 = "nincs";
            var matchStatus = "nincs";
            var rowColor = "";

            for ( let id  in events){
                var competitionName = events[id].competitionName;
                var eventDate = events[id].eventDate;
                var eventName = events[id].eventName;
                var eventId = events[id].eventId;
                var bettingStatus = events[id].bettingStatus;
                hazai = events[id].oddsHazai;
                dontetlen = events[id].oddsDontetlen;
                vendeg = events[id].oddsVendeg;
                var marketRealNo = events[id].marketRealNo;
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
                    if (matchStatus === "ended"){
                        rowColor = "negative";
                    } else {
                        rowColor = "";
                    }

                    eventSelected.push(
                        <Table.Row key={marketRealNo} content={rowColor}>
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
                                
                } catch (error) {
                    this.setState({
                        success: 0, 
                        loading: 0,
                        error: {
                            switch:0,
                            message: error.message
                        }
                    });
                                console.log('Hiba az eredm??ny lek??r??s??ben');
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
                <Table unstackable color = {'blue'} inverted striped size='small' celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ev.id</Table.HeaderCell>
                            <Table.HeaderCell>Verseny neve</Table.HeaderCell>
                            <Table.HeaderCell>M??rk??z??s</Table.HeaderCell>
                            <Table.HeaderCell>M??rk??z??s sz??ma</Table.HeaderCell>
                            <Table.HeaderCell>D??tum</Table.HeaderCell>
                            <Table.HeaderCell>St??tusz</Table.HeaderCell>
                            <Table.HeaderCell>Hazai</Table.HeaderCell>
                            <Table.HeaderCell>D??ntetlen</Table.HeaderCell>
                            <Table.HeaderCell>Vend??g</Table.HeaderCell>
                            <Table.HeaderCell>Eredm??ny</Table.HeaderCell>
                            <Table.HeaderCell>matchStatus</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.events_selected}                     
                    </Table.Body>
                </Table> 
                {this.state.loading?(<Dimmer active inverted><Loader inverted>T??lt??m az adatokat</Loader></Dimmer>):''}                     
                {this.state.error.switch?"":(
                <Message negative>
                    <Message.Header>
                        Hiba a let??lt??sben, k??rlek pr??b??ld k??s??bb
                    </Message.Header>
                    <p>{this.state.error.message}</p>
                </Message>)}
                {this.state.success?'':'Nincs sz??munkra megfelel?? meccs :-)'}                     

            </div>
        )

    }

}
export default CheckThursdayEvents;



