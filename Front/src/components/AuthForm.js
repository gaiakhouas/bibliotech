import React, { useState } from 'react';
import {
  Input,
  Form,
  Label,
  Button,
  Title,
  Text,
  ErrorMessage
} from '../styles/index';

const AuthForm = ({ title, subtitle, onSubmit, errorMessage }) => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <Form>
      <Title>{title}</Title>
      <Text>{subtitle}</Text>
      <div>
      <Label>Prénom</Label>
      <Input
          type="text"
          placeholder="Ajouter un prénom"
          value={firstname}
          onChange={event => setFirstname(event.target.value)}
          name="firstname"
        />
      <Label>Nom</Label>
      <Input
          type="text"
          placeholder="Ajouter un nom de famille"
          value={lastname}
          onChange={event => setLastname(event.target.value)}
          name="lastname"
        />
        <Label>Pseudo</Label>
        <Input
          type="text"
          placeholder="Ajouter un pseudo"
          value={pseudo}
          onChange={event => setPseudo(event.target.value)}
          name="pseudo"
        />
        <Label>Adresse email</Label>
        <Input
          type="text"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          name="email"
        />
        <Label>Mot de passe</Label>
        <Input
          type="password"
          placeholder="Ajouter un mot de passe"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          name="password"
        />
        <Button onClick={() => onSubmit({ firstname, lastname, pseudo, email, password })}>
          {title}
        </Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    </Form>
  );
};

export default AuthForm;
