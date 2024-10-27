import FundraisingCard from '../../components/FundraisingCard';
import FundraisingForm from '../../components/FundraisingForm';
import { Grid } from '@mui/material';

const UserInfoID = () => {

    return (
        <Grid container spacing={2}>
          <Grid item xs={8}> {/* 1/3 ширины для FundraisingForm */}
            <FundraisingForm />
          </Grid>
          <Grid item xs={4}> {/* 2/3 ширины для FundraisingCard */}
            <FundraisingCard />
          </Grid>
        </Grid>
      );
};

export default UserInfoID;