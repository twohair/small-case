import{d as p,r as d,o as t,c as s,a as x,F as f,b as h,e as m,w as v,n as y,f as g,g as k,t as C,_ as N,u as w,h as S}from"./index.4b894367.js";const A={class:"menu"},B=p({__name:"index",props:{routes:{default:()=>[]}},setup(o){const r=d(o.routes.filter(n=>n.name!=="menu"));return(n,_)=>{const i=g("router-link");return t(),s("div",A,[x("ul",null,[(t(!0),s(f,null,h(r.value,e=>{var c,u;return t(),s("li",{key:e.name},[m(i,{style:y(`--clr: ${e.meta.hoverColor}`),to:e.path,"data-text":`\xA0${(u=(c=e.meta)==null?void 0:c.showName)==null?void 0:u.toString()}`},{default:v(()=>{var l;return[k("\xA0"+C((l=e.meta)==null?void 0:l.showName)+"\xA0",1)]}),_:2},1032,["style","to","data-text"])])}),128))])])}}});const V=N(B,[["__scopeId","data-v-c76c7446"]]),F=p({__name:"index",setup(o){const a=w().options.routes;return(r,n)=>{const _=V;return t(),s("div",null,[m(_,{ref:"menu",routes:S(a)},null,8,["routes"])])}}});export{F as default};