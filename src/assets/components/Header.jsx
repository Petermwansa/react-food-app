import React from 'react';
import logoImg from '../logo.jpg'

const Header = () => {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='rockie eats logo'/>
        <h1>Rockie Eats</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  )
}

export default Header
