import { createAction } from '@reduxjs/toolkit';

import { APP_ROUTE } from '../constants/globalConsts';

export const redirectToRoute = createAction<APP_ROUTE>('game/redirectToRoute'); // TODO: доделать или удалить файл
