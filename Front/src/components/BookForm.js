import React, { useState, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import { Label, Form, Input, Select, TextArea, Buttons, Button } from '../styles/index';
import { FiX, FiSend } from 'react-icons/fi';
import { Context as CatContext } from '../context/CatContext';
import { Context as KindContext } from '../context/KindContext';
import ImageToSend from './ImageToSend';


const BookForm = ({ onSubmit, initialValues, text, editing }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [auteur, setAuteur] = useState(initialValues.auteur);
  const [category, setCategory] = useState(initialValues.category);
  const [genre, setGenre ]= useState(initialValues.genre);
  const [nbrPage, setNbrPage] = useState(initialValues.nbrPage);
  const [thumbnail, setThumbnail] = useState();
  const { state, fetchCategories } = useContext(CatContext);
 
  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <Form >
      <Label>Titre du livre *</Label>
      <Input
        type="text"
        placeholder="Votre titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Label>Auteur *</Label>
      <Input
        type="text"
        placeholder="Nom de l'auteur"
        value={auteur}
        onChange={e => setAuteur(e.target.value)}
      />
      <Label>Genre *</Label>
      <Select
        placeholder="Genre du livre"
        onClick={e => setGenre(e.target.value)}
      >
          <option value="">Sélectionnez un genre</option>
          {state.map(genre => (
            <option value={genre._id}>{genre.libelle} </option>
            ))}
      </Select>
      <Label>Categories *</Label>
      <Select
        placeholder="Catégorie du livre"
        onClick={e => setCategory(e.target.value)}
      >
          <option value="">Sélectionnez une catégorie</option>
          {state.map(category => (
            <option value={category._id}>{category.libelle} </option>
            ))}
      </Select>
      <Label>Description *</Label>
      <TextArea
        rows="15"
        cols="50"
        placeholder="Ajouter le contenu de votre livre"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Label>Nombre de page </Label>
      <Input
        type="number"
        placeholder="Ajouter une nombre de page"
        value={nbrPage}
        onChange={e => setNbrPage(e.target.value)}
      />
      <Label>Image</Label>
      <ImageToSend />
      {title && description && auteur && category && genre && (
        <Buttons>
          <Button onClick={() => onSubmit({ title, description, auteur, genre, thumbnail, nbrPage })}>
            <FiSend />
            <span style={{ marginLeft: '3px' }}>{text}</span>
          </Button> 
          {editing && (
            <Link to="/">
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
BookForm.defaultProps = {
  initialValues: {
    title: '',
    auteur: '',
    genre: '',
    category: '',
    nbrPage: '',
    thumbnail: '',
    description: ''
  }
};
export default BookForm;
