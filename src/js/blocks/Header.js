import React, { Component } from 'react';
import mainLogo from '../../assets/images/icons/app-icon-white.png';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import updateLang from '../logic/updateLang';
import langApp from '../data/langApp';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      
    }

    this.changeLang = this.changeLang.bind(this);

  }

  changeLang() {
    const selectedLang = document.querySelector('.select__lang').value;
    updateLang(selectedLang, langApp)
    console.log(selectedLang)
  }

  render() {
    return (
      <header className="header__wrapper">
        <div className="header__content">
          <Link to="/" className="main-page__link--wrapper">
            <img className="main-page__image" src={mainLogo} alt="main-logo" />
            <span className="main-page__text main-page__text--lang">Трэвал апп</span>
          </Link>
          <input className="find__input" type="text" placeholder="write country" />
          <select className="select__lang" onChange={this.changeLang}>
            <option className="change-lang--lang">Выберите язык</option>
            <option className="lang__item" value="rus">Русский</option>
            <option className="lang__item" value="eng">English</option>
            <option className="lang__item" value="es">Espanol</option>
          </select>
        </div>
      </header>
    )
  }
}
