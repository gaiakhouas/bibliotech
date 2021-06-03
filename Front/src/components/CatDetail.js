import React, { useState } from 'react';
import { Link } from '@reach/router';
import { stringToUrl } from '../utils/string-to-url';
import { timeToRead } from '../utils/time-to-read';
import { firstCapitalLetter } from '../utils/first-capital-letter';
import {
  Title,
  Box,
  IconContainer,
  Time,
  ModalContainer,
  ModalContent,
  FixContainer,
  ModalButton,
  Wrapper
} from '../styles/index';
import { FiTrash2, FiEdit2, FiMoreVertical, FiX } from 'react-icons/fi';
import Modal from './Modal';

const CatDetail = ({ libelle, _id, onDelete }) => {
  const [showPortal, setShowPortal] = useState(false);
  const time = timeToRead(libelle);

  return (
    <Box>
      <div>
        <Link to={`../editCat/${stringToUrl(libelle)}`} state={{ id: _id }}>
          <Title margin>{firstCapitalLetter(libelle)}</Title>
        </Link>
        <Time>{time ? time : 1} min</Time>
      </div>
      <IconContainer>
        {showPortal && (
          <Modal>
            <ModalContainer onClick={() => setShowPortal(false)}>
              <ModalContent>
                <FixContainer>
                  <FiX onClick={() => setShowPortal(false)} />
                </FixContainer>
                <Wrapper>
                  <ModalButton black>
                    <Link
                      to={`../editCat/${stringToUrl(libelle)}`}
                      state={{ id: _id }}
                    >
                      <FiEdit2 style={{ color: 'white' }} />
                      <span style={{ marginLeft: '3px', color: 'white' }}>
                        Editer votre catégorie
                      </span>
                    </Link>
                  </ModalButton>
                  <ModalButton onClick={() => onDelete(_id)}>
                    <FiTrash2 />
                    <span style={{ marginLeft: '3px' }}>Supprimer votre catégorie</span>
                  </ModalButton>
                </Wrapper>
              </ModalContent>
            </ModalContainer>
          </Modal>
        )}
        {!showPortal && <FiMoreVertical onClick={() => setShowPortal(true)} />}
      </IconContainer>
    </Box>
  );
};
export default CatDetail;
