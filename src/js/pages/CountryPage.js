import React, { Component } from 'react'

export default class CountryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        <p className="country__name">Country Page - {this.props.countryName} - {window.location.pathname} - {window.location.hashname}</p>
      </div>
    )
  }
}
