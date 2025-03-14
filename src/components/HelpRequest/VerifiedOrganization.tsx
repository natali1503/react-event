import { Box, Typography } from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { FC } from 'react';

interface IVerifiedOrganization {
  isVerified: boolean;
}

const VerifiedOrganization: FC<IVerifiedOrganization> = ({ isVerified }) => {
  return (
    <Box display={'flex'} gap={'4px'} flexDirection={'row'} alignItems={'center'}>
      <VerifiedRoundedIcon
        fontSize='small'
        color='primary'
        sx={{ color: isVerified ? 'primary' : 'action.disabled' }}
      />
      <Typography variant='caption'>{isVerified ? 'Организация проверена' : 'Организация не проверена'}</Typography>
    </Box>
  );
};

export default VerifiedOrganization;
