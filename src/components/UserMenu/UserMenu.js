import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
import authOperations from 'redux/auth/auth-operations';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import {
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import useRouteMatch from 'useHooks/useRouteMatch';

export default function UserMenu() {
  const dispatch = useDispatch();
  const userName = useSelector(authSelectors.getUsername);
  const isLoggerIn = useSelector(authSelectors.getIsLoggedIn);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const routeMatch = useRouteMatch(['/register', '/login']);

  const currentTab = routeMatch ? routeMatch?.pattern?.path : false;

  useEffect(() => {
    setAnchorEl(null);
  }, [isLoggerIn]);

  return (
    <>
      {isLoggerIn ? (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
            color="inherit"
          >
            <AccountCircle />
            <Typography sx={{ ml: '5px' }}>{userName}</Typography>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => dispatch(authOperations.logOut())}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Tabs
          value={currentTab}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="full width tabs example"
        >
          <Tab
            label={
              <Typography variant="h6" component="span">
                Register
              </Typography>
            }
            value="/register"
            to="/register"
            component={Link}
          />

          <Tab
            label={
              <Typography variant="h6" component="span">
                Log in
              </Typography>
            }
            value="/login"
            to="/login"
            component={Link}
          />
        </Tabs>
      )}
    </>
  );
}
