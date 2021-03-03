import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/app';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
ReactDOM.render(
    <>
      <GlobalStyle/>
      <App />
    </>
    ,
  document.getElementById('root')
);
