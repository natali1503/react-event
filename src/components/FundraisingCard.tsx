import { Box, Button, LinearProgress, Paper, Stack, Typography } from "@mui/material"

const FundraisingCard = () => {
  return (
    // Don't forget to change/delete maxWidth
    <Paper sx={{maxWidth: "300px", padding: "0.5rem 1.5rem"}}>
      <Typography>
        <h3>Вместе для добрых дел</h3>
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle1">
            Цель сбора
          </Typography>
          <Typography variant="subtitle2">
            asdasdsad...{/* Import text here */}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">
            Завершение
          </Typography>
          <Typography variant="subtitle2">
            20.03.2025
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">
            Мы собрали
          </Typography>
          <LinearProgress variant="determinate" />
        </Box>
        <Box>
          <Typography sx={{ opacity: "0.6" }} variant="subtitle2">
            Нас уже:
          </Typography>
        </Box>
        <Button variant="contained">ПОМОЧЬ</Button>
        <h2></h2>
      </Stack>
    </Paper>
  )
}

export default FundraisingCard