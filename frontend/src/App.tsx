import React from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Pages from './components/Pages';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div className="content">
      <Header />
      <Navigation />
      <Pages />
    </div>
    <Footer />
  </BrowserRouter>
);

export default App;
