import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';
import HeaderComponent from "./components/header"
import SignupComponent from "./components/signup"

function App() {
  return (
    <div>
    <HeaderComponent></HeaderComponent><br/>
    <SignupComponent></SignupComponent>
    </div>
  );
}

export default App;
