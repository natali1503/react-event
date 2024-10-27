import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { HelpRequest } from "../../types/HelpRequest";
import { formatDate, formatNumber, formatString } from "../../helper-functions/helper-functions";

type CardItemProps = {
  helpRequest: HelpRequest;
  orientation: string;
};

const CardItem: FC<CardItemProps> = (props) => {
  const { helpRequest, orientation } = props;

  return (
    <>
      <Card sx={{ 
        width: orientation === 'horizontal' ? '100%' : 320,
        display: 'flex', 
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        }}>
        {orientation !== 'horizontal' && (<CardMedia
          sx={{ height: 220, width: 220, margin: '0 auto' }}
          image={
            helpRequest.requesterType === "organization"
              ? "/img/organization.svg"
              : helpRequest.requesterType === "person" && helpRequest.helpType === "finance"
              ? "/img/person-finance.svg"
              : helpRequest.requesterType === "person" && helpRequest.helpType === "material"
              ? "/img/person-material.svg"
              : "/img/organization.svg" // default
          }
          title={helpRequest.requesterType }
        />)}
        <CardHeader 
          sx={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between', 
            padding: '16px', 
            textAlign: 'left', 
            minHeight: '128px'
          }} 
          title={formatString(helpRequest.title)}
          action={
            <IconButton aria-label="add to favorites">
              <StarBorderIcon />
            </IconButton>
          } 
        />
        <Divider component="div" />
        <CardContent sx={{ padding: '10px 16px', textAlign: 'left',
          //flex: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'
          }}>
          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Организатор</Typography>
            <Typography variant="body2">{helpRequest.organization.title}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Локация</Typography>
            <Typography variant="body2">{helpRequest.location.district}</Typography>
            <Typography variant="body2">Населенный пункт: {helpRequest.location.city}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Цель сбора</Typography>
            <Typography variant="body2">{helpRequest.goalDescription}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Завершение</Typography>
            <Typography variant="body2">{formatDate(helpRequest.endingDate)}</Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Мы собрали</Typography>
            <LinearProgress variant="determinate" value={helpRequest.requestGoal / helpRequest.requestGoalCurrentValue * 100} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
              <Typography variant="body2">{formatNumber(helpRequest.requestGoal)} руб</Typography> {/* Поменяла местами, т.к значения в бд неверные */}
              <Typography variant="body2">{formatNumber(helpRequest.requestGoalCurrentValue)} руб</Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions disableSpacing sx={{ padding: '0 16px 20px', textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start', marginTop: 'auto'}}>
          <Typography variant="body2" sx={{ marginBottom: '10px' }}>Нас уже: {formatNumber(helpRequest.contributorsCount)}</Typography>
          <Button size="large" variant="contained" color="primary" fullWidth>Помочь</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default CardItem;