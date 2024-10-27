import { FC, ComponentType } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../const/const';

type Props = {
  onlyUnAuth?: boolean;
  component: ComponentType;
};

const Protected: FC<Props> = ({ onlyUnAuth = false, component: Component }) => {
  const user = useAppSelector((store) => store.auth.isAuthenticated); // может сразу пользователя просить
  const location = useLocation();

  if (onlyUnAuth && user) {
    // Роут только для неавторизованных, но пользователь авторизован
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // Роут для авторизованных, но пользователь не авторизован
    // Перенаправляем на страницу логина
    return <Navigate to={AppRoute.Login} state={{ from: location }} />;
  }

  return <Component />;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth: React.FC<Props> = ({ component }: Props) => (
  <Protected onlyUnAuth={true} component={component} />
);
