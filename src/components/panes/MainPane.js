import React from 'react'
import {  Menu, Tab } from 'semantic-ui-react'
import CheckEvents from '../../apis/CheckEvents'
import FreshEvents from '../../apis/FreshEvents'

const panes = [
  {
    menuItem: { key: 'monday', icon: 'user', content: 'Hétfői alap' },
    render: () => <Tab.Pane><CheckEvents/></Tab.Pane>,
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