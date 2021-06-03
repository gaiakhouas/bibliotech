import React from 'react';
import { Navbar, Nav, NavLink } from '../styles/index';
import { FiSettings, FiPlusCircle, FiHome } from 'react-icons/fi';

const Header = () => {
  const iconStyle = {
    marginRight: '3px'
  };

  const Link = props => (
    <NavLink
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            color: isCurrent ? 'rgb(255,28,70)' : 'rgb(50, 50, 50)'
          }
        };
      }}
    ></NavLink>
  );

  return (
    <Navbar>
      <Nav>
        <Link to="">
          <FiHome style={iconStyle} /> BiblioTech
        </Link>
        <Link to="create">
          <FiPlusCircle style={iconStyle} /> Créer livre
        </Link>
        <Link to="createCat">
          <FiPlusCircle style={iconStyle} /> Créer catégorie
        </Link>
        <Link to="createKind">
          <FiPlusCircle style={iconStyle} /> Créer genre
        </Link>
        <Link to="account">
          <FiSettings style={iconStyle} /> Mon compte
        </Link>
        <Link to="cats">
          <FiSettings style={iconStyle} /> Cats
        </Link>
        <Link to="kinds">
          <FiSettings style={iconStyle} /> Genres
        </Link>
      </Nav>
    </Navbar>
  );
};
export default Header;
