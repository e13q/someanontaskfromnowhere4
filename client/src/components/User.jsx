/* eslint-disable react/prop-types */
import React from 'react';

import { Checkbox } from '@mui/material';

const User = (props) => {
    console.log(props);
    return (
        <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
            <div className="cb_chooseUser">
                <Checkbox></Checkbox>
            </div>
            <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
                <h1>
                    {props.user.firstName + ' ' + props.user.secondName}
                </h1>
                <h2>
                    {props.user.position}
                </h2>
            </div>
            <div className="userEmail">
                <h1>
                    {props.user.email}
                </h1>
            </div>
            <div className="lastLogin">
                <h1>
                    {props.user.lastLogin}
                </h1>
            </div>
            <div className="status">
                <h1>
                    {props.user.status}
                </h1>
            </div>
        </div>
    );
};
export default User;
