import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h1' color='teal' textAlign='center'>
        <Image src='./images/logos/logo2.png' /> Lépj be a rendszerbe!
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail cím' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Jelszó'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Belépés
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)

export default LoginForm;