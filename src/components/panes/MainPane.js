import React from 'react';
import {  Menu, Tab, Header } from 'semantic-ui-react';
import CheckMondayEvents from '../../apis/CheckMondayEvents';
import CheckThursdayEvents from '../../apis/CheckThursdayEvents';
import FreshEvents from '../../apis/FreshEvents';
import PredictMondayEvents from '../../apis/PredictMondayEvents';
import PredictThursdayEvents from '../../apis/PredictThursdayEvents';

const panes = [
  {
    menuItem: { key: 'monday', icon: 'user', content: 'Előrejelzések' },
    render: () => <Tab.Pane>
      <Header as='h1'>Hétfői AI Tippek</Header>
      <PredictMondayEvents />
      <Header as='h1'>Csütörtöki AI Tippek</Header>
      <PredictThursdayEvents />

    </Tab.Pane>,
  },
  {
    menuItem: { key: 'monday', icon: 'user', content: 'Hétfő-Kedd alap' },
    render: () => <Tab.Pane><CheckMondayEvents/></Tab.Pane>,
  },
  {
    menuItem: { key: 'thursday', icon: 'user', content: 'Csütörtök-Péntek alap' },
    render: () => <Tab.Pane><CheckThursdayEvents/></Tab.Pane>,
  },
  {
    menuItem: (
      <Menu.Item key='fresh'>
        Friss adatok
      </Menu.Item>
    ),
    render: () => <Tab.Pane><FreshEvents/></Tab.Pane>,
  },
]

const MainPane = () => <Tab panes={panes} />

export default MainPane