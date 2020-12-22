import {Circle, Popup} from 'react-leaflet';
import React from 'react';
import numeral from 'numeral';

const casesColor = {
    cases: {
        hex:"#CC1034",
        multiplier: 800
    }, 
    recovered: {
        hex:"#7dd71d",
        multiplier:1200
    },
    deaths: {
        hex:"#fb4443",
        multiplier: 2000
    }
}

export const sort = (data) => {
    const sortedData = [...data];
    
    return sortedData.sort((a,b) => ((a.cases > b.cases) ? -1 : 1));
}

export const showCountries = (data, casesType="cases") => {
    data.map(country => (
        <Circle center={[country.countryInfo.lat, country.countryInfo.lng]}
            fillOpacity={0.4}
            color={casesColor[casesType].hex}
            fillColor={casesColor[casesType].hex} 
            radius={Math.sqrt(country[casesType]) * casesColor[casesType].multiplier}>
            <Popup>
                <h1>I am a POPUP</h1>
            </Popup>
        </Circle> 
    ))
}