"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6730],{26730:(s,e,t)=>{t.r(e),t.d(e,{default:()=>m});var a=t(63696),n=t(52821),r=t(45271),i=t(36213),l=t(98670),c=t(88441),o=t(66098),d=t(50977),h=t(51449),p=t(26118),u=t(62540);class j extends a.Component{constructor(s){super(s),this.state={id:this.props.params.id,sale:this.props.sale}}componentDidMount(){this.props.actions.salesEdit(this.state.id)}static getDerivedStateFromProps(s,e){let t={};return s.sale!==e.sale&&(t.sale=s.sale),t}render(){return(0,u.jsx)(o.A,{title:"Return Sale",children:(0,u.jsx)("div",{children:this.state.sale?(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(l.A,{formData:this.state.sale})}):(0,u.jsx)(r.Ay,{container:!0,justifyContent:"center",children:(0,u.jsx)(i.A,{})})})})}}const m=(0,h.Gh)((0,d.A)((0,n.connect)((s=>({sale:s.superadmin.sales.sale})),(s=>({dispatch:s,actions:(0,c.bindActionCreators)({salesEdit:p.zK},s)})))(j)))}}]);