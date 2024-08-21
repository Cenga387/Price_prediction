import React from 'react';

function CarStats() {
    return (
        <div>
            <h2>Price Distribution by Manufacturer</h2>
            <img src="http://localhost:5000/generate-kde-plot" alt="KDE Plot" />
        </div>
    );
}

export default CarStats;
