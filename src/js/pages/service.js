export async function getData(lang) {
    try {
        //const url = `http://localhost:4000/countries?lang=${lang}`;
        const url = `https://travelappbe.herokuapp.com/countries?lang=${lang}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

export async function getDataCountry(id,lang) {
    try {
        //const url = `http://localhost:4000/countries/${id}?lang=${lang}`;
        const url = `https://travelappbe.herokuapp.com/countries/${id}?lang=${lang}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
