import PropTypes from 'prop-types';

import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const theme = useTheme();

    // menu list collapse & items
    const getMenus = () => {
        let menus = [];
        for(let menu of item.children){
            if(!('permission' in menu) || ('permission' in menu && menu.permission)){
                switch (menu.type) {
                    case 'collapse':
                        menus.push(<NavCollapse key={menu.id} menu={menu} level={1} />);
                        break;
                    case 'item':
                        menus.push(<NavItem key={menu.id} item={menu} level={1} />);
                        break;
                    default:
                        menus.push(
                            <Typography key={menu.id} variant="h6" color="error" align="center">
                                Menu Items Error
                            </Typography>
                        );
                        break;
                }
            }
        }
        return getArrayComponent(menus);
    }

    const getArrayComponent = (components) => {
        return <>
          {
            components.map((component, index) => (
              <React.Fragment key={index}>
                { component }
              </React.Fragment>
            ))
          }
        </>
    }

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {getMenus()}
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
