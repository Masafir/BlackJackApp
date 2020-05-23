import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './game';
import styled from 'styled-components';

const Container = styled.div`
  height: 90vh;
  width: 100%;
`;

function App() {
  return (
    <Container className="App">
      <Game />
    </Container>
  );
}

export default App;
