import { FC, ComponentType } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../const/const';

type Props = {
  onlyUnAuth?: boolean;
  component: ComponentType; // Changed from ReactNode to ComponentType
};

const Protected: FC<Props> = ({ onlyUnAuth = false, component: Component }) => {
  // Renamed component to Component for clarity
  const user = useAppSelector((store) => store.auth.isAuthenticated);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // if (!onlyUnAuth && !user) {
  //   // Роут для авторизованных, но пользователь не авторизован
  //   // Перенаправляем на страницу логина
  //   return <Navigate to={AppRoute.Login} state={{ from: location }} />;
  // }

  return <Component />; // Render the component as a JSX element
};

export const OnlyAuth = Protected;

export const OnlyUnAuth: FC<Props> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
