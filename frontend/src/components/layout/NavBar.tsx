import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Book as BookIcon,
  Create,
  List,
  Man,
  Update,
} from '@mui/icons-material';
import { Endpoints } from 'src/constants';
import { NavLink, useLocation } from 'react-router-dom';
import { Nullable } from 'src/types/globalTypes';

export const labelIconPaths = [
  { key: 0, label: 'Movie List', to: Endpoints.MOVIES, icon: <BookIcon /> },
  {
    key: 1,
    label: 'Movie Create',
    to: Endpoints.SINGLE_MOVIE_CREATE,
    icon: <Create />,
  },
  { key: 2, label: 'Genre List', to: Endpoints.GENRES, icon: <List /> },
  {
    key: 3,
    label: 'Genre Create',
    to: Endpoints.SINGLE_GENRE_CREATE,
    icon: <Create />,
  },
  { key: 4, label: 'Director List', to: Endpoints.DIRECTORS, icon: <Man /> },
  {
    key: 5,
    label: 'Director Create',
    to: Endpoints.SINGLE_DIRECTOR_CREATE,
    icon: <Create />,
  },
  {
    key: 6,
    label: 'Me',
    to: Endpoints.USER_HIMSELF,
    icon: <Update />,
  },
  {
    key: 7,
    label: 'My Movies',
    to: Endpoints.USER_MOVIES,
    icon: <List />,
  },
];

export const NavBar = () => {
  const [navValue, setNavValue] = useState<Nullable<number>>(null);
  const location = useLocation();

  useEffect(() => {
    if (!navValue || location.pathname !== labelIconPaths[navValue].to) {
      const newRedirectKey = labelIconPaths.find((LIP) => {
        const isUpdateRoute = (location.pathname.match(/\//g) || []).length > 1;

        const locationRoute = location.pathname.substr(
          0,
          location.pathname.lastIndexOf('/'),
        );

        return isUpdateRoute
          ? LIP.to === `${locationRoute}/:id`
          : LIP.to === location.pathname;
      })?.key;
      if (newRedirectKey !== undefined) setNavValue(newRedirectKey ?? null);
    }
  }, [location.pathname, navValue]);

  return (
    <AppBar position='fixed' color='primary' style={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(event, newValue) => {
          setNavValue(newValue);
        }}
      >
        {labelIconPaths.map((LIP) => (
          <BottomNavigationAction component={NavLink} {...LIP} />
        ))}
      </BottomNavigation>
    </AppBar>
  );
};
