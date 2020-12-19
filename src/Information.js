import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

function Information({type, current, total}) {


    return (
        <div className="information">
            <Card>
                <CardContent>
                    <Typography className="information__title" color="textPrimary">
                        {type}:-
                    </Typography>
                    <h2 className="information__current">{current}</h2>
                    <Typography className="information__total" color="textSecondary">
                        {total}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Information;