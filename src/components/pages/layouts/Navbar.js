import React from 'react';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const Navbar = ()=>{
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                <Image size='small' src='/images/logos/logo2.png' style={{ marginRight: '1.5em' }} />
                Erős Algoritmus
                </Menu.Item>
                <Menu.Item as='a'>Főoldal</Menu.Item>

                <Dropdown item simple text='Listák'>
                <Dropdown.Menu>
                    <Dropdown.Item>Hétfői lista</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Keresés</Dropdown.Header>
                    <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Szűrők</span>
                    <Dropdown.Menu>
                        <Dropdown.Item>Meccs ID alapján</Dropdown.Item>
                        <Dropdown.Item>Csapatok alapján</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>Aktuális lista lekérése</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Container>
            </Menu>

    )
}

export default Navbar;