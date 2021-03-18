// const init = () => {
//   const myMap = new window.ymaps.Map("map", {
//     center: [55.907228, 31.260503],
//     zoom: 7,
//   });
//   const myPlacemark = new window.ymaps.Placemark([55.907228, 31.260503], {
//     // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
//     balloonContentHeader: "Балун метки",
//     balloonContentBody: "Содержимое <em>балуна</em> метки",
//     balloonContentFooter: "Подвал",
//     hintContent: "Хинт метки",
//   });

import React, { useEffect, useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Panorama,
  ObjectManager,
} from "react-yandex-maps";
let yamaps = null;
let layer = null;
export default (props) => {
  const mapRef = React.createRef(null);
  const yMapRef = React.createRef(null);
  const [lang, setLang] = React.useState("en_US");
  //console.log(props);
  const getLayer = (ymaps) => {
    const layerbg = new ymaps.Layer(
      "http://tile.openstreetmap.org/%z/%x/%y.png",
      {
        projection: ymaps.projection.sphericalMercator,
      }
    );

    mapRef.current.layers.add(layerbg);
  };
  const getPanoramas = () => {
    // if (!ymaps.panorama.isSupported()) {
    //   return;
    // }
    if (mapRef && mapRef.current) {
      //let collection = new ymaps.GeoObjectCollection();
      //mapRef.current.geoObjects.add(collection);
      mapRef.current.getPanoramaManager().then(function (manager) {
        // Включаем режим поиска панорам на карте.
        manager.enableLookup();
        // Открываем плеер панорам.
        manager.openPlayer(mapRef.current.getCenter());
        // Подпишемся на событие открытия плеера панорам.
        // manager.events.add("openplayer", function () {
        //   // Получим текущий плеер панорам.
        //   //let player = manager.getPlayer();
        //   // player.events.add(["panoramachange", "destroy"], function () {
        //   //   collection.removeAll();
        //   // });
        // });
      });
    }
  };

  const getRegions = (ymaps, countryCode, coordinates) => {
    if (mapRef && mapRef.current) {
      yamaps = ymaps;
      const objectManager = new ymaps.ObjectManager();
      ymaps.borders
        .load(`001`, {
          lang: "ru",
          quality: 0,
        })
        .then((result) => {
          mapRef.current.geoObjects.remove(layer);
          const options = {
            fillOpacity: 0,
            fillColor: "#6961b0",
            strokeColor: "#FFF",
            strokeOpcaity: 0,
            labelDefaults: "dark",
          };
          const options1 = {
            fillOpacity: 0.4,
            fillColor: "#DC143C",
            strokeColor: "#FFF",
            strokeOpcaity: 0.4,
          };
          layer = objectManager.add(
            result.features.map(function (feature) {
              if (feature.properties.iso3166 === countryCode) {
                feature.id = feature.properties.iso3166;
                feature.properties.regionName = feature.properties.iso3166;
                feature.options = options1;
              } else {
                feature.options = options;
              }

              return feature;
            })
          );
          mapRef.current.geoObjects.add(layer);
        });
    }
  };

  useEffect(() => {
    getRegions(yamaps, props.countryCode, props.coordinates);
    //getPanoramas();
  }, [props.countryCode]);

  return (
    <div>
      <YMaps
        useRef={yMapRef}
        query={{
          ns: "ymaps",
          apikey: "5a8e8b64-fb32-44f6-b12c-859adad5caf3",
          load: "package.full",
          lang: lang,
        }}
      >
        <Map
          className="map"
          onLoad={(ymaps) => {
            //getPanoramas();
            getRegions(ymaps, props.countryCode);

            getLayer(ymaps);
          }}
          instanceRef={mapRef}
          state={{
            center: props.coordinates,
            zoom: 4.5,
            controls: ["zoomControl", "fullscreenControl"],
          }}
        >
          <Placemark geometry={props.coordinates} />
        </Map>
      </YMaps>
    </div>
  );
};
