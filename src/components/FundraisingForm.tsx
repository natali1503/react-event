import { Box, Grid2, Icon, Paper, Stack, Typography } from "@mui/material"

const FundraisingForm = () => {
  return (
    // Don't forget to change/delete maxWidth
    <Paper sx={{padding: "0.5rem 1.5rem"}}>
      <Typography variant="h5" sx={{maxWidth: "600px"}}>
        <h3>Сбор средств для пенсионерки Ангелины Ивановны</h3>
       </Typography>  
       <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1">
              <h4>Организация</h4>
            </Typography>
            <Typography variant="subtitle2">
              Фонд помощи для ветеранов и инвалидов "Вера"
            </Typography>
            <Typography variant="subtitle2">
              +<Icon/> Организация проверена
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              <h4>Кому мы помогаем</h4>
            </Typography>
            <Typography variant="subtitle2">
              ...{/* Import text here */}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              <h4>Цель сбора</h4>
            </Typography>
            <Typography variant="subtitle2">
              ...{/* Import text here */}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              <h4>Цель сбора</h4>
            </Typography>
            <Typography variant="subtitle2">
              ...{/* Need some work and decomposition here */}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              <h4>План действий</h4>
            </Typography>
            <Typography variant="subtitle2">
              (ADD CHECKBOXES HERE) {/* Need some work and decomposition here */}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              <h4>Завершение</h4>
            </Typography>
            <Typography variant="subtitle2">
              20.03.2025 {/* import date here */}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              <h4>Локация</h4>
            </Typography>
            <Stack sx={{gap: "0.5rem"}}>
              <Typography variant="subtitle2">
                Область: {/* import data here, add decomposition */}
              </Typography>
              <Typography variant="subtitle2">
                Насленный пункт:: {/* import data here, add decomposition */}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              <h4>Контакты</h4>
            </Typography>
            <Grid2 sx={{ display: "flex", flexDirection: "row", gap: 4}}>
              <Stack>
                <Typography>
                  <h5>Телефон</h5>
                </Typography>
                <Typography variant="subtitle2">
                  + 7 999 888 99 50
                </Typography>
              </Stack>
              <Stack>
                <Typography>
                  <h5>E-mail</h5>
                </Typography>
                <Typography variant="subtitle2">
                  forExample2@yandex.ru
                </Typography>
              </Stack>
              <Stack>
                <Typography>
                  <h5>Сайт</h5>
                </Typography>
                <Typography variant="subtitle2">
                  forexamplehelp.ru
                </Typography>
              </Stack>
            </Grid2>
          </Box>
       </Stack>
       <h3></h3>
    </Paper>
  )
};

export default FundraisingForm;