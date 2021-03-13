import React, { Component } from 'react';
import appData from '../data/appData';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import updateMainBgn from '../logic/updateMainBg';
import PreviewText from '../blocks/PreviewText';


export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: appData[1][0],
      lang: 'rus',
      curLang: 'рус',
      countryList: [],
      posX: 0,
      itemSize: 0,
      moveCount: 0,
      namePosY: 0,
      aboutPosY: 0,
      disabled: true,
      currPreCountry: 'spain',
    }

    this.countryItemChange = this.countryItemChange.bind(this);
  }

  countryItemChange(event) {
    const marginRight = 15;
    const currCountryList = document.querySelector('.country__list');
    const countryNameList = document.querySelector('.country-name__list');
    const countryAboutList = document.querySelector('.country-about__list');
    const countryNameHeight = document.querySelector('.country-name__item').offsetHeight;
    const countryAboutHeight = document.querySelector('.country-about__item').offsetHeight;
    const currItem = document.querySelector('.country__item--current');
    const btnLeft = document.querySelector('.btn__left');
    const btnRight = document.querySelector('.btn__right');
    console.log(btnRight.disabled)
    this.state.itemSize = currItem.offsetWidth + marginRight;
    if (event.target.closest('.btn__left') && this.state.posX < this.state.countryList.length - 1) {
      if (btnRight.disabled) {
        this.setState({
          disabled: false
        })
        btnRight.removeAttribute('disabled');
      } 
      this.state.countryList[this.state.posX].classList.remove('country__item--opacity-off');
      this.state.countryList[this.state.posX].classList.remove('country__item--current-on');
      this.state.countryList[this.state.posX].classList.add('country__item--current-off');
      this.state.countryList[this.state.posX].classList.add('country__item--opacity');
      this.state.posX++;
      this.state.moveCount -=this.state.itemSize;
      this.state.namePosY -=countryNameHeight;
      this.state.aboutPosY -=countryAboutHeight;
      this.state.countryList[this.state.posX].classList.remove('country__item--current-off');
      this.state.countryList[this.state.posX].classList.add('country__item--current-on');
    };

    if (event.target.closest('.btn__right') && this.state.posX > 0) {
      if (btnLeft.disabled) {
        this.setState({
          disabled: false
        });
        btnLeft.removeAttribute('disabled');
      } 
      this.state.countryList[this.state.posX].classList.remove('country__item--current-on');
      this.state.countryList[this.state.posX].classList.add('country__item--current-off');
      this.state.posX--;
      this.state.countryList[this.state.posX].classList.remove('country__item--current-off');
      this.state.countryList[this.state.posX].classList.add('country__item--opacity-off');
      this.state.countryList[this.state.posX].classList.add('country__item--current-on');
      this.state.moveCount +=this.state.itemSize;
      this.state.namePosY +=countryNameHeight;
      this.state.aboutPosY +=countryAboutHeight;
    };
    if (this.state.posX === this.state.countryList.length - 1) {
      btnLeft.setAttribute('disabled', this.state.disabled)
    }

    if (this.state.posX === 0) {
      btnRight.setAttribute('disabled', this.state.disabled)
    }
    updateMainBgn(this.state.posX, this.state.countryData);
    setTimeout(() => {
      currItem.classList.remove('country__item--current');
      this.state.countryList[this.state.posX].classList.add('country__item--current');
      const newCurrCountryItem = document.querySelector('.country__item--current');
      const newCurrCountry = newCurrCountryItem.querySelector('.country__name');
      this.state.countryData.forEach(item => {
        if (item.country.includes(newCurrCountry.textContent)) {
          this.setState({
            currPreCountry: item.pathName,
          })
        }
      })
    }, 200);
    currCountryList.style.transform = `translateX(${this.state.moveCount}px)`;
    countryNameList.style.transform = `translateY(${this.state.namePosY}px)`;
    countryAboutList.style.transform = `translateY(${this.state.aboutPosY}px)`
  }

  componentDidMount() {
    //const langValueArr = 0;
    const countryArr = 1;
    const stateCountryList = document.querySelectorAll('.country__item');
    stateCountryList[0].classList.add('country__item--current');
    const stateLang = document.getElementsByTagName('html')[0].getAttribute('lang');
    this.setState({
      countryList: stateCountryList,
      lang: stateLang,
    });
    const langIndex = appData[0].indexOf(this.state.lang);
    this.setState({
      countryData: appData[countryArr][langIndex],
    })
  }

  render() {
    return (
      <div className="main-page__content">
        <div className="next-bg main-page--bg" style={{backgroundImage: `url('${this.state.countryData[1].bgImage}')`}}></div>
        <div className="current-bg main-page--bg" style={{backgroundImage: `url('${this.state.countryData[0].bgImage}')`}}></div>
        <div className="main-page--bg-linear"></div>
        <div className="main-page__preview">
          <div className="preview__wrapper">
            <PreviewText countryData={this.state.countryData} currPreCountry={this.state.currPreCountry}/>
            <div className="country__list--wrapper">
              <div className="country__list--content">
                <ul className="country__list">
                  {this.state.countryData.map((item, index) => (
                    <li className="country__item" key={index}>
                      <Link className="country__link" to={`/country-${item.pathName}`}>
                        <p className="country__info">
                          <span className="country__name">{item.country}</span>
                          <span className="country__capital">
                            {item.capital}
                          </span>
                        </p>
                        <div className="country__image" style={{backgroundImage: `url('${item.previewImage}')`}}></div>
                      </Link>
                  </li>
                  ))}
                </ul>
              </div>
              <div className="preview-list__btn--wrapper">
                <button type="button" className="preview-list__btn preview-list__btn--left btn__left" onClick={this.countryItemChange}>Left</button>
                <button type="button" className="preview-list__btn preview-list__btn--right btn__right" onClick={this.countryItemChange} disabled={this.state.disabled}>Right</button>
                <p className="curr-lang curr-lang--lang">{this.state.lang}</p>
              </div>
            </div> 
          </div>
        </div>
      </div>
    )
  }
}
