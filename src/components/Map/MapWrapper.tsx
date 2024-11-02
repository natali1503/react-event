import React, { useEffect, useRef } from 'react';
import YandexMapComponent from './YandexMap';
import { HelpRequest } from '../../types/HelpRequest';

type MapWrapperProps = {
  helpRequests: HelpRequest[];
};

const MapWrapper: React.FC<MapWrapperProps> = ({ helpRequests }) => {
  const isMounted = useRef(false); // Track if the component is mounted

  useEffect(() => {
    isMounted.current = true; // Mark as mounted
    return () => {
      isMounted.current = false; // Clean up on unmount
    };
  }, []);

  return (
    <YandexMapComponent helpRequests={helpRequests} isMounted={isMounted} />
  );
};

export default MapWrapper;