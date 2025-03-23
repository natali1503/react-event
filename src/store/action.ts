import { createAction } from '@reduxjs/toolkit';

import { APP_ROUTE } from '../const/const';

export const redirectToRoute = createAction<APP_ROUTE>('game/redirectToRoute');
