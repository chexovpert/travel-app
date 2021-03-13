import React, { useState, useEffect } from "react";

export default (props) => {
  const [exchange, setExchange] = useState(null);
  const [exchangeBase, setExchangeBase] = useState(null);
  const [date, setDate] = useState(null);
  const [base, setBase] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  //const [flag, setFlag] = useState(false);
  //const [items, setItems] = useState([]); // добавить флаги стран/валют
  async function getExchange(base, rates) {
    try {
      const url = `https://api.exchangeratesapi.io/latest?base=${base}`;
      const res = await fetch(url);
      console.log(res);
      const data = await res.json();
      setExchange(data.rates[rates]);
      setExchangeBase(rates);
      setBase(data.base);
      setDate(data.date);
      console.log(data);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
  useEffect(() => {
    getExchange("USD", "EUR");
  }, []);
  useEffect(() => {
    getExchange("USD", "EUR");
  }, [props]);
  return (
    <div className="exchange">
      <div className="exchange__base">{base}</div>
      <table className="exchange__table">
        <tr>
          <td className="exchange__current">{exchangeBase}</td>
          <td className="exchange__current">{exchange}</td>
        </tr>
        <tr>
          <td colSpan="2" className="exchange__date">
            {date}
          </td>
        </tr>
      </table>
    </div>
  );
};
