import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import { Container } from './styles/index';

const AccountScreen = lazy(() => import('./screens/AccountScreen'));
const IndexScreen = lazy(() => import('./screens/IndexScreen'));
const CreateScreen = lazy(() => import('./screens/CreateScreen'));
const CreateCatScreen = lazy(() => import('./screens/CreateCatScreen'));
const CreateKindScreen = lazy(() => import('./screens/CreateKindScreen'));
const CategoriesScreen = lazy(() => import('./screens/CategoriesScreen'));
const KindsScreen = lazy(() => import('./screens/KindsScreen'));
const DetailScreen = lazy(() => import('./screens/DetailScreen'));
const EditScreen = lazy(() => import('./screens/EditScreen'));
const EditCatScreen = lazy(() => import('./screens/EditCatScreen'));
const EditKindScreen = lazy(() => import('./screens/EditKindScreen'));
const Header = lazy(() => import('./components/Header'));

const AuthenticatedApp = () => {
  return (
    <Suspense fallback={null}>
      <Header />
      <Container>
        <Router>
          <IndexScreen path="/" />
          <DetailScreen path="/:id" />
          <CreateScreen path="create" />
          <CreateCatScreen path="createCat" />
          <CreateKindScreen path="createKind" />
          <EditScreen path="/edit/:id" />
          <EditCatScreen path="/editCat/:id" />
          <EditKindScreen path="/editKind/:id" />
          <AccountScreen path="account" />
          <CategoriesScreen path="/cats" />
          <KindsScreen path="/kinds" />
        </Router>
      </Container>
    </Suspense>
  );
};
export default AuthenticatedApp;
