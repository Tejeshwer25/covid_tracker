import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import './Table.css';
import numeral from 'numeral';

function Table({countries}) {
    return (
        <div className="table">
            <Card>
                <CardContent>
                    {countries.map(({country, cases}) => (
                        <tr>
                            <td><strong>{country}</strong></td>
                            <td>{numeral(cases).format("0,0")}</td>
                        </tr>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default Table;
