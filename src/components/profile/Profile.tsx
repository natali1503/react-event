import { Box, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import PersonalData from "./PersonalData";
import Contacts from "./Contacts";
import Favorites from "./Favorites";
import PagesProfile from "./PagesProfile";
import CardProfile from "./CardProfile";
import { useDispatch, useSelector } from "react-redux";
import { authUser, getUser } from "../../store/profileStore";
import { AppDispatch, RootState } from "../../store/types";

export default function Profile() {
  const [numberTab, setNumberTab] = useState(0);
  const [isData, setIsData] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => {
    console.log(state);
    return state.profile;
  });

  useEffect(() => {
    if (!isAuth) return;
    console.log(1);

    dispatch(getUser());
  });

  // useEffect(() => {
  //   if (Object.keys(profile.data).length === 0) return;
  //   setIsData(true);
  // }, [profile.data]);

  function handleChange(e: React.SyntheticEvent, numberTab: number) {
    setNumberTab(numberTab);
  }

  return (
    isAuth && (
      <Box>
        <Box
          display='flex'
          flexDirection={"column"}
          bgcolor={"#f5f6f5"}
          // margin={"84px 210px"}
        >
          <Stack>
            <Typography variant='h4' margin={"30px 40px"}>
              Мой профиль
            </Typography>
          </Stack>
          {!isData ? (
            <Skeleton />
          ) : (
            <Box display='flex' margin={"20px 40px"} gap={"20px"}>
              <Stack
                bgcolor={"white"}
                borderRadius={"4px"}
                border={"1px solid #e0e0e0"}
              >
                <CardProfile />
              </Stack>
              <Box
                bgcolor={"white"}
                padding={"36px"}
                borderRadius={"4px"}
                border={"1px solid #e0e0e0"}
                minHeight={"100vh"}
                minWidth={"100vh"}
              >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={numberTab} onChange={handleChange}>
                    <Tab label='Личные данные' {...a11yProps(0)} />
                    <Tab label='Контакты' {...a11yProps(1)} />
                    <Tab label='Избранное' {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <PagesProfile value={numberTab} index={0}>
                  <PersonalData />
                </PagesProfile>
                <PagesProfile value={numberTab} index={1}>
                  <Contacts />
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
