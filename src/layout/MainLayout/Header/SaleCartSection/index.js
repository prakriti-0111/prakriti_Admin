import { useState, useRef, useEffect, Component, React } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase
} from '@mui/material';
import { IconShoppingCart } from '@tabler/icons';
import { bindActionCreators } from 'redux';
import { useSelector, connect } from 'react-redux';
import withRouter from 'src/helpers/withRouter';
import { useNavigate } from 'react-router-dom';
import { saleCartList as adminSaleCartList } from 'actions/admin/saleCart.actions';
import { saleCartList as distributorSaleCartList } from 'actions/distributor/saleCart.actions';
import { cartList as superAdminCartList } from 'actions/superadmin/cart.actions';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

class SaleCartSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            distributorCartTotal: this.props.distributorCartTotal,
            adminCartTotal: this.props.adminCartTotal,
            superAdminCartTotal: this.props.superAdminCartTotal
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};

        if (props.user !== state.user) {
            update.user = props.user;
        }
        if (props.distributorCartTotal !== state.distributorCartTotal) {
            update.distributorCartTotal = props.distributorCartTotal;
        }
        if (props.adminCartTotal !== state.adminCartTotal) {
            update.adminCartTotal = props.adminCartTotal;
        }
        if (props.superAdminCartTotal !== state.superAdminCartTotal) {
            update.superAdminCartTotal = props.superAdminCartTotal;
        }

        return update;
    }

    componentDidMount() {
        if (this.state.user) {
            /*switch (this.state.user.role_name) {
                case 'Distributor':
                    this.props.actions.distributorSaleCartList();
                    break;

                case 'Admin':
                    this.props.actions.adminSaleCartList();
                    break;

                default:
                    break;
            }*/
            this.props.actions.superAdminCartList();
        }
    }

    componentDidUpdate() {

    }

    CartSectionView = () => {
        const theme = useTheme();
        const navigate = useNavigate();
        const [open, setOpen] = useState(false);
        /**
         * anchorRef is used on different componets and specifying one type leads to other components throwing an error
         * */
        const anchorRef = useRef(null);

        const handleClick = () => {
            switch (this.state.user.role_name) {
                case 'Distributor':
                    navigate('/distributor/sales/create');
                    break;
                case 'Admin':
                    navigate('/admin/sales/create');
                    break;
                case 'Super Admin':
                    navigate('/super-admin/sales/create');
                    break;
                case 'Sales Executive':
                    navigate('/sales-executive/sales/create');
                    break;
                case 'Manager':
                        navigate('/employee/sales/create');
                        break;
                default:
                    break;
            }
        }

        let totalCart = 0;
        if (this.state.user) {
            /*switch (this.state.user.role_name) {
                case 'Distributor':
                    totalCart = this.state.distributorCartTotal > 9 ? (this.state.distributorCartTotal + '+') : this.state.distributorCartTotal;
                    break;

                case 'Admin':
                    totalCart = this.state.adminCartTotal > 9 ? (this.state.adminCartTotal + '+') : this.state.adminCartTotal;
                    break;

                default:
                    break;
            }*/
            totalCart = this.state.superAdminCartTotal > 9 ? (this.state.superAdminCartTotal + '+') : this.state.superAdminCartTotal;
        }

        return (
            <>
                <Box
                    sx={{
                        ml: 2,
                        mr: 3,
                        [theme.breakpoints.down('md')]: {
                            mr: 2
                        }
                    }}
                    className="cart_header_sec"
                >
                    <ButtonBase sx={{ borderRadius: '12px' }}>
                        <Avatar
                            className='header-avatar'
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&[aria-controls="menu-list-grow"],&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            color="inherit"
                        >
                            <div className='c-heading'>
                                <Badge badgeContent={totalCart} color="secondary">
                                    <IconShoppingCart stroke={1.5} size="1.3rem" />

                                </Badge>
                                <div className='cart-heading'>Sale Cart</div>
                            </div>

                        </Avatar>
                    </ButtonBase>
                </Box>
            </>
        );
    };

    render() {
        return (
            <this.CartSectionView />
        )
    }

};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    distributorCartTotal: state.distributor.saleCart.total,
    adminCartTotal: state.admin.saleCart.total,
    superAdminCartTotal: state.superadmin.cart.total
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ distributorSaleCartList, adminSaleCartList, superAdminCartList }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleCartSection));
