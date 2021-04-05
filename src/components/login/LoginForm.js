import { Button, Form, Grid, Header, Image, Segment, Message } from 'semantic-ui-react';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types';
import Alert from '../pages/layouts/Alert';

const LoginForm = ({setAlert}) => {
  const [formData, setFormdata] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormdata({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = async e => {
    console.log('submitted');

  }
  

  return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Alert/>
        <Header as='h1' color='teal' textAlign='center'>
          <Image src='./images/logos/logo2.png' /> Lépj be a rendszerbe!
        </Header>
        <Form size='large' onSubmit={e => onSubmit(e)}>
          <Segment stacked>
            <Form.Input 
            required 
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='E-mail cím' 
            name='email'
            value={email}
          type='text' 
            onChange={ e => onChange(e) } 
             />
            <Form.Input
              required
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Jelszó'
              name='password'
              value={password}
              type='password'
              onChange={ e => onChange(e) } 
            />
            <Message
              success
              header='Sikeres belépés'
              content="Minden rendszert használhatsz"
            />
            <Button color='teal' fluid size='large'>
              Belépés
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>

  )
}

LoginForm.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(LoginForm);