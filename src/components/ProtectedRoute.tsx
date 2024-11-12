import { FC, ReactNode } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../const/const';

type Props = {
  component: ReactNode; // Changed from ReactNode to ComponentType
};

export const ProtectedRoute: FC<Props> = ({ component }) => {
  // Renamed component to Component for clarity
  const user = useAppSelector((store) => store.auth.isAuthenticated);
  const location = useLocation();

  console.log('ProtectedRoute render', user);
  // if (user) {
  //   const { from } = location.state || { from: { pathname: '/' } };
  //   return <Navigate to={from} />;
  // }

  if (!user) {
    // Роут для авторизованных, но пользователь не авторизован
    // Перенаправляем на страницу логина
    return <Navigate to={AppRoute.Login} state={{ from: location }} />;
  }

  // Иначе возвращаем дочерний компонент
  return component;
};
