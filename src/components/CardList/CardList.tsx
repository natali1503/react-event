import { FC } from "react";
import CardItem from "../CardItem/CardItem";
import Grid from '@mui/material/Grid2';
import { HelpRequest } from "../../types/HelpRequest";

type RequestsProps = {
  helpRequests: HelpRequest[];
  viewMode: string;
};

const CardList: FC<RequestsProps> = (requests) => {
  const { helpRequests, viewMode } = requests;

  return (
    <Grid 
    container
    spacing={viewMode === 'grid' ? 2 : 0}
    direction={viewMode === 'list' ? 'column' : 'row'}>
      {helpRequests.map((request) => {
         const keyValue = request.id;
         return (
          <CardItem key={keyValue} helpRequest={request} orientation={viewMode === 'grid' ? 'vertical' : 'horizontal'} />
         );
      })}
    </Grid>
  );
}

export default CardList;