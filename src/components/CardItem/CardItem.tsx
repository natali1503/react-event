import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { HelpRequest } from "../../types/HelpRequest";

type CardItemProps = {
  helpRequest: HelpRequest;
};

const CardItem: FC<CardItemProps> = (props) => {
  const { helpRequest } = props;

  return (
    <>
      <Card sx={{ maxWidth: 320 }}>
        <CardMedia
          sx={{ height: 220, width: 220, margin: '0 auto' }}
          image="/img/organization.svg"
          title="organization"
        />
        <CardHeader 
          sx={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between', 
            padding: '16px', 
            textAlign: 'left', 
          }} 
          title={helpRequest.title}
          action={
            <IconButton aria-label="add to favorites">
              <StarBorderIcon />
            </IconButton>
          } 
        />
        <Divider component="div" />
        <CardContent sx={{ padding: '10px 16px', textAlign: 'left' }}>
          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Организатор</Typography>
            <Typography variant="body2">{helpRequest.organization.title}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Локация</Typography>
            <Typography variant="body2">Область: {helpRequest.location.district}</Typography>
            <Typography variant="body2">Населенный пункт: {helpRequest.location.city}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Цель сбора</Typography>
            <Typography variant="body2">{helpRequest.goalDescription}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Завершение</Typography>
            <Typography variant="body2">{helpRequest.endingDate.toString()}</Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Мы собрали</Typography>
            <LinearProgress variant="determinate" value={40} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
              <Typography variant="body2">{helpRequest.requestGoalCurrentValue} руб</Typography>
              <Typography variant="body2">{helpRequest.requestGoal} руб</Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions disableSpacing sx={{ padding: '0 16px 20px', textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography variant="body2" sx={{ marginBottom: '10px' }}>Нас уже: {helpRequest.contributorsCount}</Typography>
          <Button size="large" variant="contained" color="primary" fullWidth>Помочь</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default CardItem;