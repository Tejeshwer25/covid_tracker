import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Header.css';

// https://disease.sh/v3/covid-19/countries

function Header() {
    var [countries, setCountries] = useState([]);
    var [selectedCountry, setSelectedCountry] = useState("worldwide");

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

                setCountries(countries);
            })
        };
        getCountries();
    }, [countries]);

    return (
        <div className="header">
            <h1>Covid-19 Tracker</h1> 
            <FormControl className="header__dropdown">
                <Select className="header__select" variant="outlined" value={selectedCountry} onChange={(e) => {setSelectedCountry(e.target.value)}}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {countries.map((country) => (
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default Header;