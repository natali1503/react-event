import { FC } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import VerticalCard from '../VerticalCard/VerticalCard';
import HorizontalCard from '../HorizontalCard/HorizontalCard';

type CardItemProps = {
  helpRequest: HelpRequest;
  orientation: string;
  keyValue: string;
};

const CardItem: FC<CardItemProps> = (props) => {
  const { helpRequest, orientation} = props;
  
  return (
    orientation !== 'horizontal' ? (
      <VerticalCard helpRequest={helpRequest}/>
    ) : (
      <HorizontalCard helpRequest={helpRequest}/>
    )
  );
}

export default CardItem;