import React, { useEffect, useState } from 'react';
import Icon from './Icon';

const TopCountries = () => {
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/analytics/GetAlgoDetails')
            .then(response => response.json())
            .then(data => {
                // Map the response data to the structure expected by the component
                const formattedData = data.map(({ id, name, avgCompressionTime }) => ({
                    id,
                    name,
                    rise: avgCompressionTime < 15000, // example condition, adjust as needed
                    value: avgCompressionTime,
                }));
                setCountryData(formattedData);
            })
            .catch(error => console.error('Error fetching country data:', error));
    }, []);

    return (
        <div className="flex p-4 flex-col h-full">
            <div className="flex justify-between items-center">
                <div className="text-white font-bold">Compression Time</div>
                <Icon path="res-react-dash-plus" className="w-5 h-5" />
            </div>
            {countryData.map(({ name, rise, value, id }) => (
                <div className="flex items-center mt-3" key={id}>
                    <div className="">{id}</div>
                    {/* <Image path={`res-react-dash-flag-${id}`} className="ml-2 w-6 h-6" /> */}
                    <div className="ml-2">{name}</div>
                    <div className="flex-grow" />
                    <div className="">{`${value.toLocaleString()} ns`}</div>
                    <Icon path={rise ? "res-react-dash-country-up" : "res-react-dash-country-down"} className="w-4 h-4 mx-3" />
                    <Icon path="res-react-dash-options" className="w-2 h-2" />
                </div>
            ))}
            <div className="flex-grow" />
            <div className="flex justify-center">
                <div className="">Check All</div>
            </div>
        </div>
    );
};

export default TopCountries;