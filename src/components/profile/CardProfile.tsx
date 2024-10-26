import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";

export default function CardProfile() {
  const { data } = useSelector((state: RootState) => {
    return state.profile;
  });

  return (
    <Box>
      <Typography variant="h6">
        {data.name} {data.lastName}
      </Typography>
      <Typography variant="h6">Статус: {data.status}</Typography>
      <Button>Выйти из аккаунта</Button>
    </Box>
  );
}
