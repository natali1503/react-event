import { FC, useEffect } from "react";
import CardItem from "../CardItem/CardItem";
import Grid from '@mui/material/Grid2';
import { HelpRequest } from "../../types/HelpRequest";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchHelpRequestsAction } from "../../store/api-actions";

type RequestsProps = {
  helpRequests: HelpRequest[];
};

const CardList: FC<RequestsProps> = (requests) => {
  const { helpRequests } = requests;
  const dispatch = useAppDispatch();
  
  useEffect(()=> {
    dispatch(fetchHelpRequestsAction());
  }, []);

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