import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import './Table.css';

function Table({countries}) {
    return (
        <div className="table">
            <Card>
                <CardContent>
                    <h3 className="table__heading">List of countries by cases:- </h3>
                    {countries.map(({country, cases}) => (
                        <tr>
                            <td><strong>{country}</strong></td>
                            <td>{cases}</td>
                        </tr>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default Table;
