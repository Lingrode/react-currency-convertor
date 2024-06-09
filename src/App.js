import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("UAH");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
    )
      .then((res) => res.json())
      .then((json) => {
        setRates(json.usd);
        console.log(json.usd);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency.toLowerCase()];
    const result = price * rates[toCurrency.toLowerCase()];
    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (rates[fromCurrency.toLowerCase()] / rates[toCurrency.toLowerCase()]) *
      value;
    setFromPrice(result);
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
