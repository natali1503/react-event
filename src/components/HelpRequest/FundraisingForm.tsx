import { Box, Paper, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { formatDate, formatString } from '../../helper-functions/helper-functions';
import { HelpRequest } from '../../types/HelpRequest';
import { getFavouriteRequestsIDs } from '../../store/user-favourites/favourites-selectors';
import { useBreakpointOverlap } from '../../hooks/useBreakpointOverlap';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { useAppSelector } from '../../hooks/useAppSelector';

import DataCell from './DataCell';
import VerifiedOrganization from './VerifiedOrganization';
import ActionsSchedule from './ActionsSchedule';

interface IFundraisingForm {
  helpRequest: HelpRequest;
}

const FundraisingForm: FC<IFundraisingForm> = ({ helpRequest }) => {
  const { title, organization, description, goalDescription, actionsSchedule, endingDate, location, contacts } =
    helpRequest;
  const userFavouritesIDs = useAppSelector(getFavouriteRequestsIDs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isBreakpointOverlap } = useBreakpointOverlap({ breakpointOverlapValue: 700 });

  return (
    <Paper sx={{ padding: '1.5rem' }}>
      <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant='h5'>{formatString(title)}</Typography>
          <FavouriteButton
            format={isBreakpointOverlap ? 'vertical' : 'horizontal'}
            helpRequest={helpRequest}
            favouriteRequestsIDs={userFavouritesIDs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Box>

        <Stack spacing={2} sx={{ maxWidth: '550px' }}>
          <Box display={'flex'} flexDirection={'column'}>
            <DataCell title='Организация' data={[{ description: organization.title }]} typeDirectionExternal='column' />
            <VerifiedOrganization isVerified={organization.isVerified ?? false} />
          </Box>

          <DataCell title='Кому мы помогаем' data={[{ description }]} typeDirectionExternal='column' />
          <DataCell title='Цель сбора' data={[{ description: goalDescription }]} typeDirectionExternal='column' />
          <ActionsSchedule actionsSchedule={actionsSchedule} />
          <DataCell
            title='Завершение'
            data={[{ description: formatDate(endingDate) }]}
            typeDirectionExternal='column'
          />
          <DataCell
            title='Локация'
            data={[
              { subtitle: 'Область: ', description: location?.district },
              { subtitle: 'Насленный пункт: ', description: location?.city },
            ]}
            typeDirectionExternal='column'
            typeDirectionInternal='row'
          />
          <DataCell
            title='Контакты'
            data={[
              { subtitle: 'Телефон', description: contacts?.phone },
              { subtitle: 'E-mail', description: contacts?.email },
              { subtitle: 'Сайт', description: contacts?.website },
            ]}
            typeDirectionExternal={isBreakpointOverlap ? 'column' : 'row'}
            typeDirectionInternal='column'
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default FundraisingForm;
