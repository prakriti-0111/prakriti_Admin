import React, {useState, useEffect} from 'react';
import {Box, TextField, Button, Grid, Link, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, CircularProgress, ToggleButton, FormLabel, ImageList, ImageListItem, InputAdornment, Backdrop, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography  } from '@mui/material';
import { rolePermission, rolePermissionUpdate} from 'actions/superadmin/role.actions';
import { hasPermission } from 'src/helpers/helper';
import _ from 'lodash';
let permissionsArr = require('src/utils/permissions.json');

const RolePermissionForm = (props) => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPermission(props.role_id);
    }, [props.role_id])

    const loadPermission = async(role_id) => {
        let res = await rolePermission(role_id);
        if(res.data.success){
            setPermissions(res.data.data.items);
        }
        setLoading(false);
    }

    const permissionChange = async(e, name, key) => {
        let _permissions = [...permissions];
        let index =  _.findIndex(_permissions, (item) => item.name == name);
        let newP = {};
        if(index !== -1){
            _permissions[index][key] = e.target.checked ? true : false;
            newP = _permissions[index];
        }else{
            newP = {
                name: name,
                view: false,
                add: false,
                edit: false,
                delete: false,
                [key]: e.target.checked ? true : false
            };
            _permissions.push(newP);
        }
        //setLoading(true);
        let res = await rolePermissionUpdate({
            role_id: props.role_id,
            ...newP
        });
        if(res.data.success){
            setPermissions(_permissions);
            setLoading(false);
        }else{
            setLoading(false);
        }

        
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                <Grid container spacing={2} className='tax-input loans_view p_view '>
                    <Grid item xs={12}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='ratn-table-header'>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>List</TableCell>
                                        <TableCell>View</TableCell>
                                        <TableCell>Add</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        permissionsArr.map((item, key) => (
                                            <React.Fragment key={key}>
                                                <TableRow>
                                                    <TableCell colSpan={6}>
                                                        <Typography variant="h3" gutterBottom>
                                                            {item.title}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                                {
                                                    item.permissions.map((pitem, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{pitem.title}</TableCell>
                                                            <TableCell>
                                                                <Checkbox checked={hasPermission(permissions, pitem.name, 'list', false)} onChange={(e) => permissionChange(e, pitem.name, 'list')} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Checkbox checked={hasPermission(permissions, pitem.name, 'view', false)} onChange={(e) => permissionChange(e, pitem.name, 'view')} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Checkbox checked={hasPermission(permissions, pitem.name, 'add', false)} onChange={(e) => permissionChange(e, pitem.name, 'add')} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Checkbox checked={hasPermission(permissions, pitem.name, 'edit', false)} onChange={(e) => permissionChange(e, pitem.name, 'edit')} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Checkbox checked={hasPermission(permissions, pitem.name, 'delete', false)} onChange={(e) => permissionChange(e, pitem.name, 'delete')} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default RolePermissionForm;