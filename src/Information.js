import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import "./Information.css";

function Information({type, isRed, active, current, total, ...props}) {


    return (
            <Card className={`information ${active && "information--selected"} ${isRed && 'information--red'}`} 
            onClick={props.onClick}>
                <CardContent>
                    <Typography className="information__title" color="textPrimary">
                        {type}
                    </Typography>

                    <h2 className={`information__current ${!isRed && "information__cases--green"}`}>{current}</h2>

                    <Typography className="information__total" color="textSecondary">
                        {total} Total
                    </Typography>

                </CardContent>
            </Card>
    );
}

export default Information;