import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  Link,
} from "react-router-dom";
import Header from "../blocks/Header";
import Footer from "../blocks/Footer";
import CountryPage from "./CountryPage";
import MainPage from "./MainPage";
import appData from "../data/appData";

export default class PageComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      countryArr: appData[1][0],
      countryName: "",
    };
    this.updateCountry = this.updateCountry.bind(this);
  }
  searchHandler(event) {
    this.setState({ search: event.target.value });
    console.log(this.state.search);
  }
  updateCountry(event) {
    const linkItem = event.target.closest(".country__link");
    const linkItemPreview = event.target.closest(".precountry__link");
    let currCountryName;
    if (linkItem || linkItemPreview) {
      if (linkItem) currCountryName = linkItem.querySelector(".country__name");
      if (linkItemPreview) {
        const currentItem = document.querySelector(".country__item--current");
        currCountryName = currentItem.querySelector(".country__name");
      }
      this.state.countryArr.forEach((item) => {
        if (item.country.includes(currCountryName.textContent)) {
          this.setState({
            countryName: item.pathName,
            countryData: { ...item },
          });
          console.log(item);
          //console.log(countryData);
          console.log(this.state.countryData);
        }
      });
    }
  }

  render() {
    return (
      <HashRouter basename="/">
        <div className="app-wrapper">
          <div className="content-wrapper">
            <Header searchHandler={this.searchHandler.bind(this)} />
            <main className="main__wrapper" onClick={this.updateCountry}>
              <Switch>
                <Route
                  path={"/Country-:countryName"}
                  exact
                  render={(props) => (
                    <CountryPage
                      // countryData={this.state.countryData}
                      {...props}
                    ></CountryPage>
                  )}
                />
                {/* <Route path={`/Country-${this.state.countryName}`} exact >
                <CountryPage countryName={this.state.countryName} 
                />
              </Route> */}
                <Route path="/" exact>
                  <MainPage search={this.state.search} />
                </Route>
              </Switch>
            </main>
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}
