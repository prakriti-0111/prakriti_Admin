"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4106],{62716:(s,e,t)=>{t.r(e),t.d(e,{default:()=>l});var a=t(63696),r=t(52821),c=t(44058),u=t(66098),o=t(50977),i=t(51449),p=t(5795),n=t(45892),h=t(62540);class d extends a.Component{constructor(s){super(s),this.state={actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,auth:this.props.auth}}static getDerivedStateFromProps(s,e){let t={};return s.actionCalled!==e.actionCalled&&(t.actionCalled=s.actionCalled),s.createSuccess!==e.createSuccess&&(t.createSuccess=s.createSuccess),s.successMessage!==e.successMessage&&(t.successMessage=s.successMessage),s.errorMessage!==e.errorMessage&&(t.errorMessage=s.errorMessage),s.auth!==e.auth&&(t.auth=s.auth),t}componentDidUpdate(){this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:p.gj}),this.props.navigate((0,n.zr)((0,n.mA)(this.state.auth))+"/products")):(this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:p.gj})))}render(){return(0,h.jsx)(u.A,{title:"Product Create",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.A,{})})})}}const l=(0,i.Gh)((0,o.A)((0,r.connect)((s=>({actionCalled:s.superadmin.product.actionCalled,createSuccess:s.superadmin.product.createSuccess,successMessage:s.superadmin.product.successMessage,errorMessage:s.superadmin.product.errorMessage,auth:s.auth})),(s=>({dispatch:s})))(d)))}}]);