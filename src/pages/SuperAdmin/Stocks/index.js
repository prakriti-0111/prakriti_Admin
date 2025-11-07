import { React, Component } from "react";
import { matchRoutes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  Select,
  Stack,
  InputLabel,
  Box,
  Typography,
  FormControl,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import {
  stocksList,
  getPriceByCategory,
  getCartItemById,
  updateStockImage,
} from "actions/superadmin/stocks.actions";
import { subCategoryList } from "actions/superadmin/subCategory.actions";
import { cartStore, cartList } from "actions/superadmin/cart.actions";
import { Table, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DataTable from "src/utils/DataTable";
import { withSnackbar } from "notistack";
import DiamondIcon from "@mui/icons-material/Diamond";
import GroupIcon from "@mui/icons-material/Group";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DeleteIcon from "@mui/icons-material/Delete";
import { SUPERADMIN_CART_RESET } from "../../../actionTypes/superadmin/cart.types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { categoryList } from "actions/superadmin/category.actions";
import { materialList } from "actions/superadmin/material.actions";
import { displayAmount } from "src/helpers/helper";
import { FreeBreakfastOutlined } from "@mui/icons-material";
import { unitList } from "actions/superadmin/unit.actions";
import { sizeList } from "actions/superadmin/size.actions";
import { convertUnitToGram, weightFormat, toBase64, isMainSuperAdmin } from "src/helpers/helper";
import _ from "lodash";
import jsQR from "jsqr";
import extractPdfData from "src/helpers/scanPdf";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

class StockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: "",
        sub_category_id: "",
        search: "",
        certificate_no: "",
        qty: "",
        unit: "",
        pcode: "",
        size: "",
        price: "",
        all: 0,
        by_specific: this.props.query.get("by_specific") ?? "",
        own_distributor: this.props.query.get("own_distributor") ?? "",
        own_admin: this.props.query.get("own_admin") ?? "",
        own_se: this.props.query.get("own_se") ?? "",
        total_avl_stock: this.props.query.get("total_avl_stock") ?? "",
        manager: this.props.query.get("manager") ?? "",
      },
      cart_actionCalled: this.props.cart_actionCalled,
      cart_createSuccess: this.props.cart_createSuccess,
      cart_deleteSuccess: this.props.cart_deleteSuccess,
      cart_successMessage: this.props.cart_successMessage,
      cart_errorMessage: this.props.cart_errorMessage,
      cartDialog: false,
      quantity: "",
      unit_id: "",
      weight: "",
      quantity_error: false,
      weight_error: false,
      unit_error: false,
      cart_stock: null,
      categories: this.props.categories,
      materialList: this.props.materialList,
      sub_categories: this.props.sub_categories,
      price_by_categories: [],
      unitList: [],
      sizeList: [],
      scannedCertificates: [], // Array to store scanned certificate numbers
      scanDialogOpen: false, // State to control the scan modal
      qrScannerOpen: false,
      qrScanner: null,
      qrScannerError: null,
      certificateList: [], // Array to store certificate numbers
      manualCertificate: "",
      processingCertificate: false,
      pendingCertificateNo: null, // Track certificate to process after search
      searchingCertificate: false, // Track if a certificate search is in progress
      processingCartItems: new Set(), // Track which specific items are being added to cart
      imageUpdateDialogOpen: false, // State to control image update dialog
      selectedStockForImageUpdate: null, // Store the stock item for image update
      imageFile: null, // Store the selected image file
      updatingImage: false, // Track if image is being updated
      // View-only image dialog for non-superadmin users
      imageViewDialogOpen: false,
      imageViewPath: "",
    };

    this.columns = [
      {
        name: "image",
        display_name: "Image",
        isImage: true,
      },
      {
        name: "name",
        display_name: "Product Name",
      },
      {
        name: "certificate_no",
        display_name: "Certificate No",
        width: "120px",
      },
      {
        name: "total_weight_display",
        display_name: "Total Wt.",
        width: "90px",
      },
      {
        name: "stock_material_display",
        display_name: "Materials Name",
        width: "165px",
      },
      {
        name: "purity_display",
        display_name: "Purity Name",
        width: "165px",
      },
      {
        name: "weight_display",
        display_name: "Qty",
      },
      {
        name: "unit_display",
        display_name: "Unit",
      },
      {
        name: "product_code",
        display_name: "P Code",
      },
      {
        name: "size_name",
        display_name: "Size",
      },
      {
        name: "mrp_display",
        display_name: "Price",
      },
      {
        name: "tax_prize",
        display_name: "Tax Price",
      },
      {
        name: "stock_user_name",
        display_name: "Avl By",
      },
    ];

    // Initialize tableActions as empty - will be populated dynamically
    this.tableActions = [];

    this.addToCartProcess = false;
  }

  handleCartAdded = (row) => {
    console.log("Item already in cart! You can not add this item.");
    this.props.enqueueSnackbar(
        "Item already in cart! You can not add this item.",
        { variant: "error" }
    );
  };

  // Generate table actions dynamically based on current state and specific row
  getTableActions = (row = null) => {
    const isProcessing = row ? this.state.processingCartItems.has(`${row.id}_${row.product_id}`) : false;
    
    return [
      {
        label: "View",
        onClick: this.handleView,
        color: "primary",
      },
      {
        label: isProcessing ? "..." : "+", // Show dots when this specific item is loading
        onClick: this.handleActionAddToCart,
        color: isProcessing ? "secondary" : "primary", // Change color when loading
        show: this.props.query.get("by_specific") ? false : true,
        conditions: [
          {
            key: "can_add_cart",
            value: true,
          },
        ],
        loading: isProcessing, // Add loading state for this specific item
        disabled: isProcessing || this.state.processingCertificate, // Disable when processing
        icon: false, // Use text instead of icon for better loading visibility
      },
      {
        label: "green_tick",
        onClick: this.handleCartAdded,
        color: "primary",
        show: this.props.query.get("by_specific") ? false : true,
        conditions: [
          {
            key: "can_add_cart",
            value: false,
          },
        ],
      },
    ];
  };

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({ all: 1 });
    this.props.actions.unitList({ all: 1 });
    this.props.actions.sizeList({ all: 1 });
    this.loadPriceByCategory();
  }

  loadPriceByCategory = async () => {
    let res = await getPriceByCategory({
      by_specific: this.state.queryParams.by_specific,
      own_distributor: this.state.queryParams.own_distributor,
      own_admin: this.state.queryParams.own_admin,
      own_se: this.state.queryParams.own_se,
      total_avl_stock: this.state.queryParams.total_avl_stock,
      manager: this.state.queryParams.manager,
    });
    if (res.data.success) {
      this.setState({
        price_by_categories: res.data.data,
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }

    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }

    if (props.deleteSuccess !== state.deleteSuccess) {
      update.deleteSuccess = props.deleteSuccess;
    }
    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }
    if (props.cart_actionCalled !== state.cart_actionCalled) {
      update.cart_actionCalled = props.cart_actionCalled;
    }
    if (props.cart_createSuccess !== state.cart_createSuccess) {
      update.cart_createSuccess = props.cart_createSuccess;
    }
    if (props.cart_deleteSuccess !== state.cart_deleteSuccess) {
      update.cart_deleteSuccess = props.cart_deleteSuccess;
    }
    if (props.cart_successMessage !== state.cart_successMessage) {
      update.cart_successMessage = props.cart_successMessage;
    }
    if (props.cart_errorMessage !== state.cart_errorMessage) {
      update.cart_errorMessage = props.cart_errorMessage;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.materialList !== state.materialList) {
      update.materialList = props.materialList;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }
    if (props.unitList !== state.unitList) {
      update.unitList = props.unitList;
    }

    if (props.sizeList !== state.sizeList) {
      update.sizeList = props.sizeList;
    }

    return update;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cart_actionCalled) {
      if (this.state.cart_createSuccess) {
        console.log(this.state.cart_successMessage);
        this.props.enqueueSnackbar(this.state.cart_successMessage, {
          variant: "success",
        });
        this.setState({
          quantity: "",
          unit_id: "",
          weight: "",
        });
        this.props.actions.cartList();
        this.loadListData();
      } else if (this.state.cart_errorMessage) {
        console.log(this.state.cart_errorMessage);
        this.props.enqueueSnackbar(this.state.cart_errorMessage, {
          variant: "error",
        });
      }
      this.setState({
        cartDialog: false,
      });
      this.addToCartProcess = false;
      this.props.dispatch({
        type: SUPERADMIN_CART_RESET,
      });
    }

    // Check for certificate match after items are updated
    // Only auto-add to cart if this is a certificate-specific search (not a regular product search)
    if (prevProps.items !== this.props.items && this.state.queryParams.search && 
        (this.state.processingCertificate || this.state.searchingCertificate || this.state.pendingCertificateNo)) {
      const searchCert = this.state.queryParams.search;
      console.log("Search results updated, checking for certificate:", searchCert);
      
      if (this.props.items && this.props.items.length > 0) {
        // Find exact certificate match
        const exactMatch = this.props.items.find(item => {
          const normalizedItemCert = String(item.certificate_no).trim().toUpperCase();
          const normalizedSearchCert = String(searchCert).trim().toUpperCase();
          console.log(`Comparing certificates: ${normalizedItemCert} vs ${normalizedSearchCert}`);
          return normalizedItemCert === normalizedSearchCert;
        });

        if (exactMatch) {
          console.log("Found exact match:", exactMatch);
          // Only show notification if item can be added to cart
          if (exactMatch.can_add_cart) {
            this.handleAddToCart(exactMatch);
          } else {
            this.props.enqueueSnackbar(`Certificate ${searchCert} found but cannot be added to cart`, {
              variant: "warning"
            });
            // Reset all states when item cannot be added to cart
            this.setState({
              processingCertificate: false,
              manualCertificate: "",
              pendingCertificateNo: null,
              searchingCertificate: false,
              queryParams: {
                ...this.state.queryParams,
                search: "", // Clear search to show all items
              }
            }, () => {
              this.loadListData(); // Refresh the list
              // Focus on certificate input after state update
              setTimeout(() => {
                const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
                if (certificateInput) {
                  certificateInput.focus();
                }
              }, 100);
            });
          }
        } else {
          console.log(`[WARNING] Certificate ${searchCert} not found in search results`);
          this.props.enqueueSnackbar(`Certificate ${searchCert} not found in search results`, {
            variant: "warning"
          });
          // Reset all states when certificate is not found
          this.setState({
            processingCertificate: false,
            manualCertificate: "",
            pendingCertificateNo: null,
            searchingCertificate: false,
            queryParams: {
              ...this.state.queryParams,
              search: "", // Clear search to show all items
            }
          }, () => {
            this.loadListData(); // Refresh the list
            // Focus on certificate input after state update
            setTimeout(() => {
              const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
              if (certificateInput) {
                certificateInput.focus();
              }
            }, 100);
          });
        }
      } else {
        this.props.enqueueSnackbar(`No items found for certificate ${searchCert}`, {
          variant: "warning"
        });
        // Reset all states when no items are found
        this.setState({
          processingCertificate: false,
          manualCertificate: "",
          pendingCertificateNo: null,
          searchingCertificate: false,
          queryParams: {
            ...this.state.queryParams,
            search: "", // Clear search to show all items
          }
        }, () => {
          this.loadListData(); // Refresh the list
          // Focus on certificate input after state update
          setTimeout(() => {
            const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
            if (certificateInput) {
              certificateInput.focus();
            }
          }, 100);
        });
      }
    }
  }

  loadListData = () => {
    console.log("loadListData", this.state.queryParams);
    this.props.actions.stocksList(this.state.queryParams);
  };

  handleView = (row) => {
    if (this.state.queryParams.total_avl_stock == 1) {
      window
          .open(`${process.env.FRONT_BASE_URL}products/${row.slug}`, "_blank")
          .focus();
    } else {
      this.props.navigate("view/" + row.id);
    }
  };

  handleImageClick = (imageUrl, row) => {
    // Super Admin can update image; others can only view
    if (isMainSuperAdmin() && row) {
      this.setState({
        imageUpdateDialogOpen: true,
        selectedStockForImageUpdate: row,
        imageFile: null,
      });
    } else {
      this.setState({
        imageViewDialogOpen: true,
        imageViewPath: imageUrl || (row ? (row.current_image || row.image) : ""),
      });
    }
  };

  handleImageViewDialogClose = () => {
    this.setState({
      imageViewDialogOpen: false,
      imageViewPath: "",
    });
  };

  handleImageUpdateDialogClose = () => {
    this.setState({
      imageUpdateDialogOpen: false,
      selectedStockForImageUpdate: null,
      imageFile: null,
    });
    // Reset file input - check if ref exists and has current property
    // Use setTimeout to ensure the ref is available after state update
    setTimeout(() => {
      if (this.imageFileInputRef && this.imageFileInputRef.current) {
        this.imageFileInputRef.current.value = '';
      }
    }, 0);
  };

  handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.props.enqueueSnackbar("Please select a valid image file", {
          variant: "error",
        });
        return;
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.props.enqueueSnackbar("Image size should be less than 5MB", {
          variant: "error",
        });
        return;
      }
      this.setState({ imageFile: file });
    }
  };

  handleUpdateImage = async () => {
    const { selectedStockForImageUpdate, imageFile } = this.state;
    
    if (!imageFile) {
      this.props.enqueueSnackbar("Please select an image to update", {
        variant: "warning",
      });
      return;
    }

    if (!selectedStockForImageUpdate) {
      this.props.enqueueSnackbar("No stock selected for update", {
        variant: "error",
      });
      return;
    }

    if (!selectedStockForImageUpdate.certificate_no) {
      this.props.enqueueSnackbar("Certificate number is required", {
        variant: "error",
      });
      return;
    }

    try {
      this.setState({ updatingImage: true });

      // Convert image to base64 (returns data URL format: "data:image/jpeg;base64,...")
      const imageBase64 = await toBase64(imageFile);

      // Prepare data for API - POST /api/superadmin/stocks/update-image
      // Body: { "certificate_no": "365", "image": "data:image/jpeg;base64,..." }
      const data = {
        certificate_no: String(selectedStockForImageUpdate.certificate_no),
        image: imageBase64,
      };

      console.log("Updating image for certificate:", selectedStockForImageUpdate.certificate_no);
      console.log("Image data URL length:", imageBase64.length);

      // Call update API - POST /api/superadmin/stocks/update-image
      const response = await updateStockImage(data);

      if (response && response.data && response.data.success) {
        this.props.enqueueSnackbar(
          response.data.message || "Image updated successfully",
          { variant: "success" }
        );
        
        // Close dialog and refresh list
        this.handleImageUpdateDialogClose();
        this.loadListData();
      } else {
        const errorMessage = response?.data?.message || response?.data?.error || "Failed to update image";
        this.props.enqueueSnackbar(errorMessage, {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error updating image:", error);
      const errorMessage = error.response?.data?.message || error.message || "Error updating image";
      this.props.enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    } finally {
      this.setState({ updatingImage: false });
    }
  };

  handlePagination = (page, all) => {
    this.setState(
        {
          queryParams: {
            ...this.state.queryParams,
            page: page,
            all: all ? 1 : 0,
          },
        },
        () => {
          this.loadListData();
        }
    );
  };

  handleSearch = () => {
    // Load the search results and show them in the list
    this.loadListData();
  }

  handleCertificateNoChange = (event) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      queryParams: {
        ...prevState.queryParams,
        certificate_no: value,
      },
    }));
  };

  handleQRCodeSuccess = async (decodedText) => {
    try {
      const cleanedText = decodedText.trim();
      if (!cleanedText) {
        console.log('[ERROR] Invalid QR code scan');
        this.props.enqueueSnackbar("Invalid QR code scan", { variant: "error" });
        this.handleCloseQRScanner(); // Close scanner on invalid scan
        this.setState({ processingCertificate: false }); // Reset loading state
        return;
      }
      this.setState({ processingCertificate: true });
      if (cleanedText.startsWith("http://") || cleanedText.startsWith("https://")) {
        await this.fetchData(cleanedText);
        this.handleCloseQRScanner(); // Close scanner after URL processing
      } else {
        // Try direct add to cart first (faster)
        await this.handleDirectAddToCartByCertificate(cleanedText);
        this.handleCloseQRScanner(); // Close scanner after processing
      }
    } catch (error) {
      console.error("Error processing QR code:", error);
      this.props.enqueueSnackbar("Error processing QR code", { variant: "error" });
      this.setState({ processingCertificate: false });
      this.handleCloseQRScanner(); // Close scanner on error
    }
  };

  handleAddManualCertificate = () => {
    const { manualCertificate } = this.state;
    if (!manualCertificate) {
      this.setState({ processingCertificate: false }); // Reset loading state
      return;
    }
    this.setState({ processingCertificate: true });
    if (
        manualCertificate.startsWith("http://") ||
        manualCertificate.startsWith("https://")
    ) {
      this.fetchData(manualCertificate);
    } else {
      // Try direct add to cart first (faster)
      this.handleDirectAddToCartByCertificate(manualCertificate);
    }
    this.setState({ manualCertificate: "" });
  };

  handleDirectAddToCartByCertificate = async (certificateNo) => {
    try {
      // First, try to find the item by certificate number directly
      const searchParams = {
        search: certificateNo,
        page: 1,
        limit: 1, // Only need one result
        by_specific: this.state.queryParams.by_specific,
        own_distributor: this.state.queryParams.own_distributor,
        own_admin: this.state.queryParams.own_admin,
        own_se: this.state.queryParams.own_se,
        total_avl_stock: this.state.queryParams.total_avl_stock,
        manager: this.state.queryParams.manager,
      };

      // Make a direct API call to get the item
      const response = await this.props.actions.stocksList(searchParams);
      
      if (response && response.data && response.data.success && response.data.data.items && response.data.data.items.length > 0) {
        const item = response.data.data.items[0];
        
        // Check if item can be added to cart
        if (!item.can_add_cart) {
          this.props.enqueueSnackbar(`Item ${item.certificate_no} cannot be added to cart`, {
            variant: "warning"
          });
          this.setState({ processingCertificate: false });
          return;
        }

        // Check if item is already in cart
        let check_cart = await getCartItemById({
          stock_id: item.id,
          product_id: item.product_id,
        });
        
        if (!check_cart.data.success) {
          this.props.enqueueSnackbar("Error checking cart status", { variant: "error" });
          this.setState({ processingCertificate: false });
          return;
        }

        if (check_cart.data.data && check_cart.data.data.length > 0) {
          this.props.enqueueSnackbar(`Item ${item.certificate_no} is already in cart`, {
            variant: "warning"
          });
          this.setState({ processingCertificate: false });
          return;
        }

        // Add to cart directly
        if (item.type !== "material") {
          const materials = item.stock_materials.map(material => ({
            material_id: material.material_id,
            purity_id: material.purity_id,
            weight: material.weight,
            unit_id: material.unit_id,
            quantity: material.quantity,
          }));
          
          const data = {
            stock_id: item.id,
            product_id: item.product_id,
            size_id: item.size_id,
            materials,
            quantity: 1,
          };
          
          await this.props.actions.cartStore(data);
        } else {
          // Handle material items - open cart dialog
          this.setState({
            cart_stock: item,
            cartDialog: true,
            unit_id: item.stock_materials[0]?.unit_id || "",
            processingCertificate: false
          });
          return;
        }

        // Clear certificate input and refresh
        this.setState({
          manualCertificate: "",
          processingCertificate: false
        }, () => {
          // Focus on certificate input after successful addition
          setTimeout(() => {
            const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
            if (certificateInput) {
              certificateInput.focus();
            }
          }, 100);
        });

      } else {
        // If direct add fails, fall back to search process
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            search: certificateNo,
            page: 1,
            limit: 50,
          },
          pendingCertificateNo: certificateNo,
          searchingCertificate: true
        }, async () => {
          await this.loadListData();
          this.setState({ searchingCertificate: false });
        });
      }
    } catch (error) {
      console.error("Error in direct add to cart:", error);
      // Fall back to search process on error
      this.setState({
        queryParams: {
          ...this.state.queryParams,
          search: certificateNo,
          page: 1,
          limit: 50,
        },
        pendingCertificateNo: certificateNo,
        searchingCertificate: true
      }, async () => {
        await this.loadListData();
        this.setState({ searchingCertificate: false });
      });
    }
  };

  handleAddToCart = async (row) => {
    // Strict prevention of multiple requests
    if (this.addToCartProcess) {
      console.log('Add to cart already in progress, ignoring request');
      this.setState({ processingCertificate: false }); // Reset loading state
      return;
    }
    
    // Additional check for processing state
    if (this.state.processingCertificate) {
      console.log('Certificate processing in progress, ignoring cart request');
      this.setState({ processingCertificate: false });
      return;
    }
    
    try {
      // Set processing flags immediately
      this.addToCartProcess = true;
      this.setState({ processingCertificate: true }); // Set loading state
      
      // Check if item can be added to cart first (faster check)
      if (!row.can_add_cart) {
        this.props.enqueueSnackbar(`Item ${row.certificate_no} cannot be added to cart`, {
          variant: "warning"
        });
        this.setState({ 
          processingCertificate: false,
          manualCertificate: "",
          pendingCertificateNo: null,
          searchingCertificate: false
        });
        this.addToCartProcess = false;
        return;
      }

      // Check if item is already in cart
      let check_cart = await getCartItemById({
        stock_id: row.id,
        product_id: row.product_id,
      });
      
      if (!check_cart.data.success) {
        this.props.enqueueSnackbar("Item already in cart! You can not add this item.", { 
          variant: "error" 
        });
        // Reset all states immediately
        this.setState({ 
          processingCertificate: false,
          manualCertificate: "",
          pendingCertificateNo: null,
          searchingCertificate: false,
          queryParams: {
            ...this.state.queryParams,
            search: "", // Clear search to show all items
          }
        }, () => {
          this.addToCartProcess = false;
          this.loadListData(); // Refresh the list
          // Focus on certificate input after state update
          setTimeout(() => {
            const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
            if (certificateInput) {
              certificateInput.focus();
            }
          }, 100);
        });
        return;
      }

      // Process based on item type
      if (row.type !== "material") {
        // Handle non-material items - optimized data preparation
        const materials = row.stock_materials.map(material => ({
          material_id: material.material_id,
          purity_id: material.purity_id,
          weight: material.weight,
          unit_id: material.unit_id,
          quantity: material.quantity,
        }));
        
        const data = {
          stock_id: row.id,
          product_id: row.product_id,
          size_id: row.size_id,
          materials,
          quantity: 1,
        };
        
        await this.props.actions.cartStore(data);

        // Refresh the list after successful add to cart
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1,
            limit: 50,
            search: "", // Clear search to show all items
          },
          manualCertificate: "", // Clear the certificate input field
          pendingCertificateNo: null, // Clear pending certificate
          searchingCertificate: false, // Reset searching state
          processingCertificate: false // Reset loading state
        }, () => {
          this.loadListData();
          // Focus on certificate input after successful addition
          setTimeout(() => {
            const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
            if (certificateInput) {
              certificateInput.focus();
            }
          }, 100);
        });
      } else {
        // Handle material items - open cart dialog
        this.setState({
          cart_stock: row,
          cartDialog: true,
          unit_id: row.stock_materials[0]?.unit_id || "",
          processingCertificate: false // Reset loading state for material items
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      this.props.enqueueSnackbar("Error adding item to cart", { variant: "error" });
      this.setState({ 
        processingCertificate: false,
        manualCertificate: "",
        pendingCertificateNo: null,
        searchingCertificate: false,
        queryParams: {
          ...this.state.queryParams,
          search: "", // Clear search to show all items
        }
      }, () => {
        this.addToCartProcess = false;
        this.loadListData(); // Refresh the list
        // Focus on certificate input after error
        setTimeout(() => {
          const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
          if (certificateInput) {
            certificateInput.focus();
          }
        }, 100);
      });
    } finally {
      this.addToCartProcess = false;
    }
  };

  // Separate function for action buttons that doesn't affect certificate input
  handleActionAddToCart = async (row) => {
    const itemKey = `${row.id}_${row.product_id}`;
    
    // Check if this specific item is already being processed
    if (this.state.processingCartItems.has(itemKey)) {
      console.log('This item is already being added to cart, ignoring request');
      return;
    }
    
    // Additional check for processing state
    if (this.state.processingCertificate) {
      console.log('Certificate processing in progress, ignoring cart request');
      return;
    }
    
    try {
      // Add this specific item to processing set
      const newProcessingItems = new Set(this.state.processingCartItems);
      newProcessingItems.add(itemKey);
      this.setState({ processingCartItems: newProcessingItems });
      
      // Check if item can be added to cart first (faster check)
      if (!row.can_add_cart) {
        this.props.enqueueSnackbar(`Item ${row.certificate_no} cannot be added to cart`, {
          variant: "warning"
        });
        // Remove this item from processing set
        const newProcessingItems = new Set(this.state.processingCartItems);
        newProcessingItems.delete(itemKey);
        this.setState({ processingCartItems: newProcessingItems });
        return;
      }

      // Check if item is already in cart
      let check_cart = await getCartItemById({
        stock_id: row.id,
        product_id: row.product_id,
      });
      
      if (!check_cart.data.success) {
        this.props.enqueueSnackbar("Error checking cart status", { variant: "error" });
        // Remove this item from processing set
        const newProcessingItems = new Set(this.state.processingCartItems);
        newProcessingItems.delete(itemKey);
        this.setState({ processingCartItems: newProcessingItems });
        return;
      }

      if (check_cart.data.data && check_cart.data.data.length > 0) {
        this.props.enqueueSnackbar(`Item ${row.certificate_no} is already in cart`, {
          variant: "warning"
        });
        // Remove this item from processing set
        const newProcessingItems = new Set(this.state.processingCartItems);
        newProcessingItems.delete(itemKey);
        this.setState({ processingCartItems: newProcessingItems });
        return;
      }

      // Process based on item type
      if (row.type !== "material") {
        // Handle non-material items - optimized data preparation
        const materials = row.stock_materials.map(material => ({
          material_id: material.material_id,
          purity_id: material.purity_id,
          weight: material.weight,
          unit_id: material.unit_id,
          quantity: material.quantity,
        }));
        
        const data = {
          stock_id: row.id,
          product_id: row.product_id,
          size_id: row.size_id,
          materials,
          quantity: 1,
        };
        
        await this.props.actions.cartStore(data);

        // Refresh the list after successful add to cart (without affecting certificate input)
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1,
            limit: 50,
          }
        }, () => {
          this.loadListData();
        });
      } else {
        // Handle material items - open cart dialog
        this.setState({
          cart_stock: row,
          cartDialog: true,
          unit_id: row.stock_materials[0]?.unit_id || ""
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      this.props.enqueueSnackbar("Error adding item to cart", { variant: "error" });
    } finally {
      // Remove this item from processing set
      const newProcessingItems = new Set(this.state.processingCartItems);
      newProcessingItems.delete(itemKey);
      this.setState({ processingCartItems: newProcessingItems });
    }
  };

  formValidate = () => {
    let err = false;
    if (!this.state.quantity) {
      this.setState({
        quantity_error: true,
      });
      err = true;
    }
    if (!this.state.weight) {
      this.setState({
        weight_error: true,
      });
      err = true;
    }
    if (!this.state.unit_id) {
      this.setState({
        unit_error: true,
      });
      err = true;
    }
    return !err;
  };

  handleMaterialAddToCart = async () => {
    let row = this.state.cart_stock;
    if (!this.formValidate()) {
      this.setState({ 
        processingCertificate: false,
        manualCertificate: "",
        pendingCertificateNo: null,
        searchingCertificate: false
      });
      return false;
    } else if (parseInt(this.state.quantity) > parseInt(row.quantity)) {
      this.props.enqueueSnackbar("Quantity must be less than stock quantity", {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ 
        processingCertificate: false,
        manualCertificate: "",
        pendingCertificateNo: null,
        searchingCertificate: false
      });
      return;
    } else {
      try {
        this.setState({ processingCertificate: true }); // Set loading state
        let materials = [];
        for (let i = 0; i < row.stock_materials.length; i++) {
          materials.push({
            material_id: row.stock_materials[i].material_id,
            purity_id: row.stock_materials[i].purity_id,
            weight: this.state.weight,
            unit_id: this.state.unit_id,
            quantity: this.state.quantity,
          });
        }

        let unit = _.filter(this.state.unitList, { id: this.state.unit_id });
        let data = {
          stock_id: row.id,
          product_id: row.product_id,
          size_id: "",
          materials: materials,
          quantity: this.state.quantity,
          total_weight: convertUnitToGram(unit[0].name, this.state.weight),
          unit_id: this.state.unit_id,
        };

        await this.props.actions.cartStore(data);

        // Close the dialog and reset state
        this.setState({
          cartDialog: false,
          quantity: "",
          unit_id: "",
          weight: "",
          queryParams: {
            ...this.state.queryParams,
            page: 1,
            limit: 50,
            search: "", // Clear search to show all items
          },
          manualCertificate: "", // Clear the certificate input field
          pendingCertificateNo: null, // Clear pending certificate
          searchingCertificate: false, // Reset searching state
          processingCertificate: false // Reset loading state
        }, () => {
          // Refresh the list after successful add to cart
          this.loadListData();
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
        this.props.enqueueSnackbar("Error adding item to cart", {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ 
          processingCertificate: false,
          manualCertificate: "",
          pendingCertificateNo: null,
          searchingCertificate: false
        });
      }
    }
  };

  handleDialogClose = () => {
    this.setState({
      cartDialog: false,
      processingCertificate: false, // Reset processing state when dialog closes
      manualCertificate: "",
      pendingCertificateNo: null,
      searchingCertificate: false
    });
    this.addToCartProcess = false;
  };

  handleCategoryChange = (event) => {
    let val = event.target.value;
    this.props.actions.subCategoryList({ all: 1, category_id: val });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        category_id: val,
      },
    });
  };

  handleCardClick = (category_id) => {
    this.props.actions.subCategoryList({ all: 1, category_id: category_id });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        category_id: category_id
      }
    }, () => {
      this.handleSearch()
    })
  }

  handleSubCategoryChange = (event) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        sub_category_id: event.target.value,
      },
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        search: event.target.value,
        page: 1,
        limit: 50,
      },
    });
  };

  handleOpenQRScanner = () => {
    this.setState({ qrScannerOpen: true, qrScannerError: null }, () => {
      setTimeout(() => {
        const qrReaderElement = document.getElementById("qr-reader");
        if (qrReaderElement) {
          // Create video element for camera stream
          const video = document.createElement("video");
          video.setAttribute("playsinline", "true");
          video.style.width = "100%";
          video.style.height = "auto";
          video.style.borderRadius = "8px";

          // Create canvas for frame analysis
          const canvas = document.createElement("canvas");
          const canvasContext = canvas.getContext("2d", {
            willReadFrequently: true,
          });

          // Create and add scanning boundary with improved styling
          const boundary = document.createElement("div");
          boundary.className = "qr-scanner-boundary";
          boundary.style.position = "absolute";
          boundary.style.top = "50%";
          boundary.style.left = "50%";
          boundary.style.transform = "translate(-50%, -50%)";
          boundary.style.width = "70%";
          boundary.style.height = "70%";
          boundary.style.border = "3px solid #2196f3";
          boundary.style.borderRadius = "12px";
          boundary.style.boxShadow = "0 0 0 5000px rgba(0, 0, 0, 0.5)";
          boundary.style.zIndex = "1";
          boundary.style.animation = "scanning 2s linear infinite";

          // Add scanning animation
          const style = document.createElement("style");
          style.textContent = `
            @keyframes scanning {
              0% { border-color: #2196f3; }
              50% { border-color: #64b5f6; }
              100% { border-color: #2196f3; }
            }
            .qr-scanner-boundary::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 2px;
              background: #2196f3;
              animation: scan 2s linear infinite;
            }
            @keyframes scan {
              0% { top: 0; }
              100% { top: 100%; }
            }
          `;
          document.head.appendChild(style);

          // Clear previous content and append video
          qrReaderElement.innerHTML = "";
          qrReaderElement.style.position = "relative";
          qrReaderElement.style.overflow = "hidden";
          qrReaderElement.style.borderRadius = "8px";
          qrReaderElement.appendChild(video);
          qrReaderElement.appendChild(boundary);

          // Store references for cleanup
          const scannerState = {
            video,
            canvas,
            canvasContext,
            boundary,
            animationFrameId: null,
            stream: null,
            active: true,
            lastScanTime: 0,
            scanInterval: 100, // Reduced interval for faster scanning
            processingFrame: false,
          };

          this.setState({ qrScanner: scannerState });

          // Start camera stream with optimized settings
          navigator.mediaDevices
            .getUserMedia({
              video: { 
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 30 }
              },
              audio: false,
            })
            .then((stream) => {
              scannerState.stream = stream;
              video.srcObject = stream;
              video.play();

              // Set canvas size after video metadata is loaded
              video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Calculate boundary dimensions for scanning
                const getBoundaryRect = () => {
                  const videoRect = video.getBoundingClientRect();
                  const boundaryRect = boundary.getBoundingClientRect();

                  return {
                    x: Math.floor((canvas.width * (boundaryRect.left - videoRect.left)) / videoRect.width),
                    y: Math.floor((canvas.height * (boundaryRect.top - videoRect.top)) / videoRect.height),
                    width: Math.floor((canvas.width * boundaryRect.width) / videoRect.width),
                    height: Math.floor((canvas.height * boundaryRect.height) / videoRect.height),
                  };
                };

                // Optimized scanning function
                const scanQRCode = () => {
                  if (!scannerState.active || scannerState.processingFrame) return;

                  const now = Date.now();
                  if (now - scannerState.lastScanTime >= scannerState.scanInterval) {
                    scannerState.lastScanTime = now;
                    scannerState.processingFrame = true;

                    try {
                      // Draw current video frame to canvas
                      canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

                      // Get boundary rectangle for focused scanning
                      const boundaryRect = getBoundaryRect();

                      // Get image data only from the boundary area
                      const imageData = canvasContext.getImageData(
                        boundaryRect.x,
                        boundaryRect.y,
                        boundaryRect.width,
                        boundaryRect.height
                      );

                      // Scan with jsQR
                      const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                      });

                      if (code) {
                        console.log("Decoded QR Code:", code.data);
                        scannerState.active = false;
                        this.handleQRCodeSuccess(code.data);
                      }
                    } catch (error) {
                      console.error("jsQR error:", error);
                    } finally {
                      scannerState.processingFrame = false;
                    }
                  }

                  // Continue scanning
                  scannerState.animationFrameId = requestAnimationFrame(scanQRCode);
                };

                scanQRCode();
              };
            })
            .catch((err) => {
              console.error("Error accessing camera:", err);
              this.setState({ qrScannerError: "Failed to access camera" });
            });
        }
      }, 100);
    });
  };

  handleCloseQRScanner = () => {
    if (this.state.qrScanner) {
      const scannerState = this.state.qrScanner;

      // Stop scanning loop
      scannerState.active = false;

      // Cancel animation frame if active
      if (scannerState.animationFrameId) {
        cancelAnimationFrame(scannerState.animationFrameId);
      }

      // Stop camera stream
      if (scannerState.stream) {
        scannerState.stream.getTracks().forEach((track) => track.stop());
      }

      // Clear video source
      if (scannerState.video && scannerState.video.srcObject) {
        scannerState.video.srcObject = null;
      }

      // Clear scanner element
      const qrReaderElement = document.getElementById("qr-reader");
      if (qrReaderElement) {
        qrReaderElement.innerHTML = "";
      }
    }

    this.setState({ 
      qrScannerOpen: false, 
      qrScanner: null,
      processingCertificate: false // Reset processing state
    }, () => {
      // Focus on certificate input after scanner closes
      setTimeout(() => {
        const certificateInput = document.querySelector('input[placeholder="Enter certificate number or URL"]');
        if (certificateInput) {
          certificateInput.focus();
        }
      }, 100);
    });
  };

  fetchData = async (url) => {
    this.setState({ processingCertificate: true });
    try {
      // Check if URL contains igi.org
      if (url.includes("igi.org")) {
        try {
          const result = await extractPdfData(url);
          if (result.error) {
            console.log(result.error);
            this.props.enqueueSnackbar(result.error, { variant: "error" });
            this.handleCloseQRScanner(); // Close scanner on error
            return;
          }

          // Process the certificate number directly
          let certificateNumber = "";
          if (result.text.report_number && result.text.report_number.trim() !== "") {
            certificateNumber = result.text.report_number;
          } else if (result.text.summary_number && result.text.summary_number.trim() !== "") {
            certificateNumber = result.text.summary_number;
          }

          if (certificateNumber) {
            console.log("Certificate number from PDF:", certificateNumber);
            // Search for the certificate
            this.setState({
              queryParams: {
                ...this.state.queryParams,
                search: certificateNumber,
                page: 1,
                limit: 50,
              }
            }, () => {
              // Perform search - handleAddToCart will be called in loadListData
              this.loadListData();
              this.handleCloseQRScanner(); // Close scanner after processing
            });
          } else {
            console.log('[WARNING4] No certificate number found in PDF');
            this.props.enqueueSnackbar("No certificate number found in PDF", {
              variant: "warning",
            });
            this.handleCloseQRScanner(); // Close scanner when no certificate found
          }
          return;
        } catch (error) {
          console.error("Error extracting PDF data:", error);
          this.props.enqueueSnackbar("Error extracting certificate data", {
            variant: "error",
          });
          this.handleCloseQRScanner(); // Close scanner on error
          return;
        }
      }

      // Handle non-IGI URLs
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      const result = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(result, "text/html");

      const searchedForElement = doc.querySelector("b");
      const searchedForText = searchedForElement
          ? searchedForElement.textContent
          : null;

      if (searchedForText) {
        console.log("Certificate number from URL:", searchedForText);
        // Search for the certificate
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            search: searchedForText,
            page: 1,
            limit: 50,
          }
        }, () => {
          // Perform search - handleAddToCart will be called in loadListData
          this.loadListData();
          this.handleCloseQRScanner(); // Close scanner after processing
        });
      } else {
        console.log('[WARNING7] No certificate found in URL');
        this.props.enqueueSnackbar("No certificate found in URL", {
          variant: "warning",
        });
        this.handleCloseQRScanner(); // Close scanner when no certificate found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.props.enqueueSnackbar("Error processing certificate URL", {
        variant: "error",
      });
      this.handleCloseQRScanner(); // Close scanner on error
    } finally {
      this.setState({ processingCertificate: false });
    }
  };

  render() {
    return (
        <>
          <div className="sale-heading">
            {this.state.queryParams.total_avl_stock == 1 ? (
                <h1>Total Available Stock List</h1>
            ) : (
                <h1>List For Sale</h1>
            )}
          </div>
          {this.state.price_by_categories.length ? (
              <Card className="dashboard_card" style={{ marginBottom: "4px" }}>
                {this.state.price_by_categories.map((item, key) => (
                    <CardContent
                        className={`dashboard_card_content bg-color-1`}
                        sx={{ display: "flex", justifyContent: "space-between" }}
                        key={key}
                        onClick={() => this.handleCardClick(item.category_id)}
                    >
                      <Typography
                          sx={{ fontSize: 14, margin: 0 }}
                          color="text.secondary"
                          gutterBottom
                          component="span"
                      >
                        <h1>{item.category_name}</h1>
                        <h2>{displayAmount(item.total_amount)}</h2>
                        <h3>{item.quantity} Piece(s)</h3>
                      </Typography>
                      <div className="card-icon">{/* <DiamondIcon /> */}</div>
                    </CardContent>
                ))}
              </Card>
          ) : null}
          <MainCard>
            <Box sx={{ flexGrow: 1, m: 0.5 }} className="ratn-dialog-inner">
              <Grid
                  container
                  spacing={2}
                  className="tax-input loans_view p_view"
                  columnSpacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <Grid item xs={6} md={3} className="create-input">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={this.state.queryParams.category_id}
                        label="Category"
                        onChange={this.handleCategoryChange}
                        className="input-inner"
                        defaultValue=""
                    >
                      <MenuItem value="">All</MenuItem>
                      {this.state.categories.map((item, index) => (
                          <MenuItem value={item.id} key={index}>
                            {item.name}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3} className="create-input">
                  <FormControl fullWidth>
                    <InputLabel>Sub Category</InputLabel>
                    <Select
                        value={this.state.queryParams.sub_category_id}
                        label="Sub Category"
                        onChange={this.handleSubCategoryChange}
                        className="input-inner"
                        defaultValue=""
                    >
                      <MenuItem value="">All</MenuItem>
                      {this.state.sub_categories.map((item, index) => (
                          <MenuItem value={item.id} key={index}>
                            {item.name}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3} className="create-input">
                  <FormControl fullWidth>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={this.state.queryParams.search}
                        onChange={this.handleSearchChange}
                        InputProps={{
                          endAdornment: (
                              <Button
                                  variant=""
                                  color="primary"
                                  onClick={this.handleSearch}
                                  sx={{
                                    minWidth: '40px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    marginRight: '-14px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                      transform: 'scale(1.1)',
                                      '& .MuiSvgIcon-root': {
                                        color: 'primary.main'
                                      }
                                    }
                                  }}
                              >
                                <SearchIcon />
                              </Button>
                          ),
                        }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3} className="create-input">
                  <FormControl fullWidth>
                    <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                    >
                      {/* <div style={{ display: "flex", gap: "8px" }}>
                      <TextField
                        label="Certificate Number"
                        variant="outlined"
                        value={this.state.queryParams.certificate_no}
                        onChange={this.handleCertificateNoChange}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            this.handleAddCertificate();
                          }
                        }}
                        fullWidth
                      />
                    </div> */}

                      {/* Manual Input Box */}
                      <TextField
                          label="Certificate Entry"
                          variant="outlined"
                          placeholder="Enter certificate number or URL"
                          value={this.state.manualCertificate}
                          onChange={(event) =>
                              this.setState({ manualCertificate: event.target.value })
                          }
                          onKeyPress={(event) => {
                            if (
                                event.key === "Enter" &&
                                this.state.manualCertificate
                            ) {
                              this.handleAddManualCertificate();
                            }
                          }}
                          fullWidth
                          disabled={this.state.processingCertificate}
                          InputProps={{
                            endAdornment: (
                              <>
                                <Button
                                    variant=""
                                    color="primary"
                                    onClick={() => {
                                      if (this.state.manualCertificate) {
                                        this.handleAddManualCertificate();
                                      }
                                    }}
                                    disabled={this.state.processingCertificate || !this.state.manualCertificate}
                                    sx={{
                                      minWidth: "40px",
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      marginRight: "8px",
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                        transform: 'scale(1.1)',
                                        '& .MuiSvgIcon-root': {
                                          color: 'primary.main'
                                        }
                                      }
                                    }}
                                >
                                  {this.state.processingCertificate ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  ) : (
                                    <SearchIcon />
                                  )}
                                </Button>
                                <Button
                                    variant=""
                                    color="primary"
                                    onClick={this.handleOpenQRScanner}
                                    disabled={this.state.processingCertificate}
                                    sx={{
                                      minWidth: "10px",
                                      height: "40px",
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                        transform: 'scale(1.1)',
                                        '& .MuiSvgIcon-root': {
                                          color: 'primary.main'
                                        }
                                      }
                                    }}
                                >
                                  {this.state.processingCertificate ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  ) : (
                                    <QrCodeScannerIcon />
                                  )}
                                </Button>
                              </>
                            ),
                          }}
                      />
                    </div>
                  </FormControl>
                </Grid>
                {/*<Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <TextField
                    label="Qty"
                    variant="outlined"
                    value={this.state.qty}
                    onChange={this.handleQtyChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={this.state.queryParams.unit}
                    label="Unit"
                    onChange={this.handleUnitChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.unitList.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>P Code</InputLabel>
                  <Select
                    value={this.state.queryParams.pcode}
                    label="Unit"
                    onChange={this.handlePCodeChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.items.map((item, index) => (
                        <MenuItem value={item.product_code} key={index}>{item.product_code}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={this.state.queryParams.size}
                    label="Size"
                    onChange={this.handleSizeChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.sizeList.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>*/}
                {/*<Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <TextField
                    label="Price"
                    variant="outlined"
                    value={this.state.price}
                    onChange={this.handlePriceChange}
                  />
                </FormControl>
              </Grid>*/}
                {/* <Grid
                item
                xs={6}
                md={3}
                className="create-input order-input button-right"
              >
                <Button
                  variant="contained"
                  className="search-btn"
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
              </Grid> */}
              </Grid>
            </Box>
            <Grid container spacing={gridSpacing} className="orders-sale-button">
              {console.log(this.props)}
              <DataTable
                  columns={this.columns}
                  rows={this.state.items}
                  page={this.state.queryParams.page}
                  limit={this.state.queryParams.limit}
                  total={this.state.total}
                  handlePagination={this.handlePagination}
                  actions={this.getTableActions()}
                  haveAllOption={true}
                  getRowActions={this.getTableActions} // Pass function to generate row-specific actions
                  onImageClick={this.handleImageClick} // Pass custom image click handler
              />
            </Grid>
          </MainCard>

          {/* Read-only Image Dialog for non-superadmin users */}
          <Dialog onClose={this.handleImageViewDialogClose} open={this.state.imageViewDialogOpen}>
            <DialogTitle>
              <CloseIcon sx={{ cursor: 'pointer', float: 'right', marginTop: '5px', width: '30px' }} onClick={this.handleImageViewDialogClose} />
            </DialogTitle>
            <DialogContent>
              <img src={this.state.imageViewPath} />
            </DialogContent>
          </Dialog>

          <Dialog
              open={this.state.cartDialog}
              onClose={this.handleDialogClose}
              fullWidth
              maxWidth="sm"
              className="ratn-dialog-wrapper"
          >
            <DialogTitle>
              {this.state.cart_stock ? (
                  <div className="cart-item-wrapper">
                <span className="cart-item-header">
                  {this.state.cart_stock.name}
                </span>
                    <div className="cart-item-header-right">
                      <p>
                        Rate: &nbsp; &nbsp;
                        <strong> {this.state.cart_stock.mrp_display} </strong>
                      </p>
                      &nbsp; &nbsp;
                      <p>
                        <strong>
                          {" "}
                          {this.state.cart_stock.total_weight_display}{" "}
                        </strong>
                      </p>
                    </div>
                  </div>
              ) : null}
            </DialogTitle>
            <div>
              <DialogContentText></DialogContentText>
              {this.state.cart_stock ? (
                  <TableContainer component={Paper}>
                    <div className="ratn-table-purchase-wrapper">
                      <Table
                          aria-label="collapsible table"
                          className="invoice_product_list"
                      >
                        <TableHead className="ratn-table-header sale-modal-header">
                          <TableRow>
                            <TableCell>Purity</TableCell>
                            <TableCell>Available Qty</TableCell>
                            <TableCell>Avl. Weight</TableCell>
                            <TableCell>Sale Unit</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {this.state.cart_stock.stock_materials[0].purity_name}
                            </TableCell>
                            <TableCell>{this.state.cart_stock.quantity}</TableCell>
                            <TableCell>
                              {this.state.cart_stock.total_weight_display}
                            </TableCell>
                            <TableCell>
                              {this.state.cart_stock.unit_display[0]}
                            </TableCell>
                          </TableRow>
                          {/* {this.state.suppliers.map((row, i) => (
                                <Row key={i} row={row} index={i} />
                              ))} */}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
              ) : null}
              <div className="sale_modal_wrapper">
                <Box sx={{ flexGrow: 1, m: 0.5 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                          label="Quantity"
                          variant="outlined"
                          fullWidth
                          value={this.state.quantity}
                          onChange={(event) =>
                              this.setState({ quantity: event.target.value })
                          }
                          error={this.state.quantity_error}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                          label="Weight"
                          variant="outlined"
                          fullWidth
                          value={this.state.weight}
                          onChange={(event) =>
                              this.setState({ weight: event.target.value })
                          }
                          error={this.state.weight_error}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth error={this.state.unit_error}>
                        <InputLabel>Unit</InputLabel>
                        <Select
                            value={this.state.unit_id}
                            label="Unit"
                            onChange={(event) =>
                                this.setState({ unit_id: event.target.value })
                            }
                            className="input-inner"
                            defaultValue=""
                        >
                          <MenuItem value=""></MenuItem>
                          {this.state.unitList.map((item, index) => (
                              <MenuItem value={item.id} key={index}>
                                {item.name}
                              </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: "12px" }}>
                      <Stack
                          spacing={1}
                          direction="row"
                          justifyContent="flex-end"
                      >
                        <Button
                            variant="outlined"
                            onClick={this.handleDialogClose}
                        >
                          Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="button"
                            onClick={this.handleMaterialAddToCart}
                        >
                          Add to Cart
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </Dialog>

          {/* QR Scanner Dialog */}
          <Dialog
              open={this.state.qrScannerOpen}
              onClose={this.handleCloseQRScanner}
              fullWidth
              maxWidth="sm"
              PaperProps={{
                style: {
                  borderRadius: '12px',
                  overflow: 'hidden'
                }
              }}
          >
            <DialogTitle sx={{ 
              background: '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
              padding: '16px 24px'
            }}>
              Scan QR Code
            </DialogTitle>
            <DialogContent sx={{ padding: '24px' }}>
              <div
                id="qr-reader"
                style={{ 
                  width: "100%", 
                  height: "400px",
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              ></div>
              {this.state.qrScannerError && (
                <Typography 
                  color="error" 
                  sx={{ 
                    mt: 2,
                    textAlign: 'center',
                    padding: '8px',
                    background: '#ffebee',
                    borderRadius: '4px'
                  }}
                >
                  {this.state.qrScannerError}
                </Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ 
              padding: '16px 24px',
              borderTop: '1px solid #e0e0e0'
            }}>
              <Button 
                onClick={this.handleCloseQRScanner}
                variant="outlined"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  padding: '8px 24px'
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/* Image Update Dialog */}
          <Dialog
              open={this.state.imageUpdateDialogOpen}
              onClose={this.handleImageUpdateDialogClose}
              fullWidth
              maxWidth="sm"
              className="ratn-dialog-wrapper"
          >
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px 24px',
              backgroundColor: '#1976d2',
              color: 'white'
            }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Update Image - Certificate {this.state.selectedStockForImageUpdate?.certificate_no}
              </Typography>
              <IconButton
                onClick={this.handleImageUpdateDialogClose}
                sx={{ padding: 0, color: 'white' }}
              >
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ padding: '24px' }}>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Select New Image:
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{
                    mb: 3,
                    padding: '12px',
                    borderStyle: 'dashed',
                    borderColor: '#1976d2'
                  }}
                >
                  {this.state.imageFile ? this.state.imageFile.name : 'Choose Image File'}
                  <input
                    ref={(ref) => { this.imageFileInputRef = ref; }}
                    type="file"
                    accept="image/*"
                    onChange={this.handleImageFileChange}
                    style={{ display: 'none' }}
                  />
                </Button>
                
                {/* Current Image and Preview in a single row using flex */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap: 2,
                  justifyContent: 'space-around',
                  alignItems: 'flex-start'
                }}>
                  {/* Current Image */}
                  {this.state.selectedStockForImageUpdate && (
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Current Image:
                      </Typography>
                      <img
                        src={this.state.selectedStockForImageUpdate.current_image || this.state.selectedStockForImageUpdate.image}
                        alt="Current"
                        style={{
                          width: '100%',
                          maxWidth: '250px',
                          height: 'auto',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0'
                        }}
                      />
                    </Box>
                  )}
                  
                  {/* Preview Image */}
                  {this.state.imageFile && (
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Preview:
                      </Typography>
                      <img
                        src={URL.createObjectURL(this.state.imageFile)}
                        alt="Preview"
                        style={{
                          width: '100%',
                          maxWidth: '250px',
                          height: 'auto',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0'
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px', borderTop: '1px solid #e0e0e0' }}>
              <Button
                onClick={this.handleImageUpdateDialogClose}
                variant="outlined"
                disabled={this.state.updatingImage}
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleUpdateImage}
                variant="contained"
                disabled={this.state.updatingImage || !this.state.imageFile}
                startIcon={this.state.updatingImage ? <CircularProgress size={20} /> : null}
              >
                {this.state.updatingImage ? 'Updating...' : 'Update Image'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.stocks.items,
  total: state.superadmin.stocks.total,
  actionCalled: state.superadmin.stocks.actionCalled,
  deleteSuccess: state.superadmin.stocks.deleteSuccess,
  successMessage: state.superadmin.stocks.successMessage,
  cart_actionCalled: state.superadmin.cart.actionCalled,
  cart_createSuccess: state.superadmin.cart.createSuccess,
  cart_deleteSuccess: state.superadmin.cart.deleteSuccess,
  cart_successMessage: state.superadmin.cart.successMessage,
  cart_errorMessage: state.superadmin.cart.errorMessage,
  categories: state.superadmin.category.items,
  materialList: state.superadmin.material.items,
  sub_categories: state.superadmin.subCategory.items,
  unitList: state.superadmin.unit.items,
  sizeList: state.superadmin.size.items,
  loading: state.superadmin.stocks.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(
        {
          stocksList,
          subCategoryList,
          cartStore,
          cartList,
          categoryList,
          materialList,
          unitList,
          sizeList,
        },
        dispatch
    ),
  };
};

export default withSnackbar(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(StockPage))
);