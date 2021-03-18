import appData from '../data/appData';
import {getData} from "../pages/service";

export const updateLang = async (selectedLang, langApp) => {
  const wrapper = document.querySelector('.app-wrapper');
  const currFlag = document.querySelector('.curr-lang__flag');
  const lang = selectedLang;
  const stateLang = document.getElementsByTagName('html')[0];
  stateLang.setAttribute('lang', lang);
  if (currFlag) currFlag.className = `curr-lang__flag flag__${lang}`
  for (let key in langApp) {
    let elem = wrapper.querySelector(`.${key}--lang`);
    if (elem && langApp[key][lang]) {
      elem.textContent = langApp[key][lang]
    }
  }
  let data = await getData(lang).then((json) => {return json});

  const previewWrapper = document.querySelector('.precountry__link');
  if (previewWrapper) {
    const dataLangIndex = appData[0].indexOf(lang);
    const countryNameArr = document.querySelectorAll('.country__name');
    const countryTitleArr = document.querySelectorAll('.country__title');
    const countryCapitalArr = document.querySelectorAll('.country__capital');
    const countryAboutArr = document.querySelectorAll('.country-about__text');

    let i = 0;
    data.forEach(item => {
      countryNameArr[i].textContent = item.country;
      countryTitleArr[i].textContent = item.country;
      countryCapitalArr[i].textContent = item.capital;
      countryAboutArr[i].textContent = item.about;
      i++
    })
  }
}

export default updateLang;
