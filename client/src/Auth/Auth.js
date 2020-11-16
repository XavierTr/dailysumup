import React from "react";

import { Form, FormInput, FormGroup, Button } from "shards-react";
import { centeredForm } from './AuthStyle';

export default function Auth() {
    return (
      <Form style={centeredForm}>
        <FormGroup>
          <label htmlFor="#username">Nom d'utilisateur ou Email</label>
          <FormInput id="#username" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="#password">Mot de passe</label>
          <FormInput type="password" id="#password" />
        </FormGroup>
        <Button>Connexion</Button>
      </Form>
    );
  }