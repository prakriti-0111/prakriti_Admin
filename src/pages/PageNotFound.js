import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoleName, getUserDashboardRoute, isEmpty } from 'src/helpers/helper';

const PageNotFound = () => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h1" style={{ color: 'black', fontSize: '50px' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'black', fontSize: '20px' }}>
                The page you're looking for doesn't exist.
            </Typography>
            <Link href={!isEmpty(auth) ? (getUserDashboardRoute(getRoleName(auth)) + '/dashboard') : '/'} underline="hover">
                Back Home
            </Link>
        </Box>
    );
}

export default PageNotFound;