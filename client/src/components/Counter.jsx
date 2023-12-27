/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const Counter = function () {
    const [count, setCount] = useState(0);

    function incriment () {
        setCount(count + 1);
    }

    function decrement () {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <Checkbox></Checkbox>
            <Button onClick={incriment}>Increment</Button>
            <Button onClick={decrement}>Increment</Button>
        </div>
    );
};

export default Counter;
