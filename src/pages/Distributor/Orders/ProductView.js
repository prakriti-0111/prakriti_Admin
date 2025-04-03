import React from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, FormControl, InputLabel, Select, MenuItem, Card, CardActionArea, CardContent, CardMedia, CircularProgress  } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { categoryList } from 'actions/distributor/category.actions';
import { subCategoryList } from 'actions/distributor/subCategory.actions';
import { cartStore, cartList } from 'actions/distributor/cart.actions';
import { productView } from 'actions/distributor/product.actions';
import {DISTRIBUTOR_CART_RESET} from '../../actionTypes/distributor/cart.types';
import {isEmpty, priceFormat, getValuesFromKey, convertToString, shortDescription} from 'src/helpers/helper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class ProductView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product: this.props.product,
            imageListIndex: 0,
            imageList: [],
            sizeIndex: 0,
            actionCalled: this.props.actionCalled,
            createSuccess: this.props.createSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,
        }

        this.videoFileRef = React.createRef();
    }

    componentDidMount(){
        this.props.actions.productView(this.props.params.id);
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
    
        if(props.product !== state.product){
          update.product = props.product;
        }
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        if(props.createSuccess !== state.createSuccess){
            update.createSuccess = props.createSuccess;
        }
        if(props.successMessage !== state.successMessage){
            update.successMessage = props.successMessage;
        }
        if(props.errorMessage !== state.errorMessage){
            update.errorMessage = props.errorMessage;
        }
        return update;
    }

    componentDidUpdate(prevProps){
        if (this.props.product != prevProps.product) {
            if(this.props.product){
                let product = this.props.product;
                let imageList = [];
                if(product.video){
                    imageList.push({type: 'video', path: product.video});
                }
                for(let i = 0; i < product.images.length; i++){
                    imageList.push({type: 'image', path: product.images[i].path});
                }
                this.setState({
                    imageList: imageList
                })
            }
        }
        if(this.state.actionCalled){
            if(this.state.createSuccess){
                this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                this.props.dispatch({
                    type: DISTRIBUTOR_CART_RESET
                });
                this.props.actions.cartList();
            }else{
                this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                this.props.dispatch({
                    type: DISTRIBUTOR_CART_RESET
                });
            }
        }
    }

    getImageContent = () => {
        const {imageList, imageListIndex} = this.state;
        if(!imageList.length) return null;
        if(imageList[imageListIndex].type == "video"){
            setTimeout(() => {
                if (this.videoFileRef) {
                    this.videoFileRef.current?.load();
                }
            }, 1000);
            return <video
            width="200"
            height="150"
            style={{ height: "143px", objectFit: "contain" }}
            loop
            controls
            key={imageList[imageListIndex].path}
            ref={this.videoFileRef}
            autoPlay
            muted
          >
            <source src={imageList[imageListIndex].path} />
          </video>
        }else{
            return <img src={imageList[imageListIndex].path} style={{maxWidth: '100%'}} />;
        }
    }

    setThumbsSwiper = (e) => {
        console.log(e)
    }

    handleAddToCart = () => {
        const {product} = this.state;
        let data = {
            product_id: product.id,
            type: product.type,
            stock_id: product.type == "material" ? product.stock.stock_id : product.sizes[this.state.sizeIndex].stock_id,
            materials: product.type == "material" ? product.stock.materials : product.sizes[this.state.sizeIndex].materials,
            size_id: product.type == "material" ? '' : product.sizes[this.state.sizeIndex].size_id
        }
        this.props.actions.cartStore(data)
    }

    handleSizeChange = (e) => {
        this.setState({
            sizeIndex: e.target.value
        })
    }

    handleBack = () => {
        this.props.navigate('/distributor/orders/create');
    }

    render() {
        const {product, imageList} = this.state;
        return (
            <MainCard title="">
                <div>
                <Button variant="text" onClick={this.handleBack}><ArrowBackIcon /> Back</Button>
                    {/*{
                        product ? 
                        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                            <Grid container spacing={2} className='tax-input loans_view p_view '>
                                <Grid item xs={4}>
                                    <div>
                                        {this.getImageContent()}
                                    </div>
                                    <div style={{maxHeight: '60px'}}>
                                        <Swiper
                                            onSwiper={this.setThumbsSwiper}
                                            loop={true}
                                            spaceBetween={10}
                                            slidesPerView={4}
                                            navigation={true}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper"
                                        >
                                            {
                                                imageList.map((item,index)=>(
                                                    <SwiperSlide key={index}>
                                                        <img src={item.path} />
                                                    </SwiperSlide>

                                                ))
                                            }

                                        </Swiper>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>

                                </Grid>
                            </Grid>
                        </Box>
                        : null
                    }*/}
                    {
                        product ? 
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                            <div className='order_list_image'>
                            <img src={product.images[0].path} alt='' />
                            <div className='price_breakup'>
                                <h4>Price Breakup</h4>
                                <ul>
                                    {
                                        product.type == "material"?
                                        <>
                                            {
                                                product.stock.materials.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <li>{item.name}</li>
                                                        <li>{item.price_display}</li>
                                                    </React.Fragment>
                                                ))
                                            }
                                            <li>Making Charge</li>
                                            <li>{product.stock.making_charge_display}</li>
                                        </>
                                        :
                                        <>
                                            {
                                                product.sizes[this.state.sizeIndex].materials.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <li>{item.name}</li>
                                                        <li>{item.price_display}</li>
                                                    </React.Fragment>
                                                ))
                                            }
                                            <li>Making Charge</li>
                                            <li>{product.sizes[this.state.sizeIndex].making_charge_display}</li>
                                            
                                        </>
                                    }
                                </ul>
                                <hr />
                                <ul>
                                {
                                    product.type == "material" ?
                                    <>
                                        <li>Total</li>
                                        <li>{product.stock.total_price_display}</li>
                                    </>
                                    :
                                    <>
                                        <li>Total</li>
                                        <li>{product.sizes[this.state.sizeIndex].total_price_display}</li>
                                    </>
                                }
                                </ul>
                            </div>
                            <div className='product_details price_breakup'>
                                <h4>Product Details</h4>
                                <ul>
                                    <li>Product Code</li>
                                    <li>{product.product_code}</li>
                                    <li>Product Weight</li>
                                    <li>{product.type == "material" ? product.stock.weight : product.sizes[this.state.sizeIndex].weight} gram</li>
                                </ul>
                                <hr />
                                {
                                    product.type == "material"?
                                    <>
                                        {
                                            product.stock.materials.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <h3 style={{padding: '15px', margin: 0, paddingBottom: 0}}>{item.name}</h3>
                                                    <ul>
                                                        <li>Weight</li>
                                                        <li>{item.weight} {item.unit_name}</li>
                                                        {
                                                            !isEmpty(item.quantity) ? 
                                                            <>
                                                                <li>Total No of {item.name}</li>
                                                                <li>{item.quantity}</li>
                                                            </>
                                                            : null
                                                        }
                                                    </ul>
                                                </React.Fragment>
                                            ))
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            product.sizes[this.state.sizeIndex].materials.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <h3 style={{padding: '15px', margin: 0, paddingBottom: 0}}>{item.name}</h3>
                                                    <ul>
                                                        <li>Weight</li>
                                                        <li>{item.weight} {item.unit_name}</li>
                                                        {
                                                            !isEmpty(item.quantity) ? 
                                                            <>
                                                                <li>Total No of {item.name}</li>
                                                                <li>{item.quantity}</li>
                                                            </>
                                                            : null
                                                        }
                                                    </ul>
                                                </React.Fragment>
                                            ))
                                        }
                                        
                                    </>
                                }
                            </div>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div className='order_list_content'>
                            <h1>{product.name}</h1>
                            <div className="ring-price"><span> {product.type == "material" ? product.stock.total_price_display : product.sizes[this.state.sizeIndex].total_price_display} </span></div>
                            {
                                product.type != "material" ?
                                <div>
                                    <FormControl sx={{mt: 3, mb: 1}}>
                                        <InputLabel>Size</InputLabel>
                                        <Select
                                            value={this.state.sizeIndex}
                                            label="Size"
                                            onChange={this.handleSizeChange}
                                            defaultValue=""
                                        >
                                            {
                                                product.sizes.map((item, index) => (
                                                    <MenuItem value={index} key={index}>{item.size_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                : null
                            }
                            {
                                product.type == "material"?
                                <>
                                    {
                                        product.stock.materials.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <div>
                                                    <ul>
                                                        <h2>{item.name}</h2>
                                                        <li>{item.purity_name}</li>
                                                    </ul>
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    {
                                        product.sizes[this.state.sizeIndex].materials.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <div>
                                                    <ul>
                                                        <h2>{item.name}</h2>
                                                        <li>{item.purity_name}</li>
                                                    </ul>
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                    
                                </>
                            }
                            <Button variant='primary' onClick={this.handleAddToCart}>ADD TO CART</Button>
                            </div>
                            </Grid>
                        </Grid>
                        :
                        <Grid container justifyContent="center">
                            <CircularProgress />
                        </Grid>
                    }
                </div>
            </MainCard>
        );
    }
}

const mapStateToProps = (state) => ({
    product: state.distributor.product.product,
    actionCalled: state.distributor.cart.actionCalled,
    createSuccess: state.distributor.cart.createSuccess,
    successMessage: state.distributor.cart.successMessage,
    errorMessage: state.distributor.cart.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    productView,
    cartStore,
    cartList
    }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductView)));
