import React from 'react'
import {  Menu, Tab } from 'semantic-ui-react'
import CheckMondayEvents from '../../apis/CheckMondayEvents'
import CheckThursdayEvents from '../../apis/CheckThursdayEvents'
import FreshEvents from '../../apis/FreshEvents'

const panes = [
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