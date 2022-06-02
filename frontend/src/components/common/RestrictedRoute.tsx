import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from 'src/utils/getUserData';
import { Endpoints } from '../../constants';

interface RestrictedRouteProps {
  component: React.ComponentType;
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  component: RouteComponent,
}) => {
  return getToken() ? (
    <RouteComponent />
  ) : (
    <Navigate to={Endpoints.AUTH} replace />
  );
};
