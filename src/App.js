import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import Graph from './Graph';
import Information from './Information';
import Table from './Table';
import {sort, prettyPrintStat} from './utility.js';
import Map from './Map';
import "leaflet/dist/leaflet.css";
import { useSpring , animated } from 'react-spring';

function App() {
  var [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796});
  var [mapZoom, setMapZoom] = useState(3);
  var [mapCountries, setMapCountries] = useState([]);
  var [tableData, setTableData] = useState([]);
  var [countries, setCountries] = useState([]);
  var [selectedCountry, setSelectedCountry] = useState("worldwide");
  var [countryInformation, setCountryInformation] = useState({});
  var [caseType, setCaseType] = useState("cases");


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

                let sortedData = sort(data);

                setTableData(sortedData);
                setMapCountries(data);
                setCountries(countries);
            })
        };
        getCountries();
    }, []);

    const changeCountry = async (e) => {
      const url = e.target.value === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${e.target.value}`;

      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(e.target.value);
        setCountryInformation(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
    }

    const props = useSpring({
      from: { opacity: 0, marginTop:-500 },
      to: {opacity:1, marginTop:0},
    })

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
      
      <animated.div className="app__parts" style={props}>
        <div className="app__left">
          <div className="app__cards">
            <Information type="Cases" 
            isRed
            active= {caseType === "cases"}
            onClick = {e => setCaseType('cases')}
            current={prettyPrintStat(countryInformation.todayCases)} 
            total={prettyPrintStat(countryInformation.cases)}/>

            <Information type="Deaths" 
            isRed
            active= {caseType === "deaths"}
            onClick = {e => setCaseType("deaths")}
            current={prettyPrintStat(countryInformation.todayDeaths)} total={prettyPrintStat(countryInformation.deaths)}/>
            
            <Information type="Recovered" 
            active = {caseType === "recovered"}
            onClick = {e => setCaseType('recovered')}
            current={prettyPrintStat(countryInformation.todayRecovered)} total={prettyPrintStat(countryInformation.recovered)}/>
          </div>

          <Map countries={mapCountries} 
            casesType={caseType} 
            center={mapCenter} 
            zoom={mapZoom} 
          />
          
        </div>

        <Card className="app__right">
          <CardContent className="app__table">
            <h3 className="table__heading">List of countries by cases:- </h3>
            <Table countries={tableData}/>
          </CardContent>

            <CardContent className="app__chart">
              <h3>Worldwide new {caseType}</h3>
              <Graph caseType={caseType}/>
            </CardContent>
        </Card>
      </animated.div>
    </div>
  );
}

export default App;
