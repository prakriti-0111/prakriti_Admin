"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5231],{5231:(e,t,s)=>{s.r(t),s.d(t,{default:()=>u});var i=s(63696),n=s(52821),r=s(45271),o=s(36213),c=s(42717),a=s(88441),m=s(66098),p=s(50977),d=s(16078),h=s(62540);class l extends i.Component{constructor(e){super(e),this.state={item:this.props.item}}componentDidMount(){this.props.actions.employeeFetch(this.props.params.id)}static getDerivedStateFromProps(e,t){let s={};return e.item!==t.item&&(s.item=e.item),s}render(){return(0,h.jsx)(m.A,{title:"Employee Edit",children:(0,h.jsx)("div",{children:this.state.item?(0,h.jsx)(c.A,{formData:this.state.item}):(0,h.jsx)(r.Ay,{container:!0,justifyContent:"center",children:(0,h.jsx)(o.A,{})})})})}}const u=(0,p.A)((0,n.connect)((e=>({item:e.superadmin.employee.item||null})),(e=>({dispatch:e,actions:(0,a.bindActionCreators)({employeeFetch:d.Xs},e)})))(l))}}]);