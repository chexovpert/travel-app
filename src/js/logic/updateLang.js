import appData from '../data/appData';

export const updateLang = (selectedLang, langApp) => {
  const wrapper = document.querySelector('.app-wrapper');
  const lang = selectedLang;
  for (let key in langApp) {
    let elem = wrapper.querySelector(`.${key}--lang`);
    if (elem && langApp[key][lang]) {
      elem.textContent = langApp[key][lang]
    }
  }

  const previewWrapper = document.querySelector('.precountry__link');
  if (previewWrapper) {
    const dataLangIndex = appData[0].indexOf(lang);
    const countryNameArr = document.querySelectorAll('.country__name');
    const countryTitleArr = document.querySelectorAll('.country__title');
    const countryCapitalArr = document.querySelectorAll('.country__capital');
    const countryAboutArr = document.querySelectorAll('.country-about__text');

    let i = 0;

    appData[1][dataLangIndex].forEach(item => {
      countryNameArr[i].textContent = item.country;
      countryTitleArr[i].textContent = item.country;
      countryCapitalArr[i].textContent = item.capital;
      countryAboutArr[i].textContent = item.about;
      i++
    })
    
    console.log('LANG # - ', dataLangIndex);

  }
}

export default updateLang;