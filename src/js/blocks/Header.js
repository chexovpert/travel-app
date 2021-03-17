import React, { Component } from "react";
import mainLogo from "../../assets/images/icons/app-icon-white.png";
import { BrowserRouter as Router, Link } from "react-router-dom";
import updateLang from "../logic/updateLang";
import langApp from "../data/langApp";
import flag from "../../assets/images/icons/flag-russia.png";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputPlaceholder = '';
    this.inputValue = '';
    this.changeLang = this.changeLang.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }
  searchHandler(event) {
    this.props.searchHandler(event);
  }
  changeLang() {
    const selectedLang = document.querySelector(".select__lang").value;
    updateLang(selectedLang, langApp);
    let placeholderText = '';
    const stateLang = document
      .getElementsByTagName("html")[0]
      .getAttribute("lang");
    if (stateLang === 'rus') placeholderText = 'Введите страну';
    if (stateLang === 'eng') placeholderText = 'Write country';
    if (stateLang === 'es') placeholderText = 'Ingrese su pais';
    this.setState({
      inputPlaceholder: placeholderText,
    })
  }

  clearInput() {
    const inputValue = document.querySelector('.find__input');
    inputValue.value = '';
  }

  componentDidMount() {
    this.setState({
      inputPlaceholder: 'Введите страну',
    })
  }

  render() {
    return (
      <header className="header__wrapper">
        <div className="header__content">
          <Link to="/" className="main-page__link--wrapper">
            <img className="main-page__image" src={mainLogo} alt="main-logo" />
            <span className="main-page__text main-page__text--lang">
              Трэвал апп
            </span>
          </Link>
          <label className="input-label">
            <input
              onChange={this.searchHandler.bind(this)}
              className="find__input"
              type="text"
              placeholder={`${this.state.inputPlaceholder}`}
            />
            <span className="clear__input" onClick={this.clearInput}>x</span>
          </label>
          <select className="select__lang" onChange={this.changeLang}>
            <option className="lang__item" value="rus" defaultValue="selected">
              Русский
            </option>
            <option className="lang__item" value="eng">
              English
            </option>
            <option className="lang__item" value="es">
              Espanol
            </option>
          </select>
        </div>
      </header>
    );
  }
}
