import React, { Component } from 'react'

export default class PreviewLine extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const previewLine = document.querySelectorAll('.preview-count__item');
    previewLine[0].classList.add('curr-count')
  }

  render() {
    let countryTotal = this.props.countryData.length
    if (countryTotal < 10) countryTotal = `0${countryTotal}`;
    return (
      <div className="preview__line--wrapper">
        <ul className="preview-count__list">
          {this.props.countryData.map((item, index) => (
            <li className="preview-count__item" key={index}></li>
          ))}

        </ul>
        <div className="country__count--wrapper">
          <div className="country__count--list">
            <ul className="count__list">
              {this.props.countryData.map((item, index) => (
                <li className="count__item" key={index}>{
                  this.props.countryData.indexOf(item) + 1 < 10 ? `0${this.props.countryData.indexOf(item) + 1}` : this.props.countryData.indexOf(item)
                  }
                </li>
            ))}
            </ul>
          </div>
          <div className="country__count--total">
          &nbsp;/&nbsp;{countryTotal}
          </div>
        </div>
      </div>
    )
  }
}
