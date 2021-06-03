import React, { useState } from 'react';
import { Link } from '@reach/router';
import { Label, Form, Input, Buttons, Button } from '../styles/index';
import { FiX, FiSend } from 'react-icons/fi';

const CategoryForm = ({ onSubmit, initialValues, text, editing }) => {
  const [libelle, setlibelle] = useState(initialValues.libelle);

  return (
    <Form>
      <Label>Titre de la catégorie</Label>
      <Input
        type="text"
        placeholder="Votre titre"
        value={libelle}
        onChange={e => setlibelle(e.target.value)}
      />
      
      {libelle && (
        <Buttons>
          <Button onClick={() => onSubmit({ libelle })}>
            <FiSend />
            <span style={{ marginLeft: '3px' }}>{text}</span>
          </Button>
          {editing && (
            <Link to="/ ">
              <Button black>
                <FiX />
                <span style={{ marginLeft: '5px' }}>Annuler</span>
              </Button>
            </Link>
          )}
        </Buttons>
      )}
    </Form>
  );
};
CategoryForm.defaultProps = {
  initialValues: {
    libelle: '',
  }
};
export default CategoryForm;
