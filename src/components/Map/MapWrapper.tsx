import React, { useEffect, useRef } from 'react';

import { HelpRequest } from '../../types/HelpRequest';

import YandexMap from './YandexMap';

type MapWrapperProps = {
  helpRequests: HelpRequest[];
};

const MapWrapper: React.FC<MapWrapperProps> = ({ helpRequests }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return <YandexMap helpRequests={helpRequests} isMounted={isMounted} />;
};

export default MapWrapper;
