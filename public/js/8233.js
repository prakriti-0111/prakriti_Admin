"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8233],{16638:(e,t,a)=>{var s=a(96784);t.A=void 0;var i=s(a(17044)),n=a(62540),o=(0,i.default)((0,n.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.A=o},3799:(e,t,a)=>{a.d(t,{A:()=>_});var s=a(49257),i=a(68102),n=a(81023),o=a(68017),r=a(63696),l=(a(66542),a(99216)),c=a(2512),d=a(90013),h=a(1267),m=a(46733);function u(e){return(0,m.A)("MuiImageListItem",e)}const p=(0,a(29009).A)("MuiImageListItem",["root","img","standard","woven","masonry","quilted"]);var g=a(62540);const x=["children","className","cols","component","rows","style"],y=(0,c.Ay)("li",{name:"MuiImageListItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[{[`& .${p.img}`]:t.img},t.root,t[a.variant]]}})((({ownerState:e})=>(0,i.A)({display:"block",position:"relative"},"standard"===e.variant&&{display:"flex",flexDirection:"column"},"woven"===e.variant&&{height:"100%",alignSelf:"center","&:nth-of-type(even)":{height:"70%"}},{[`& .${p.img}`]:(0,i.A)({objectFit:"cover",width:"100%",height:"100%",display:"block"},"standard"===e.variant&&{height:"auto",flexGrow:1})}))),_=r.forwardRef((function(e,t){const a=(0,d.A)({props:e,name:"MuiImageListItem"}),{children:c,className:m,cols:p=1,component:_="li",rows:f=1,style:v}=a,A=(0,s.A)(a,x),{rowHeight:j="auto",gap:b,variant:C}=r.useContext(l.A);let w="auto";"woven"===C?w=void 0:"auto"!==j&&(w=j*f+b*(f-1));const S=(0,i.A)({},a,{cols:p,component:_,gap:b,rowHeight:j,rows:f,variant:C}),k=(e=>{const{classes:t,variant:a}=e,s={root:["root",a],img:["img"]};return(0,n.A)(s,u,t)})(S);return(0,g.jsx)(y,(0,i.A)({as:_,className:(0,o.A)(k.root,k[C],m),ref:t,style:(0,i.A)({height:w,gridColumnEnd:"masonry"!==C?`span ${p}`:void 0,gridRowEnd:"masonry"!==C?`span ${f}`:void 0,marginBottom:"masonry"===C?b:void 0},v),ownerState:S},A,{children:r.Children.map(c,(e=>r.isValidElement(e)?"img"===e.type||(0,h.A)(e,["Image"])?r.cloneElement(e,{className:(0,o.A)(k.img,e.props.className)}):e:null))}))}))},39487:(e,t,a)=>{a.d(t,{A:()=>x});var s=a(49257),i=a(68102),n=a(81023),o=a(68017),r=a(63696),l=a(2512),c=a(90013),d=a(46733);function h(e){return(0,d.A)("MuiImageList",e)}(0,a(29009).A)("MuiImageList",["root","masonry","quilted","standard","woven"]);var m=a(99216),u=a(62540);const p=["children","className","cols","component","rowHeight","gap","style","variant"],g=(0,l.Ay)("ul",{name:"MuiImageList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant]]}})((({ownerState:e})=>(0,i.A)({display:"grid",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"},"masonry"===e.variant&&{display:"block"}))),x=r.forwardRef((function(e,t){const a=(0,c.A)({props:e,name:"MuiImageList"}),{children:l,className:d,cols:x=2,component:y="ul",rowHeight:_="auto",gap:f=4,style:v,variant:A="standard"}=a,j=(0,s.A)(a,p),b=r.useMemo((()=>({rowHeight:_,gap:f,variant:A})),[_,f,A]);r.useEffect((()=>{}),[]);const C="masonry"===A?(0,i.A)({columnCount:x,columnGap:f},v):(0,i.A)({gridTemplateColumns:`repeat(${x}, 1fr)`,gap:f},v),w=(0,i.A)({},a,{component:y,gap:f,rowHeight:_,variant:A}),S=(e=>{const{classes:t,variant:a}=e,s={root:["root",a]};return(0,n.A)(s,h,t)})(w);return(0,u.jsx)(g,(0,i.A)({as:y,className:(0,o.A)(S.root,S[A],d),ref:t,style:C,ownerState:w},j,{children:(0,u.jsx)(m.A.Provider,{value:b,children:l})}))}))},99216:(e,t,a)=>{a.d(t,{A:()=>s});const s=a(63696).createContext({})},86552:(e,t,a)=>{a.d(t,{EM:()=>c,HH:()=>o,LT:()=>r,kX:()=>l});var s=a(80325),i=a(86418),n=a(45892);const o=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/countries".concat(e)).then((e=>{e.data.success&&t({type:i.GO,payload:e.data.data})})).catch((e=>{}))}),r=e=>t=>{s.A.post("/superadmin/countries/store",e).then((e=>{e.data.success&&t({type:i.bT,payload:e.data})})).catch((e=>{}))},l=(e,t)=>a=>{s.A.post("/superadmin/countries/update/".concat(e),t).then((e=>{e.data.success&&a({type:i.v$,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.delete("/superadmin/countries/delete/".concat(e),t).then((e=>{e.data.success&&a({type:i.bI,payload:e.data})})).catch((e=>{}))}},12178:(e,t,a)=>{a.d(t,{Jo:()=>r,Mj:()=>c,P:()=>l,cY:()=>d,lK:()=>o});var s=a(80325),i=a(69288),n=a(45892);const o=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/investors".concat(e)).then((e=>{e.data.success&&t({type:i.VQ,payload:e.data.data})})).catch((e=>{}))}),r=e=>t=>{s.A.post("/superadmin/investors/store",e).then((e=>{t({type:i.ov,payload:e.data})})).catch((e=>{}))},l=e=>t=>{s.A.get("/superadmin/investors/fetch/".concat(e)).then((e=>{e.data.success&&t({type:i.PX,payload:e.data.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.post("/superadmin/investors/update/".concat(e),t).then((e=>{a({type:i._f,payload:e.data})})).catch((e=>{}))},d=(e,t)=>a=>{s.A.delete("/superadmin/investors/delete/".concat(e),t).then((e=>{a({type:i.AR,payload:e.data})})).catch((e=>{}))}},71475:(e,t,a)=>{a.d(t,{E$:()=>n,b9:()=>o,ec:()=>r,kY:()=>d,qO:()=>c,tO:()=>l});var s=a(80325),i=a(29941);const n=()=>s.A.get("/superadmin/profile"),o=e=>t=>{s.A.post("/superadmin/edit-profile",e).then((e=>{t({type:i.bW,payload:e.data})})).catch((e=>{}))},r=e=>t=>{s.A.post("/superadmin/change-password",e).then((e=>{t({type:i.P8,payload:e.data})})).catch((e=>{}))},l=e=>e=>{s.A.get("/superadmin/dashboard").then((t=>{e({type:i.WG,payload:t.data.data})})).catch((e=>{}))},c=e=>e=>{s.A.get("/superadmin/auto-notifications").then((e=>{})).catch((e=>{}))},d=e=>s.A.get("/superadmin/next-user-name?role=".concat(e))},88019:(e,t,a)=>{a.d(t,{IS:()=>d,Jx:()=>l,MO:()=>o,TP:()=>c,i9:()=>r});var s=a(80325),i=a(99333),n=a(45892);const o=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/states".concat(e)).then((e=>{e.data.success&&t({type:i.hj,payload:e.data.data})})).catch((e=>{}))}),r=e=>t=>{s.A.post("/superadmin/states/store",e).then((e=>{e.data.success&&t({type:i.Mi,payload:e.data})})).catch((e=>{}))},l=(e,t)=>a=>{s.A.post("/superadmin/states/update/".concat(e),t).then((e=>{e.data.success&&a({type:i.I_,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.delete("/superadmin/states/delete/".concat(e),t).then((e=>{e.data.success&&a({type:i.es,payload:e.data})})).catch((e=>{}))},d=async e=>(e=(0,n.x0)(e,!0),await s.A.get("/superadmin/states".concat(e)))},38233:(e,t,a)=>{a.d(t,{A:()=>V});var s=a(63696),i=a(52821),n=a(61095),o=a(45271),r=a(36122),l=a(41795),c=a(66107),d=a(26365),h=a(78976),m=a(49746),u=a(39487),p=a(3799),g=a(72839),x=a(45892),y=a(88441),_=a(51449),f=a(27218),v=a(50977),A=a(69288),j=a(88019),b=a(71475),C=a(86552),w=a(12178),S=a(16638),k=a(97525),I=a(17243),D=a.n(I),N=a(41307),M=a(62540);function L(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class R extends s.Component{constructor(e){super(e),L(this,"loadUserName",(async e=>{let t=await(0,b.kY)("investor",e);t.data.success&&this.setState({formValues:{...this.state.formValues,user_name:t.data.data}})})),L(this,"loadSelectList",(async e=>{let t=await(0,j.IS)({all:1,country_id:e.country_id});t.data.success&&this.setState({stateList:t.data.data.items});let a=await(0,j.IS)({all:1,country_id:e.p_country_id});a.data.success&&this.setState({p_stateList:a.data.data.items})})),L(this,"handleDefaultChange",((e,t)=>{this.updateFormValues(e.target.value,t)})),L(this,"updateFormValues",((e,t)=>{let a=this.state.formValues;a[t]=e,this.setState({formValues:a})})),L(this,"handleSubmit",(async()=>{if(!this.formValidate()){this.setState({submitting:!0});let e={...this.state.formValues};this.state.profile_image&&(e.profile_image=await(0,x.nk)(this.state.profile_image)),this.state.pan_image&&(e.pan_image=await(0,x.nk)(this.state.pan_image)),this.state.adhar_image&&(e.adhar_image=await(0,x.nk)(this.state.adhar_image)),this.state.company_logo&&(e.company_logo=await(0,x.nk)(this.state.company_logo)),e.remove_profile_image=this.state.remove_profile_image,e.remove_pan_image=this.state.remove_pan_image,e.remove_adhar_image=this.state.remove_adhar_image,e.remove_company_logo=this.state.remove_company_logo;let t=[...this.state.documents];for(let e=0;e<t.length;e++)t[e]=await(0,x.nk)(t[e]);e.documents=t,e.remove_documents=this.state.remove_documents,this.state.isCreateFrom?this.props.actions.investorCreate(e):this.props.actions.investorUpdate(this.state.formData.id,e)}})),L(this,"formValidate",(()=>{let e=this.state.formErros,t=this.state.formValues,a=!1;return(0,x.Im)(t.name)?(e.name=!0,a=!0):e.name=!1,(0,x.Im)(t.mobile)?(e.mobile=!0,a=!0):e.mobile=!1,(0,x.Im)(t.country_id)?(e.country_id=!0,a=!0):e.country_id=!1,(0,x.Im)(t.state_id)?(e.state_id=!0,a=!0):e.state_id=!1,(0,x.Im)(t.company_name)?(e.company_name=!0,a=!0):e.company_name=!1,(0,x.Im)(t.address)?(e.address=!0,a=!0):e.address=!1,this.setState({formErros:e}),a})),L(this,"onImageChange",((e,t)=>{let a="existing_"+t;this.setState({[t]:e.target.files[0],[a]:null});let s=t+"Ref";this[s]&&(this[s].current.value=null)})),L(this,"deleteExistingImage",(e=>{let t="remove_"+e,a="existing_"+e;this.setState({[a]:null,[t]:!0})})),L(this,"deleteImage",(e=>{this.setState({[e]:null})})),L(this,"getImageSrc",(e=>URL.createObjectURL(e))),L(this,"handleCountryChange",(async e=>{this.handleDefaultChange(e,"country_id"),this.updateFormValues("","state_id");let t=await(0,j.IS)({all:1,country_id:e.target.value});t.data.success&&this.setState({stateList:t.data.data.items})})),L(this,"handlePermanentCountryChange",(async e=>{this.handleDefaultChange(e,"p_country_id"),this.updateFormValues("","p_state_id");let t=await(0,j.IS)({all:1,country_id:e.target.value});t.data.success&&this.setState({p_stateList:t.data.data.items})})),L(this,"onDocumentChange",(e=>{let t=this.state.documents;if(this.state.existing_documents.length+t.length+e.target.files.length>10)this.props.enqueueSnackbar("Maximum 5 document are allowed.",{variant:"error"});else{for(let a=0;a<e.target.files.length;a++)console.log(e.target.files[a]),t.push(e.target.files[a]);this.setState({documents:t}),this.documentRef&&(this.documentRef.current.value=null)}})),L(this,"deleteDocument",(e=>{let t=this.state.documents;t.splice(e,1),this.setState({documents:t}),this.documentRef&&(this.documentRef.current.value=null)})),L(this,"deleteExistingDocument",(e=>{let t=this.state.remove_documents,a=this.state.existing_documents;t.push(a[e]),a.splice(e,1),this.setState({remove_documents:t,existing_documents:a})})),L(this,"filePreview",(e=>{}));let t="formData"in this.props?this.props.formData:null;this.state={auth:this.props.auth,formData:t,isCreateFrom:!t,countryList:this.props.countryList,stateList:[],p_stateList:[],submitting:!1,formValues:{name:"",email:"",mobile:"",adhar:"",pan:"",address:"",city:"",pincode:"",district_id:"",state_id:"",country_id:"",p_address:"",p_city:"",p_pincode:"",p_district_id:"",p_state_id:"",p_country_id:"",company_name:"",gst:"",bank_name:"",bank_account_no:"",bank_ifsc:"",status:!0,landmark:"",user_name:"",password:""},formErros:{name:!1,email:!1,mobile:!1,adhar:!1,pan:!1,address:!1,city:!1,pincode:!1,district_id:!1,state_id:!1,country_id:!1,p_address:!1,p_city:!1,p_pincode:!1,p_district_id:!1,p_state_id:!1,p_country_id:!1,company_name:!1,gst:!1,bank_name:!1,bank_account_no:!1,bank_ifsc:!1,landmark:!1,password:!1},actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,editSuccess:this.props.editSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,profile_image:null,pan_image:null,adhar_image:null,company_logo:null,documents:[],existing_profile_image:null,existing_pan_image:null,existing_adhar_image:null,existing_company_logo:null,existing_documents:[],remove_profile_image:!1,remove_pan_image:!1,remove_adhar_image:!1,remove_company_logo:!1,remove_documents:[]},this.profile_imageRef=s.createRef(),this.pan_imageRef=s.createRef(),this.adhar_imageRef=s.createRef(),this.company_logoRef=s.createRef(),this.documentRef=s.createRef()}componentDidMount(){this.props.actions.countryList({all:1}),this.state.formData?this.initializeFormData():this.loadUserName("")}initializeFormData(){if(this.state.formData){let e=this.state.formValues;D().each(this.state.formData,(function(t,a){a in e&&(e[a]=t)})),this.setState({formValues:e,existing_profile_image:this.state.formData.profile_image,existing_pan_image:this.state.formData.pan_image,existing_adhar_image:this.state.formData.adhar_image,existing_company_logo:this.state.formData.company_logo,existing_documents:this.state.formData.documents},(()=>{e.user_name||this.loadUserName(e.id)})),this.loadSelectList(e)}}static getDerivedStateFromProps(e,t){let a={};return e.formData!==t.formData&&(a.formData=e.formData),e.actionCalled!==t.actionCalled&&(a.actionCalled=e.actionCalled),e.createSuccess!==t.createSuccess&&(a.createSuccess=e.createSuccess),e.editSuccess!==t.editSuccess&&(a.editSuccess=e.editSuccess),e.successMessage!==t.successMessage&&(a.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(a.errorMessage=e.errorMessage),e.countryList!==t.countryList&&(a.countryList=e.countryList),a}componentDidUpdate(e){this.props.formData!=e.formData&&this.initializeFormData(),this.state.actionCalled&&(this.state.isCreateFrom?this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:A.QP}),this.props.navigate((0,x.zr)((0,x.mA)(this.state.auth))+"/investors")):(this.setState({submitting:!1}),this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:A.QP})):this.state.editSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:A.QP}),this.props.navigate((0,x.zr)((0,x.mA)(this.state.auth))+"/investors")):(this.setState({submitting:!1}),this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:A.QP})))}render(){const{formValues:e,formErros:t,submitting:a}=this.state;return(0,M.jsx)(n.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,M.jsx)("form",{autoComplete:"off",children:(0,M.jsxs)(o.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,M.jsx)(o.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,M.jsx)(r.A,{label:"Company Name",variant:"outlined",fullWidth:!0,value:e.company_name,onChange:e=>this.handleDefaultChange(e,"company_name"),error:t.company_name})}),(0,M.jsx)(o.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,M.jsx)(r.A,{label:"Owner Name",variant:"outlined",fullWidth:!0,value:e.name,onChange:e=>this.handleDefaultChange(e,"name"),error:t.name})}),(0,M.jsx)(o.Ay,{item:!0,xs:4,className:"create-input",children:(0,M.jsx)(r.A,{label:"GST",variant:"outlined",fullWidth:!0,value:e.gst,onChange:e=>this.handleDefaultChange(e,"gst"),error:t.gst})}),(0,M.jsx)(o.Ay,{item:!0,xs:4,className:"create-input",children:(0,M.jsx)(r.A,{label:"Contact No",variant:"outlined",fullWidth:!0,value:e.mobile,onChange:e=>this.handleDefaultChange(e,"mobile"),error:t.mobile})}),(0,M.jsx)(o.Ay,{item:!0,xs:4,className:"create-input",children:(0,M.jsx)(r.A,{label:"Email",variant:"outlined",fullWidth:!0,value:e.email,onChange:e=>this.handleDefaultChange(e,"email"),error:t.email})}),(0,M.jsx)(o.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,M.jsx)(r.A,{label:"Full Address",variant:"outlined",fullWidth:!0,value:e.address,onChange:e=>this.handleDefaultChange(e,"address"),error:t.address})}),(0,M.jsx)(o.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,M.jsx)(r.A,{label:"Landmark",variant:"outlined",fullWidth:!0,value:e.landmark,onChange:e=>this.handleDefaultChange(e,"landmark"),error:t.landmark})}),(0,M.jsx)(o.Ay,{item:!0,xs:3,className:"create-input",children:(0,M.jsxs)(l.A,{fullWidth:!0,error:t.country_id,children:[(0,M.jsx)(c.A,{children:"Country"}),(0,M.jsxs)(d.A,{className:"input-inner",value:e.country_id,fullWidth:!0,label:"Country",onChange:this.handleCountryChange,children:[(0,M.jsx)(h.A,{value:""}),this.state.countryList.map(((e,t)=>(0,M.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,M.jsx)(o.Ay,{item:!0,xs:3,className:"create-input",children:(0,M.jsxs)(l.A,{fullWidth:!0,error:t.state_id,children:[(0,M.jsx)(c.A,{children:"State"}),(0,M.jsxs)(d.A,{className:"input-inner",value:e.state_id,fullWidth:!0,label:"State",onChange:e=>this.handleDefaultChange(e,"state_id"),children:[(0,M.jsx)(h.A,{value:""}),this.state.stateList.map(((e,t)=>(0,M.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,M.jsx)(o.Ay,{item:!0,xs:3,className:"create-input",children:(0,M.jsx)(r.A,{label:"City",variant:"outlined",fullWidth:!0,value:e.city,onChange:e=>this.handleDefaultChange(e,"city"),error:t.city})}),(0,M.jsx)(o.Ay,{item:!0,xs:3,className:"create-input",children:(0,M.jsx)(r.A,{label:"Pincode",variant:"outlined",fullWidth:!0,value:e.pincode,onChange:e=>this.handleDefaultChange(e,"pincode"),error:t.pincode})}),(0,M.jsx)(o.Ay,{item:!0,xs:4,className:"create-input",children:(0,M.jsx)(r.A,{label:"Bank Name",variant:"outlined",fullWidth:!0,value:e.bank_name,onChange:e=>this.handleDefaultChange(e,"bank_name"),error:t.bank_name})}),(0,M.jsx)(o.Ay,{item:!0,xs:4,className:"create-input",children:(0,M.jsx)(r.A,{label:"Account Number",variant:"outlined",fullWidth:!0,value:e.bank_account_no,onChange:e=>this.handleDefaultChange(e,"bank_account_no"),error:t.bank_account_no})}),(0,M.jsx)(o.Ay,{item:!0,xs:4,className:"create-input",children:(0,M.jsx)(r.A,{label:"IFSC Code",variant:"outlined",fullWidth:!0,value:e.bank_ifsc,onChange:e=>this.handleDefaultChange(e,"bank_ifsc"),error:t.bank_ifsc})}),(0,M.jsx)(o.Ay,{item:!0,xs:12,children:(0,M.jsxs)(o.Ay,{container:!0,spacing:2,children:[(0,M.jsxs)(o.Ay,{item:!0,xs:3,className:"admin-buttons",children:[(0,M.jsxs)(m.A,{variant:"contained",className:"image-button",component:"label",endIcon:(0,M.jsx)(k.A,{}),children:["Company Logo",(0,M.jsx)("input",{name:"company_logo",hidden:!0,accept:"image/*",type:"file",onChange:e=>this.onImageChange(e,"company_logo"),ref:this.company_logoRef})]}),this.state.company_logo||this.state.existing_company_logo?(0,M.jsxs)(u.A,{sx:{width:"100%",height:110},cols:12,rowHeight:110,children:[this.state.existing_company_logo?(0,M.jsx)(p.A,{style:{height:"110px",width:"100px"},children:(0,M.jsxs)("div",{style:{position:"relative",width:"100px"},children:[(0,M.jsx)("img",{src:this.state.existing_company_logo,loading:"lazy",style:{height:"100px",width:"100px"}}),(0,M.jsx)("span",{style:{position:"absolute",top:"0px",right:"0px",cursor:"pointer"},children:(0,M.jsx)(S.A,{color:"error",onClick:()=>this.deleteExistingImage("company_logo")})})]})}):null,this.state.company_logo?(0,M.jsx)(p.A,{style:{height:"110px",width:"100px"},children:(0,M.jsxs)("div",{style:{position:"relative",width:"100px"},children:[(0,M.jsx)("img",{src:this.getImageSrc(this.state.company_logo),loading:"lazy",style:{height:"100px",width:"100px"}}),(0,M.jsx)("span",{style:{position:"absolute",top:"0px",right:"0px",cursor:"pointer"},children:(0,M.jsx)(S.A,{color:"error",onClick:()=>this.deleteImage("company_logo")})})]})}):null]}):null]}),(0,M.jsxs)(o.Ay,{item:!0,xs:3,className:"admin-buttons",children:[(0,M.jsxs)(m.A,{variant:"contained",className:"image-button",component:"label",endIcon:(0,M.jsx)(k.A,{}),children:["Profile Photo",(0,M.jsx)("input",{name:"profile_image",hidden:!0,accept:"image/*",type:"file",onChange:e=>this.onImageChange(e,"profile_image"),ref:this.profile_imageRef})]}),this.state.profile_image||this.state.existing_profile_image?(0,M.jsxs)(u.A,{sx:{width:"100%",height:110},cols:12,rowHeight:110,children:[this.state.existing_profile_image?(0,M.jsx)(p.A,{style:{height:"110px",width:"100px"},children:(0,M.jsxs)("div",{style:{position:"relative",width:"100px"},children:[(0,M.jsx)("img",{src:this.state.existing_profile_image,loading:"lazy",style:{height:"100px",width:"100px"}}),(0,M.jsx)("span",{style:{position:"absolute",top:"0px",right:"0px",cursor:"pointer"},children:(0,M.jsx)(S.A,{color:"error",onClick:()=>this.deleteExistingImage("profile_image")})})]})}):null,this.state.profile_image?(0,M.jsx)(p.A,{style:{height:"110px",width:"100px"},children:(0,M.jsxs)("div",{style:{position:"relative",width:"100px"},children:[(0,M.jsx)("img",{src:this.getImageSrc(this.state.profile_image),loading:"lazy",style:{height:"100px",width:"100px"}}),(0,M.jsx)("span",{style:{position:"absolute",top:"0px",right:"0px",cursor:"pointer"},children:(0,M.jsx)(S.A,{color:"error",onClick:()=>this.deleteImage("profile_image")})})]})}):null]}):null]}),(0,M.jsxs)(o.Ay,{item:!0,xs:12,md:6,className:"admin-buttons",children:[(0,M.jsxs)(m.A,{variant:"contained",className:"image-button",component:"label",sx:{maxWidth:"260px"},endIcon:(0,M.jsx)(k.A,{}),children:["Documents",(0,M.jsx)("input",{name:"documents",hidden:!0,type:"file",onChange:this.onDocumentChange,ref:this.documentRef,accept:"application/pdf, image/*",multiple:!0})]}),this.state.documents.length||this.state.existing_documents.length?(0,M.jsxs)(u.A,{sx:{width:"100%",height:110},cols:12,rowHeight:110,children:[this.state.existing_documents.map(((e,t)=>(0,M.jsx)(p.A,{style:{height:"100px",width:"100px"},children:(0,M.jsxs)("div",{style:{position:"relative",width:"100px"},children:[(0,M.jsx)(N.A,{file:e.path}),(0,M.jsx)("span",{style:{position:"absolute",top:"0px",right:"0px",cursor:"pointer"},children:(0,M.jsx)(S.A,{color:"error",onClick:()=>this.deleteExistingDocument(t)})})]})},t))),this.state.documents.map(((e,t)=>(0,M.jsx)(p.A,{style:{height:"100px",width:"100px"},children:(0,M.jsxs)("div",{style:{position:"relative",width:"100px"},children:[(0,M.jsx)(N.A,{file:e}),(0,M.jsx)("span",{style:{position:"absolute",top:"0px",right:"0px",cursor:"pointer"},children:(0,M.jsx)(S.A,{color:"error",onClick:()=>this.deleteDocument(t)})})]})},t)))]}):null]})]})}),(0,M.jsx)(o.Ay,{item:!0,xs:12,children:(0,M.jsxs)(g.A,{spacing:1,direction:"row",className:"ratn-footer-buttons",justifyContent:"flex-end",children:[(0,M.jsx)(f.A,{className:"conf-button",variant:"contained",type:"button",loading:a,disabled:a,onClick:this.handleSubmit,children:"Save"}),a?null:(0,M.jsx)(m.A,{variant:"outlined",className:"close-button",onClick:()=>this.props.navigate((0,x.zr)((0,x.mA)(this.state.auth))+"/investors"),children:"Cancel"})]})})]})})})}}const V=(0,_.Gh)((0,v.A)((0,i.connect)((e=>({actionCalled:e.superadmin.investor.actionCalled,createSuccess:e.superadmin.investor.createSuccess,editSuccess:e.superadmin.investor.editSuccess,successMessage:e.superadmin.investor.successMessage,errorMessage:e.superadmin.investor.errorMessage,countryList:e.superadmin.country.items,auth:e.auth})),(e=>({dispatch:e,actions:(0,y.bindActionCreators)({countryList:C.HH,stateList:j.MO,investorUpdate:w.Mj,investorCreate:w.Jo},e)})))(R)))},41307:(e,t,a)=>{a.d(t,{A:()=>l});var s=a(63696);const i=a.p+"assets/Icon_pdf_file.png";var n=a(62540);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class r extends s.Component{constructor(e){super(e),o(this,"getImageSrc",(e=>URL.createObjectURL(e))),o(this,"handleClick",(e=>{this.state.viewImage&&window.open(e,"_blank").focus()})),this.state={file:this.props.file,viewImage:this.props.viewImage||!1}}static getDerivedStateFromProps(e,t){let a={};return e.file!==t.file&&(a.file=e.file),"viewImage"in e&&e.viewImage!==t.viewImage&&(a.viewImage=e.viewImage),a}render(){let e=this.state.file,t="";return"object"==typeof e?(t=e.type,e=this.getImageSrc(e)):t=e.split(".").pop(),(0,n.jsx)("div",{children:"application/pdf"==t||"pdf"==t?(0,n.jsx)("img",{src:i,loading:"lazy",style:{cursor:"pointer"},onClick:()=>this.handleClick(e)}):(0,n.jsx)("img",{src:e,loading:"lazy",style:{cursor:"pointer"},onClick:()=>this.handleClick(e)})})}}const l=r}}]);