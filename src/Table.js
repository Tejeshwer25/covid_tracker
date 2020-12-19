import { Card, CardContent } from '@material-ui/core'
import React from 'react'

function Table({countries}) {
    return (
        <div className="table">
            <Card>
                <CardContent>
                    <h3>List of countries by cases:- </h3>
                    {countries.map(({country, cases}) => (
                        <tr>
                            <td>{country}</td>
                            <td>{cases}</td>
                        </tr>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default Table;
