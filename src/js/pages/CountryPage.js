import React, { Component } from 'react';
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

      </div>
    )
  }
}
