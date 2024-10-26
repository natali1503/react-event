import { Box, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import PersonalData from "./PersonalData";
import Сontacts from "./Сontacts";
import Favorites from "./Favorites";
import PagesProfile from "./pagesProfile";
import CardProfile from "./CardProfile";
import { useDispatch, useSelector } from "react-redux";
import { authUser, getUser } from "../../store/profileStore";
import { RootState } from "../../store/types";

export default function Profile() {
  const [numberTab, setNumberTab] = useState(0);
  const [isData, setIsData] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => {
    return state.profile;
  });

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  useEffect(() => {
    if (!profile.token) return;
    dispatch(getUser(profile.token));
  }, [profile.token]);

  useEffect(() => {
    if (Object.keys(profile.data).length === 0) return;
    setIsData(true);
  }, [profile.data]);

  function handleChange(e: React.SyntheticEvent, numberTab: number) {
    setNumberTab(numberTab);
  }

  return (
    profile.token && (
      <Box>
        <Box
          display="flex"
          flexDirection={"column"}
          bgcolor={"#f5f6f5"}
          margin={"84px 210px"}
        >
          <Stack>
            <Typography variant="h4" margin={"30px 40px"}>
              Мой профиль
            </Typography>
          </Stack>
          {!isData ? (
            <Skeleton />
          ) : (
            <Box display="flex" margin={"20px 40px"} gap={"20px"}>
              <Stack bgcolor={"white"}>
                <CardProfile />
              </Stack>
              <Box bgcolor={"white"} padding={"36px"}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={numberTab} onChange={handleChange}>
                    <Tab label="Личные данные" {...a11yProps(0)} />
                    <Tab label="Контакты" {...a11yProps(1)} />
                    <Tab label="Избранное" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <PagesProfile value={numberTab} index={0}>
                  <PersonalData />
                </PagesProfile>
                <PagesProfile value={numberTab} index={1}>
                  <Сontacts />
                </PagesProfile>
                <PagesProfile value={numberTab} index={2}>
                  <Favorites />
                </PagesProfile>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    )
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

async function auth() {
  const data = {
    login: "testUser15@test.com",
    password: "password15",
  };
  try {
    const response = await fetch("http://localhost:4040/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer your_token_here", // Добавьте заголовок авторизации, если требуется
      },
      // mode: "no-cors",
      body: JSON.stringify(data),
      // credentials: "include",
    });
    const token = await response.json();
    console.log(token);
    return token;
  } catch (e) {
    console.log("Error");
  }
}
