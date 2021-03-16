// import React from "react";

// const loadScript = (src, lang, onLoad) => {
//   const script = document.createElement("script");

//   script.src = src + lang;
//   script.async = true;
//   document.body.appendChild(script);
//   script.onload = onLoad;
// };

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

//   myMap.geoObjects.add(myPlacemark);
//   myMap.layers.add(
//     new window.ymaps.Layer("http://tile.openstreetmap.org/%z/%x/%y.png", {
//       projection: window.ymaps.projection.sphericalMercator,
//     })
//   );
//   myMap.copyrights.add("© OpenStreetMap contributors, CC-BY-SA");

//   //   var Layer = function () {
//   //     var layer = new ymaps.Layer(TILES_PATH + '/%z/tile-%x-%y.jpg', {
//   //         // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
//   //         // раскомментируйте эту строчку и укажите ссылку на изображение.
//   //         // notFoundTile: 'url'
//   //     });
//   //     // Указываем доступный диапазон масштабов для данного слоя.
//   //     layer.getZoomRange = function () {
//   //         return ymaps.vow.resolve([0, 4]);
//   //     };
//   //     // Добавляем свои копирайты.
//   //     layer.getCopyrights = function () {
//   //         return ymaps.vow.resolve('©');
//   //     };
//   //     return layer;
//   // };
//   // // Добавляем в хранилище слоев свой конструктор.
//   // ymaps.layer.storage.add(LAYER_NAME, Layer);

//   let objectManager = new window.ymaps.ObjectManager();
//   // Загрузим регионы.
//   window.ymaps.borders
//     .load("BY", {
//       lang: "ru",
//       quality: 2,
//     })
//     .then(function (geojson) {
//       for (let i = 0; i < geojson.features.length; i++) {
//         let geoObject = new window.ymaps.GeoObject(geojson.features[i]);
//         myMap.geoObjects.add(geoObject);
//       }
//     });
//   myMap.getPanoramaManager().then(function (manager) {
//     // Включаем режим поиска панорам на карте.
//     manager.enableLookup();
//     // Открываем плеер панорам.
//     manager.openPlayer(myMap.getCenter());
//     // Подпишемся на событие открытия плеера панорам.
//     manager.events.add("openplayer", function () {
//       // Получим текущий плеер панорам.
//       let player = manager.getPlayer();
//       player.events.add(["panoramachange", "destroy"], function () {});
//     });
//   });
// };

// export default function App() {
//   React.useEffect(() => {
//     loadScript(
//       "https://api-maps.yandex.ru/2.1/?apikey=5a8e8b64-fb32-44f6-b12c-859adad5caf3&lang=",
//       "en_RU",
//       () => {
//         window.ymaps.ready(init);
//       }
//     );
//   }, []);

//   return <div id="map" />;
// }
import React, { useEffect, useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Panorama,
  ObjectManager,
} from "react-yandex-maps";
//const mapState = { center: [55.76, 37.64], zoom: 10 };
//const COLORS = ["#F0F075", "#FB6C3F", "#3D4C76", "#49C0B5"];
let yamaps= null;
let layer = null;
export default (props) => {
  const [coords, setCoords] = useState(props.coordinates)
  const mapRef = React.createRef(null);
  const yMapRef = React.createRef(null);
  console.log(props)
  // const addLayer = () => {
  //   mapRef.current.layers.add(layer)
  // }
  const onApiAvaliable = ymaps => {
    if(!ymaps.panorama.isSupported()) {
      return
    };
    ymaps.panorama.locate([55.733685, 37.588264]).done(
      function(panoramas) {
        if (panoramas.lenght>0) {
          const player = new ymaps.panorama.Player('player1', panoramas[0], {
            direction: [256,16]
          });
        }
      }, function (error) {
        console.log(error);
      }
    )
  }
  const panoramas = (ymaps) => {
  ymaps.getPanoramaManager().then(function (manager) {
    // Включаем режим поиска панорам на карте.
    manager.enableLookup();
    // Открываем плеер панорам.
    manager.openPlayer(ymaps.getCenter());
    // Подпишемся на событие открытия плеера панорам.
    manager.events.add("openplayer", function () {
      // Получим текущий плеер панорам.
      let player = manager.getPlayer();
      player.events.add(["panoramachange", "destroy"], function () {});
    });
  })
}
  const getRegions = (ymaps, countryCode, coordinates) => {
    if (mapRef && mapRef.current) {
     
      yamaps=ymaps;
      console.log(yamaps)
      const objectManager = new ymaps.ObjectManager();
      ymaps.borders
        .load(`001`, {
          lang: "ru",
          quality: 0,
        })
        .then((result)=>{
          mapRef.current.geoObjects.remove(layer)
          const options = {
              fillOpacity: 0,
              fillColor: "#6961b0",
              strokeColor: "#FFF",
              strokeOpcaity: 0,
              labelDefaults: "dark"
              
            }
            const options1 = {
              fillOpacity: 0.4,
              fillColor: "#DC143C",
              strokeColor: "#FFF",
              strokeOpcaity: 0.4,
            }
            layer = objectManager.add(result.features.map(function(feature) {
              
              
              
              
              //console.log(feature.properties)
              if (feature.properties.iso3166===countryCode) {
                feature.id = feature.properties.iso3166;
                feature.properties.regionName=feature.properties.iso3166;
                feature.options = options1
                
              } else {
                feature.options = options
              }
              
              return feature
            }))
            //let placemark = new ymaps.Placemark(coordinates)
            mapRef.current.geoObjects.add(layer)
          //mapRef.current.geoObjects.add(placemark)
          
          })
          //let objectManager= new ymaps.ObjectManager()
          
          
             
             
    }
  };

  useEffect(()=> {
    getRegions(yamaps, props.countryCode, props.coordinates);
    //setCoords(props.coordinates)
  },[props.countryCode])
  return (
    <div >
    <YMaps
    onApiAvaliable={ymaps => onApiAvaliable(ymaps)}
    useRef={yMapRef}
      query={{
        ns: "ymaps",
        apikey: "5a8e8b64-fb32-44f6-b12c-859adad5caf3",
        load: "package.full"
      }}
    >
      <Map
      className="map"
        onLoad={(ymaps) => getRegions(ymaps, props.countryCode)}
        instanceRef={mapRef}
        state={{
          center: props.coordinates,
          zoom: 4.5,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        // modules={[
        //   "control.ZoomControl",
        //   "control.FullscreenControl",
        //   "borders",
        //   "ObjectManager",
        // ]}
      >
        <Placemark geometry={props.coordinates} />
      </Map>
      {/* <Panorama defaultPoint={[55.733685, 37.588264]} /> */}
    </YMaps>
    </div>
  );
};
