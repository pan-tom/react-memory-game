import React from 'react';

const numbers = [6, 12, 18, 24, 30, 36];

const NumItemsSelection = props => (
    <div id="select">
        Number of elements: <select {...props}>
            {numbers.map(number => (
                <option key={number} value={number}>{number}</option>
            ))}
        </select>
    </div>
);

export default NumItemsSelection;
