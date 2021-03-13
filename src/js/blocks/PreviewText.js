import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class PreviewText extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    }
  }

  render() {
    return (
      <div className="country__text--wrapper">
        <div className="country__text--content">
          <div className="country-name__list--wrapper">
            <ul className="country-name__list">
              {this.props.countryData.map((item, index) => (
                <li className="country-name__item" key={index}>
                  <h1 className="country__title">{item.country}</h1>
                </li>
              ))}
            </ul>
          </div>
          <div className="country-about__list--wrapper">
            <ul className="country-about__list">
              {this.props.countryData.map((item, index) => (
                <li className="country-about__item" key={index}>
                  <p className="country-about__text">{item.about}</p>
                </li>
              ))}
            </ul>
          </div>
          <Link to={`/country-${this.props.currPreCountry}`} className="precountry__link">
            <span className="precountry__link--lang">Открыть</span>
            <span className="link__symbal"> &rArr;</span>
          </Link>
        </div>
      </div>
    )
  }
}
/*
        this.setState({
          disabled: false
        });

*/