import { FC } from "react";
import CardItem from "../CardItem/CardItem";
import Grid from '@mui/material/Grid2';
import { HelpRequest } from "../../types/HelpRequest";

type RequestsProps = {
  helpRequests: HelpRequest[];
};

const CardList: FC<RequestsProps> = (requests) => {
  const { helpRequests } = requests;

  return (
    <Grid container spacing={2}>
      {helpRequests.map((request) => {
         const keyValue = request.id;
         return (
          <CardItem key={keyValue} helpRequest={request}/>
         );
      })}
    </Grid>
  );
}

export default CardList;