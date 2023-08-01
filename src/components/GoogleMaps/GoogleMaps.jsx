import { useEffect, useCallback, useRef, useState } from 'react';
// import { useCallback, useRef, createContext, useContext } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

import s from './GoogleMaps.module.css';

const containerStyleMob = {
  width: '343px',
  height: '231px',
  borderRadius: '8px',
};
const containerStyle = {
  width: '412px',
  height: '231px',
  borderRadius: '8px',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
};

// const MarkerPositionContext = createContext(null);

const GoogleMaps = ({ center }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const mapRef = useRef(undefined);
  const [markerPosition, setMarkerPosition] = useState(center);

  useEffect(() => {
    // Проверяем, есть ли сохраненные координаты маркера в localStorage
    const savedMarkerPosition = localStorage.getItem('markerPosition');
    if (savedMarkerPosition) {
      setMarkerPosition(JSON.parse(savedMarkerPosition));
    }
  }, []);

  useEffect(() => {
    // Сохраняем координаты маркера в localStorage
    localStorage.setItem('markerPosition', JSON.stringify(markerPosition));
  }, [markerPosition]);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <div className={s.container}>
      {/* <MarkerPositionContext.Provider value={center}> */}
      <GoogleMap
        mapContainerStyle={isDesktop ? containerStyle : containerStyleMob}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {/* <Marker position={useContext(MarkerPositionContext)} /> */}
        <Marker position={markerPosition} />
      </GoogleMap>
      {/* </MarkerPositionContext.Provider> */}
    </div>
  );
};

GoogleMaps.propTypes = {
  center: PropTypes.object.isRequired,
};

export default GoogleMaps;
