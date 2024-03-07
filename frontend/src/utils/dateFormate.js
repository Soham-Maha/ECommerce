import React from "react";
import Moment from "react-moment";

function DateFormater({date}){
    return (
        <Moment format="D MM YYYY" withTitle>
            {date}
        </Moment>
    )
}

export default DateFormater;