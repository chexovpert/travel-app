export const updateMainBgn = (bgNumber, countryList) => {
  const currentBg = document.querySelector('.current-bg');
  const nextBg = document.querySelector('.next-bg');
  nextBg.style.backgroundImage = `url(${countryList[bgNumber].bgImage})`;
  console.log(bgNumber, countryList.length);
  currentBg.classList.add('opacity-bg');
  setTimeout(() => {
    currentBg.classList.remove('current-bg');
    nextBg.classList.remove('next-bg');
    currentBg.classList.add('next-bg');
    nextBg.classList.add('current-bg');
    currentBg.classList.remove('opacity-bg');
  }, 850)  
}

export default updateMainBgn;