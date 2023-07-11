import React, {useEffect, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import Lang from "../utils/lang.js";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJkdWxsYXlldjI3IiwiYSI6ImNsaDJqbXR4MzFlaWkzcG9nOHh0YnBxcTAifQ.QmCQ0bQdjIbSkRiPzrQ05w';


const MapComponent = () => {

    const text = Lang.getCurrentText()

    const styles = [
        {id: 'streets-v12', label: text.streets },
        {id: 'satellite-streets-v12', label: text.satellite_streets},
        {id: 'light-v11', label: text.light},
        {id: 'dark-v11', label: text.dark},
    ];

    const [map, setMap] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(styles[0].id);

    useEffect(() => {
        if (!map) {
            const newMap = new mapboxgl.Map({
                container: 'map',
                style: `mapbox://styles/mapbox/${selectedStyle}`,
                center: [49.86093456258274, 40.410523489602866],
                zoom: 15
            });

            setMap(newMap);
        } else {
            map.setStyle(`mapbox://styles/mapbox/${selectedStyle}`);
        }
    }, [map, selectedStyle]);

    useEffect(() => {
        if (map) {
            const marker = new mapboxgl.Marker({ color: 'red' })
                .setLngLat([49.86093456258274, 40.410523489602866])
                .addTo(map);
        }
    }, [map]);

    return (
        <div className="map-container">
            <div id="map"/>
            <div id="menu">
                {styles.map((style) => (
                    <React.Fragment key={style.id}>
                        <input className="option" id={style.id} type="radio" name="rtoggle" value={style.id}
                               checked={style.id === selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}/>
                        <label htmlFor={style.id}>{style.label}</label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )

}

export default MapComponent;
