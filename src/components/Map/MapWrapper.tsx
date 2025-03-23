import { FC, useEffect, useRef } from 'react';

import { IHelpRequest } from '../../types/IHelpRequest';

import YandexMap from './YandexMap';

interface IMapWrapperProps {
  helpRequests: IHelpRequest[];
}

const MapWrapper: FC<IMapWrapperProps> = ({ helpRequests }) => {
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
