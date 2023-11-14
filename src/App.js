import { useState } from "react";
import "./App.scss";
import AutoCompleteSearch from "./components/AutoCompleteSearch/Index";

function App() {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);

  const onKeywordChange = async (keyword) => {
    if (keyword) {
      await fetch(`https://restcountries.com/v3.1/name/${keyword}`)
        .then((res) => res.json())
        .then((res) => {
          const newArr =
            res?.map((c) => ({
              id: c.cca2 + c.cca3 + c.ccn3 + c.cioc + c.area,
              name: c.name.common,
              fullName: c.name.official,
            })) || [];
          setOptions1(newArr);
        });
    } else {
      setOptions1([]);
    }
  };

  const onKeywordChange2 = async (keyword) => {
    if (keyword) {
      await fetch(`https://provinces.open-api.vn/api/d/search/?q=${keyword}`)
        .then((res) => res.json())
        .then((res) => {
          const newArr =
            res?.map((c) => ({
              id: c.code,
              name: c.name,
            })) || [];
          setOptions2(newArr);
        });
    } else {
      setOptions2([]);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row" style={{ marginBottom: 50 }}>
          <h4>Tìm kiếm quốc gia</h4>
          <div>
            <AutoCompleteSearch
              value={value1}
              options={options1}
              placeholder="Vui lòng tìm kiếm quốc gia"
              keyValue="id"
              keyLabel="name"
              setValue={setValue1}
              onKeywordChange={onKeywordChange}
            />
          </div>
        </div>
        <div className="row">
          <h4>Tìm kiếm quận huyện</h4>
          <div>
            <AutoCompleteSearch
              value={value2}
              options={options2}
              placeholder="Vui lòng tìm kiếm quận huyện"
              keyValue="id"
              keyLabel="name"
              setValue={setValue2}
              onKeywordChange={onKeywordChange2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
