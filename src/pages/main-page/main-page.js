import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Maps from "../../components/maps/maps";
import Time_Widget from "../../components/time-widget/time-widget";
import Weather_Widget from "../../components/weather-widget/weather";
// import CountrySlider from "../../components/slider/slider";
import Video from "../../components/video/video";
import Exchange from "../../components/exchange-component/exchange";

export default () => {
  return (
    <main className="main">
      <div className="contentWrap">
        <Header></Header>
        <Maps></Maps>
        <Time_Widget />
        <Weather_Widget />
        <Video />
        <Exchange />
        {/* <CountrySlider /> */}
      </div>

      <Footer></Footer>
    </main>
  );
};
