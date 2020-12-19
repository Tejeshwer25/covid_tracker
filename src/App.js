import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import Information from './Information';
import Table from './Table';
import {sort} from './utility.js';

function App() {
  var [countries, setCountries] = useState([]);
  var [selectedCountry, setSelectedCountry] = useState("worldwide");
  var [countryInformation, setCountryInformation] = useState({});
  var [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInformation(data);
    })
  }, []);

  useEffect(() => {
       const getCountries = async () => {
           await fetch("https://disease.sh/v3/covid-19/countries")
           .then((response) => response.json())
           .then((data) => {
               const countries = data.map((country) => (
                    {
                    name: country.country,
                    value: country.countryInfo.iso2
                }));

                const sortedData = sort(data);

                setTableData(sortedData);
                setCountries(countries);
            })
        };
        getCountries();
    }, []);

    var changeCountry = async (e) => {
      const url = e.target.value === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${e.target.value}`;

      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setSelectedCountry(e.target.value);
        setCountryInformation(data);
      })
    }

  return (
    <div className="app">
      <div className="app__header">
          <h1>Covid-19 Tracker</h1> 
          <FormControl className="header__dropdown">
           <Select className="header__select" variant="outlined" value={selectedCountry} onChange={changeCountry}>
             <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
               <MenuItem value={country.value}>{country.name}</MenuItem>
             ))}
           </Select>
         </FormControl>
      </div>
      
      <div className="app__parts">
        <div className="app__left">
          <div className="app__cards">
            <Information type="Cases" current={countryInformation.todayCases} total={countryInformation.cases}/>
            <Information type="Deaths" current={countryInformation.todayDeaths} total={countryInformation.deaths}/>
            <Information type="Recovered" current={countryInformation.todayRecovered} total={countryInformation.recovered}/>
          </div>
        </div>

        <div className="app__right">
          <Table countries={tableData}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
