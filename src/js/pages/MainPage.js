import React, { Component } from "react";
import appData from "../data/appData";
import { BrowserRouter as Router, Link } from "react-router-dom";
import updateMainBgn from "../logic/updateMainBg";
import PreviewText from "../blocks/PreviewText";
import PreviewLine from "../blocks/PreviewLine";
import {getData} from "./service";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: [],//appData[1][0],
      lang: "rus",
      curLang: "рус",
      countryList: [],
      posX: 0,
      itemSize: 0,
      moveCount: 0,
      namePosY: 0,
      aboutPosY: 0,
      countPosY: 0,
      disabled: true,
      currPreCountry: "spain",
      // nextBackground: appData[1][0][1].bgImage,
      // currentBackground: appData[1][0][0].bgImage,
      loading: true,
    };

    this.countryItemChange = this.countryItemChange.bind(this);
  }

  countryItemChange(event) {
    const marginRight = 15;
    const currCountryList = document.querySelector(".country__list");
    const countryNameList = document.querySelector(".country-name__list");
    const countryAboutList = document.querySelector(".country-about__list");
    const countList = document.querySelector(".count__list");
    const currCount = document.querySelector(".curr-count");
    const countArray = document.querySelectorAll(".preview-count__item");
    const countryNameHeight = document.querySelector(".country-name__item")
        .offsetHeight;
    const countryAboutHeight = document.querySelector(".country-about__item")
        .offsetHeight;
    const countHeight = document.querySelector(".count__item").offsetHeight;
    const currItem = document.querySelector(".country__item--current");
    const btnLeft = document.querySelector(".btn__left");
    const btnRight = document.querySelector(".btn__right");
    currCount.classList.remove("curr-count");
    this.state.itemSize = currItem.offsetWidth + marginRight;
    if (
        event.target.closest(".btn__left") &&
        this.state.posX < this.state.countryList.length - 1
    ) {
      if (btnRight.disabled) {
        this.setState({
          disabled: false,
        });
        btnRight.removeAttribute("disabled");
      }
      this.state.countryList[this.state.posX].classList.remove(
          "country__item--opacity-off"
      );
      this.state.countryList[this.state.posX].classList.remove(
          "country__item--current-on"
      );
      this.state.countryList[this.state.posX].classList.add(
          "country__item--current-off"
      );
      this.state.countryList[this.state.posX].classList.add(
          "country__item--opacity"
      );
      this.state.posX++;
      this.state.moveCount -= this.state.itemSize;
      this.state.namePosY -= countryNameHeight;
      this.state.aboutPosY -= countryAboutHeight;
      this.state.countPosY -= countHeight;
      this.state.countryList[this.state.posX].classList.remove(
          "country__item--current-off"
      );
      this.state.countryList[this.state.posX].classList.add(
          "country__item--current-on"
      );
    }

    if (event.target.closest(".btn__right") && this.state.posX > 0) {
      if (btnLeft.disabled) {
        this.setState({
          disabled: false,
        });
        btnLeft.removeAttribute("disabled");
      }
      this.state.countryList[this.state.posX].classList.remove(
          "country__item--current-on"
      );
      this.state.countryList[this.state.posX].classList.add(
          "country__item--current-off"
      );
      this.state.posX--;
      this.state.countryList[this.state.posX].classList.remove(
          "country__item--current-off"
      );
      this.state.countryList[this.state.posX].classList.add(
          "country__item--opacity-off"
      );
      this.state.countryList[this.state.posX].classList.add(
          "country__item--current-on"
      );
      this.state.moveCount += this.state.itemSize;
      this.state.namePosY += countryNameHeight;
      this.state.aboutPosY += countryAboutHeight;
      this.state.countPosY += countHeight;
    }
    if (this.state.posX === this.state.countryList.length - 1) {
      btnLeft.setAttribute("disabled", this.state.disabled);
    }

    if (this.state.posX === 0) {
      btnRight.setAttribute("disabled", this.state.disabled);
    }
    updateMainBgn(this.state.posX, this.state.countryData);
    countArray[this.state.posX].classList.add("curr-count");
    setTimeout(() => {
      currItem.classList.remove("country__item--current");
      this.state.countryList[this.state.posX].classList.add(
          "country__item--current"
      );
      const newCurrCountryItem = document.querySelector(
          ".country__item--current"
      );
      const newCurrCountry = newCurrCountryItem.querySelector(".country__name");
      this.state.countryData.forEach((item) => {
        if (item.country.includes(newCurrCountry.textContent)) {
          this.setState({
            currPreCountry: item.pathName,
          });
        }
      });
    }, 200);
    currCountryList.style.transform = `translateX(${this.state.moveCount}px)`;
    countryNameList.style.transform = `translateY(${this.state.namePosY}px)`;
    countryAboutList.style.transform = `translateY(${this.state.aboutPosY}px)`;
    countList.style.transform = `translateY(${this.state.countPosY}px)`;
  }

  // async componentWillMount() {console.log('componentWillMount')
  //   await getData(this.state.lang)
  //       .then(response => response)
  //       .then(data => {
  //         this.setState({
  //           loading: false,
  //           nextBackground: data[1].bgImage,
  //           currentBackground: data[0].bgImage,
  //           countryData: data,
  //         })
  //       })
  // }

  async componentDidMount() {
    const countryArr = 1;
    const stateCountryList = document.querySelectorAll(".country__item");
    stateCountryList[0]?.classList.add("country__item--current");
    const stateLang = document
        .getElementsByTagName("html")[0]
        .getAttribute("lang");
    // this.setState({
    //   countryList: stateCountryList,
    //   lang: stateLang,
    // });
    this.state.countryList = stateCountryList;
    this.state.lang = stateLang;
    const langIndex = appData[0].indexOf(this.state.lang);
    // this.setState({
    //   countryData: appData[countryArr][langIndex],
    // })
    // this.state.countryData = appData[countryArr][langIndex];
    // // const currentBackground = appData[0].bgImage;
    // // const nextBackground = appData[1].bgImage;
    //
    // this.setState({
    //   countryList: stateCountryList,
    //   lang: stateLang,
    //   countryData: appData[countryArr][langIndex],
    //   // currentBackground: currentBackground,
    //   // nextBackground: nextBackground,
    // });
    await getData(this.state.lang)
        .then(response => response)
        .then(data => {
          this.setState({
            loading: false,
            countryList: stateCountryList,
            lang: stateLang,
            nextBackground: data[1].bgImage,
            currentBackground: data[0].bgImage,
            countryData: data,
          })
        })
  }
  async componentDidUpdate(prevProps, prevState) {
    const stateCountryList = document.querySelectorAll(".country__item");
    stateCountryList[0]?.classList.add("country__item--current");
    this.state.countryList = stateCountryList;
    // this.state.lang = stateLang;
    const countryArr = 1;
    const langIndex = appData[0].indexOf(this.state.lang);
    // const data = appData[countryArr][langIndex];
    let data = await getData(this.state.lang)
        .then(response => response)
        .then(data => data)
    const updatedData = data.filter((country) =>
        country.country.toLowerCase().includes(this.props.search.toLowerCase())
    );
    let currentBackground = this.state.currentBackground;
    if (updatedData[0] !== undefined) {
      currentBackground = updatedData[0].bgImage;
    }
    let nextBackground = this.state.nextBackground;
    if (updatedData[1] !== undefined) {
      currentBackground = updatedData[1].bgImage;
    }

    if (prevProps.search !== this.props.search) {
      this.setState({
        countryData: updatedData,
        currentBackground: currentBackground,
        nextBackground: nextBackground,
      });
    }
  }

  render() {
    return this.state.loading ? <div>Загрузка</div> :
        (
            <div className="main-page__content">
              <div
                  className="next-bg main-page--bg"
                  style={{
                    backgroundImage: `url('${this.state.nextBackground}')`,
                  }}
              ></div>
              <div
                  className="current-bg main-page--bg"
                  style={{
                    backgroundImage: `url('${this.state.currentBackground}')`,
                  }}
              ></div>
              <div className="main-page--bg-linear"></div>
              <div className="main-page__preview">
                <PreviewLine countryData={this.state.countryData} />
                <div className="preview__wrapper">
                  <PreviewText
                      countryData={this.state.countryData}
                      currPreCountry={this.state.currPreCountry}
                  />
                  <div className="country__list--wrapper">
                    <div className="country__list--content">
                      <ul className="country__list">
                        {this.state.countryData.map((item, index) => (
                            <li className="country__item" key={index}>
                              <Link
                                  className="country__link"
                                  to={`/country-${item.pathName}`}
                              >
                                <p className="country__info">
                                  <span className="country__name">{item.country}</span>
                                  <span className="country__capital">
                            {item.capital}
                          </span>
                                </p>
                                <div
                                    className="country__image"
                                    style={{
                                      backgroundImage: `url('${item.previewImage}')`,
                                    }}
                                ></div>
                              </Link>
                            </li>
                        ))}
                      </ul>
                    </div>
                    <div className="preview-list__btn--wrapper">
                      <button
                          type="button"
                          className="preview-list__btn preview-list__btn--left btn__left"
                          onClick={this.countryItemChange}
                      >
                        Left
                      </button>
                      <button
                          type="button"
                          className="preview-list__btn preview-list__btn--right btn__right"
                          onClick={this.countryItemChange}
                          disabled={this.state.disabled}
                      >
                        Right
                      </button>
                      <p className="curr-lang curr-lang--lang">
                        {this.state.curLang}
                      </p>
                      <p className={`curr-lang__flag flag__${this.state.lang}`}></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
  }
}
