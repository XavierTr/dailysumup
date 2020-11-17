import React, { useState } from "react";
import validator from 'validator';
import { Form, FormInput, FormGroup, Button, Alert } from "shards-react";
import Cookies from 'js-cookie';

import { centeredForm } from './AuthStyle';

import {serverAPI, storeToken, removeToken} from '../APIs';

export default function Auth() {

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [authError, setAuthError] = useState();

    const validateInput = () => {
    
      let valid = true;
      if(!validator.isEmpty(identifier) === false) {
        valid = false;
        setInvalidEmail(true);
      }
      if(!validator.isEmpty(password) === false) {
        valid = false;
        setInvalidPassword(true);
      } 
      return valid;
    }

    const submit = () => {
      if(validateInput()) {
        setAuthError(null);
        removeToken();
        serverAPI.post('/api/auth/', { email: identifier, password: password })
        .then(rep => {
          storeToken(rep.data.token);
        })
        .catch(err => {
          setAuthError("Impossible de se connecter. Merci de vérifier les identifiants ainsi que votre accès internet.")
        })
      }
    }

    return (
      <React.Fragment>


        {authError ? 
          <Alert theme="danger"> {authError} </Alert> : null
        }

        <Form style={centeredForm}>
          <FormGroup>

            <label htmlFor="#username" >Email</label>
            <FormInput
              invalid={invalidEmail}
              value={identifier} 
              onChange={(e) => { setIdentifier(e.target.value); setInvalidEmail(false); }}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="#password">Mot de passe</label>
            <FormInput 
              type="password" 
              invalid={invalidPassword}
              value={password}
              onChange={(e) => {setPassword(e.target.value); setInvalidPassword(false); }}
            />
          </FormGroup>
          <Button onClick={submit}>Connexion</Button>
          
        </Form>

      </React.Fragment>
      
    );
  }