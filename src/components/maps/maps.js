import React from "react";

const loadScript = (src, lang, onLoad) => {
  const script = document.createElement("script");

  script.src = src + lang;
  script.async = true;
  document.body.appendChild(script);
  script.onload = onLoad;
};

const init = () => {
  const myMap = new window.ymaps.Map("map", {
    center: [55.907228, 31.260503],
    zoom: 7,
  });
  const myPlacemark = new window.ymaps.Placemark([55.907228, 31.260503], {
    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
    balloonContentHeader: "Балун метки",
    balloonContentBody: "Содержимое <em>балуна</em> метки",
    balloonContentFooter: "Подвал",
    hintContent: "Хинт метки",
  });

  myMap.geoObjects.add(myPlacemark);
  myMap.layers.add(
    new window.ymaps.Layer("http://tile.openstreetmap.org/%z/%x/%y.png", {
      projection: window.ymaps.projection.sphericalMercator,
    })
  );
  myMap.copyrights.add("© OpenStreetMap contributors, CC-BY-SA");

  //   var Layer = function () {
  //     var layer = new ymaps.Layer(TILES_PATH + '/%z/tile-%x-%y.jpg', {
  //         // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
  //         // раскомментируйте эту строчку и укажите ссылку на изображение.
  //         // notFoundTile: 'url'
  //     });
  //     // Указываем доступный диапазон масштабов для данного слоя.
  //     layer.getZoomRange = function () {
  //         return ymaps.vow.resolve([0, 4]);
  //     };
  //     // Добавляем свои копирайты.
  //     layer.getCopyrights = function () {
  //         return ymaps.vow.resolve('©');
  //     };
  //     return layer;
  // };
  // // Добавляем в хранилище слоев свой конструктор.
  // ymaps.layer.storage.add(LAYER_NAME, Layer);

  let objectManager = new window.ymaps.ObjectManager();
  // Загрузим регионы.
  window.ymaps.borders
    .load("BY", {
      lang: "ru",
      quality: 2,
    })
    .then(function (geojson) {
      for (let i = 0; i < geojson.features.length; i++) {
        let geoObject = new window.ymaps.GeoObject(geojson.features[i]);
        myMap.geoObjects.add(geoObject);
      }
    });
  myMap.getPanoramaManager().then(function (manager) {
    // Включаем режим поиска панорам на карте.
    manager.enableLookup();
    // Открываем плеер панорам.
    manager.openPlayer(myMap.getCenter());
    // Подпишемся на событие открытия плеера панорам.
    manager.events.add("openplayer", function () {
      // Получим текущий плеер панорам.
      let player = manager.getPlayer();
      player.events.add(["panoramachange", "destroy"], function () {});
    });
  });
};

export default function App() {
  React.useEffect(() => {
    loadScript(
      "https://api-maps.yandex.ru/2.1/?apikey=5a8e8b64-fb32-44f6-b12c-859adad5caf3&lang=",
      "en_RU",
      () => {
        window.ymaps.ready(init);
      }
    );
  }, []);

  return (
    <div className="App">
      <div id="map" style={{ width: 600, height: 400 }} />
    </div>
  );
}
