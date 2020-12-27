import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import Graph from './Graph';
import Information from './Information';
import Table from './Table';
import {sort, prettyPrintStat} from './utility.js';
import Map from './Map';
import "leaflet/dist/leaflet.css";

function App() {
  var [countries, setCountries] = useState([]);
  var [selectedCountry, setSelectedCountry] = useState("worldwide");
  var [countryInformation, setCountryInformation] = useState({});
  var [tableData, setTableData] = useState([]);
  var [caseType, setCaseType] = useState("cases");
  var [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796});
  var [mapZoom, setMapZoom] = useState(3);
  var [mapCountries, setMapCountries] = useState([]);

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
                setMapCountries(data);
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

        setMapCenter({lat:data.countryInfo.lat, lng:data.countryInfo.lng});
        setMapZoom(4);
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

          <Map countries={mapCountries} caseType={caseType} center={mapCenter} zoom={mapZoom} />
          
        </div>

        <Card className="app__right">
          <h3 className="table__heading">List of countries by cases:- </h3>
          <Table countries={tableData}/>

          <h3>Worldwide new {caseType}</h3>
          <Card>
            <CardContent>
              <Graph caseType={caseType}/>
            </CardContent>
          </Card>
        </Card>
      </div>
      
    </div>
  );
}

export default App;
