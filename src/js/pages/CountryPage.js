// import React, { Component } from "react";
// import Weather from "../blocks/weather";
// import Time from "../blocks/time-widget";
// import Maps from "../blocks/maps";
// import Exchange from "../blocks/exchange";
// import Video from "../blocks/video";
// import ImageGallery from "../blocks/image-galery";
// import appData from "../data/appData";
// export default class CountryPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       countryData: appData[1][0],
//       lang: "rus",
//       curLang: "рус",
//       currentData: null,
//     };
//   }

//   copySorted(arr) {
//     let data = arr
//       .concat()
//       .filter(
//         (country) => country.pathName === this.props.match.params.countryName
//       );
//     //console.log(this.state.currentData);
//     return data;
//   }
//   componentDidMount() {
//     const countryArr = 1;
//     const stateLang = document
//       .getElementsByTagName("html")[0]
//       .getAttribute("lang");
//     const langIndex = appData[0].indexOf(this.state.lang);
//     this.setState({
//       lang: stateLang,
//       countryData: appData[countryArr][langIndex],
//     });
//   }
//   render() {
//     //console.log(this.props.match.params.countryName);
//     //console.log(this.state.countryData);

//     let data = this.copySorted(this.state.countryData)[0];
//     console.log(data);

//     return (
//       <section className="countryPage">
//         <p className="countryPage__name">
//           Country Page - {this.props.match.params.countryName} -{" "}
//           {/* {window.location.pathname} - {window.location.hashname} */}
//         </p>

//         <div class="countryPage__main">
//           <h1>{data.country}</h1>
//           <p>{data.capital}</p>
//           <h2>{data.about}</h2>
//           <h2>Gallery</h2>
//           <ImageGallery />
//           <h2>Location</h2>
//           <Maps></Maps>
//           <h2>Video</h2>
//           <Video />
//         </div>

//         <div class="countryPage__aside">
//           <h3 className="countryPage__aside-title">Time</h3>
//           <Time />
//           <h3 className="countryPage__aside-title">Weather</h3>
//           <Weather lang={this.state.lang} capital={data.capitalName} />
//           <h3 className="countryPage__aside-title">Exchange</h3>
//           <Exchange />
//         </div>
//       </section>
//     );
//   }
// }

import React, { useState, useEffect } from "react";
import Weather from "../blocks/weather";
import Time from "../blocks/time-widget";
import Maps from "../blocks/maps";
import Exchange from "../blocks/exchange";
import Video from "../blocks/video";
import ImageGallery from "../blocks/image-galery";
import appData from "../data/appData";
export default (props) => {
  const [countryData, setCountryData] = useState(appData[1][0]);
  const [lang, setLang] = useState("rus");
  const [curLang, setCurLang] = useState("рус");
  const [currentData, setCurrentData] = useState(null);

  const copySorted = (arr) => {
    let data = arr
      .concat()
      .filter((country) => country.pathName === props.match.params.countryName);
    return data;
  };
  useEffect(() => {
    const countryArr = 1;
    const stateLang = document
      .getElementsByTagName("html")[0]
      .getAttribute("lang");
    const langIndex = appData[0].indexOf(lang);
    setLang(stateLang);
    setCountryData(appData[countryArr][langIndex]);
  }, []);

  //console.log(this.props.match.params.countryName);
  //console.log(this.state.countryData);

  let data = copySorted(countryData)[0];
  console.log(data);

  return (
    <section className="countryPage">
      <div
        className="current-bg main-page--bg"
        style={{ backgroundImage: `url('${data.bgImage}')` }}
      ></div>
      <p className="countryPage__name">
        Country Page - {props.match.params.countryName} -{" "}
        {/* {window.location.pathname} - {window.location.hashname} */}
      </p>

      <div class="countryPage__main">
        <h1>{data.country}</h1>
        <p>{data.capital}</p>
        <h2>{data.about}</h2>
        <h2>Gallery</h2>
        <ImageGallery />
        <h2>Location</h2>
        <Maps></Maps>
        <h2>Video</h2>
        <Video />
      </div>

      <div class="countryPage__aside">
        <h3 className="countryPage__aside-title">Time</h3>
        <Time utc={data.utc} />
        <h3 className="countryPage__aside-title">Weather</h3>
        <Weather lang={lang} capital={data.capitalName} />
        <h3 className="countryPage__aside-title">Exchange</h3>
        <Exchange currency={data.currency} />
      </div>
    </section>
  );
};
{
  /* import React, { Component } from 'react';
import appData from '../data/appData';

export default class CountryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currCountries: '',
      countryInfo: '',
      //lang: '',
      aboutFullInfo: []
    }
  }

  componentDidMount() {
    const countryArr = 1;
    const stateLang = document.getElementsByTagName('html')[0].getAttribute('lang');
    //this.state.lang = stateLang;
    const langIndex = appData[0].indexOf(stateLang);
    this.state.currCountries = appData[countryArr][langIndex];
    this.state.currCountries.forEach(item => {
      if (item.pathName === this.props.countryName) this.state.countryInfo = item;
    })
    this.setState({
      countryInfo: this.state.countryInfo,
      aboutFullInfo: this.state.countryInfo.aboutFull,
    })
    console.log(this.state.countryInfo.aboutFull)
  }

  render() {
    const countryInfo = this.state.countryInfo;
    return (
      <div className="country-page__wrapper">
        <p>Country: {countryInfo.country}</p>
        <p>{countryInfo.capital}</p>
        <div>
          {this.state.aboutFullInfo.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <p>web: {countryInfo.web}</p>w

       */
}
