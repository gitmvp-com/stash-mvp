import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navigation } from './components/Navigation';
import { MediaLibrary } from './pages/MediaLibrary';
import { MediaDetail } from './pages/MediaDetail';
import { Tags } from './pages/Tags';
import { Stats } from './pages/Stats';

export const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Container fluid>
        <Switch>
          <Route exact path="/" component={MediaLibrary} />
          <Route path="/media/:id" component={MediaDetail} />
          <Route path="/tags" component={Tags} />
          <Route path="/stats" component={Stats} />
        </Switch>
      </Container>
    </>
  );
};