"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[265],{8265:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var i=t(5893),n=t(7294),a=t(5248),c=t(927),l=t(7026),r=t(1829),d=t.n(r),j=t(7920),o=t(7484),h=t.n(o);d().vfs=j.I.vfs;var x=t(6770);const g="npNMG9TrRBnzufN8vWAv";var b=function(e,s,t,i){return new(t||(t=Promise))((function(n,a){function c(e){try{r(i.next(e))}catch(e){a(e)}}function l(e){try{r(i.throw(e))}catch(e){a(e)}}function r(e){var s;e.done?n(e.value):(s=e.value,s instanceof t?s:new t((function(e){e(s)}))).then(c,l)}r((i=i.apply(e,s||[])).next())}))};const m=()=>{const{request:e}=(0,c.i)(),{years:s,isLoaderYear:t}=(0,l.X)((e=>e.yearReducer)),{id_user:r,id_role:j,id_avn_user:o}=(0,l.X)((e=>e.authReducer)),{id_group:m,name:u,surname:v}=(0,l.X)((e=>e.userInfoReducer)),[f,O]=n.useState([]),{ws:p,isLoaderWs:N}=(0,l.X)((e=>e.wsReducer)),[y,w]=n.useState({value:null,label:""}),[_,S]=n.useState({value:null,label:""}),[$,k]=n.useState({value:null,label:""}),[W,D]=n.useState({semester:!1,journal:!1}),[Y,C]=n.useState([]),[z,B]=n.useState([]),[U,R]=n.useState(!1),[I,A]=n.useState(!1),M=(e,s)=>{if(e.target.checked)return B((e=>[...e,s]));B((e=>e.filter((e=>e.id!==s.id))))},X=s=>b(void 0,void 0,void 0,(function*(){I&&A(!1),Y.length&&C([]),D(Object.assign(Object.assign({},W),{journal:!0}));const{data:t}=yield e(`/teacher/search-student-detail?id_year=${y.value}&id_ws=${_.value}&id_role=${j}&id_avn_user=${o}&id_user=${r}&id_group=${m}&id_student=${r}&id_semester=${s}`);if(D(Object.assign(Object.assign({},W),{journal:!1})),t.length)return C(t);A(!0)})),H=s=>b(void 0,void 0,void 0,(function*(){D(Object.assign(Object.assign({},W),{semester:!0}));const{data:t}=yield e(`/student/passes/semester?id_ws=${s}&id_group=${m}&id_student=${r}`);D(Object.assign(Object.assign({},W),{semester:!1})),O(t)}));return n.useEffect((()=>{if(s.length){const{id_a_year:e,p32:t}=s.find((e=>1==e.defaultValue));w({label:t,value:e})}}),[s]),n.useEffect((()=>{if(p.length){const{id_ws:e,ws:s}=p.find((e=>1==e.defaultValue));S({value:e,label:s}),H(e)}}),[p]),(0,i.jsxs)(i.Fragment,{children:[U&&(0,i.jsx)(a.Du,Object.assign({title:"?????????????????? ????????????????????",hide:()=>{document.body.style.overflowY="visible",R(!1)}},{children:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h4",Object.assign({className:"flex justify-content-between"},{children:[(0,i.jsxs)("div",Object.assign({style:{width:"100%",textAlign:"right"}},{children:["????????: ",z[0].shifr]})),(0,i.jsxs)("div",Object.assign({style:{width:"100%",textAlign:"right"}},{children:["??????????:"," ",z.reduce(((e,s)=>e+s.price),0)," ","??????"]}))]})),(0,i.jsxs)("table",Object.assign({className:g},{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"???"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"?????? ??????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"??????????????????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????????"}))]})}),(0,i.jsx)("tbody",{children:z.map(((e,s)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",Object.assign({className:"text-center"},{children:s+1})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.discipline})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.short_name})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.t_fio})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.visitDate})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.otsenka}))]},e.id)))})]})),(0,i.jsx)("div",Object.assign({className:"flex justify-content-end mt-2"},{children:(0,i.jsx)(a.zx,{value:"??????????????????",onClick:()=>{((e,s,t)=>{var i;const n={content:[{text:"?????????????? ??????????????????",fontSize:18,bold:!0,alignment:"center"},{text:`??.??.??.: ${t} ${s}`,fontSize:15,bold:!0,italics:!0,margin:[0,20,0,0]},{text:`??????????: ${e.reduce(((e,s)=>e+s.price),0)} ??????????`,fontSize:14,bold:!0,italics:!0,margin:[0,10,0,0]},{text:`????????: ${null===(i=e[0])||void 0===i?void 0:i.shifr}`,fontSize:14,bold:!0,italics:!0,margin:[0,10,0,0]},{text:"????????????????????(??):",margin:[0,20,0,0],italics:!0},{ol:e.map((e=>`${e.visitDate} ${e.short_name} ${e.discipline} ${e.t_fio}`)),fontSize:13,italics:!0,margin:[0,10,0,0]},{text:`????????: ${h()(new Date).format("DD.MM.YYYY HH:mm")}`,fontSize:11,italics:!0,margin:[0,10,0,0]}]};d().createPdf(n).download("??????????????????")})(z,u,v),document.body.style.overflowY="visible",R(!1),b(void 0,void 0,void 0,(function*(){const s=z.map((e=>e.id));yield e("/student/receipt","POST",{ids:s,id_role:j,id_user:r,cipher:z[0].shifr}),X($.value),B([])}))}})}))]})})),(0,i.jsx)("div",Object.assign({className:"box_container"},{children:(0,i.jsxs)("div",Object.assign({className:"mYuZ3YANhvJWz7_W7xeb"},{children:[(0,i.jsx)("div",Object.assign({className:"w-100"},{children:(0,i.jsx)(a.uU,{placeholder:"?????????????? ??????",label:"?????????????? ??????",value:y,options:s.map((e=>({value:e.id_a_year,label:e.p32}))),onChange:e=>{w(e),S({value:null,label:""}),$.value&&k({value:null,label:""}),Y.length&&C([])},loader:t})})),(0,i.jsx)("div",Object.assign({className:"w-100"},{children:(0,i.jsx)(a.uU,{placeholder:"??????????????????",label:"??????????????????",value:_.value?_:"",options:p.map((e=>({value:e.id_ws,label:e.ws}))),onChange:e=>{S(e),$.value&&k({value:null,label:""}),H(e.value),Y.length&&C([])},loader:N})})),(0,i.jsx)("div",Object.assign({className:"w-100"},{children:(0,i.jsx)(a.uU,{placeholder:"??????????????",label:"??????????????",value:$.value?$:"",options:_.value?f.map((e=>({value:e.id_semester,label:e.semester}))):[],onChange:e=>{k(e),X(e.value)},loader:W.semester,isDisabled:!_.value})}))]}))})),(0,i.jsxs)("div",Object.assign({style:{minHeight:"200px"},className:x.eU?"box_container w-100 mt-2":"mt-2"},{children:[W.journal&&(0,i.jsx)("div",Object.assign({className:"flex justify-content-center mt-2"},{children:(0,i.jsx)(a.aN,{})})),Y.length?(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between"},{children:[(0,i.jsxs)("h3",{children:[(0,i.jsx)("span",Object.assign({style:{fontWeight:"400",marginRight:"5px"}},{children:"???????? ???? ???????? ??????????????: "})),Y[0].priceDefault," ??????"]}),(0,i.jsxs)("h3",{children:[(0,i.jsx)("span",Object.assign({style:{fontWeight:"400",marginRight:"5px"}},{children:"????????: "})),Y[0].shifr]})]})):null,I&&(0,i.jsx)("p",Object.assign({className:"text-center mt-2"},{children:"???????????? ???? ??????????????!"})),x.eU?(0,i.jsx)("div",Object.assign({style:{height:"64vh",overflowY:"auto"}},{children:(0,i.jsxs)("table",Object.assign({className:g},{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"???"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"?????? ??????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"??????????????????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"?????? ??????????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????????????"})),(0,i.jsx)("th",Object.assign({className:"text-center"},{children:"????????????????"}))]})}),(0,i.jsx)("tbody",{children:Y.map(((e,s)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",Object.assign({className:"text-center"},{children:s+1})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.discipline})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.short_name})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.t_fio})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.visitDate})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.otsenka})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.working_off})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:e.paymentStatus})),(0,i.jsx)("td",Object.assign({className:"text-center"},{children:!!e.statusUpd&&(0,i.jsx)(a.II,{onChange:s=>M(s,e),value:String(e.id),type:"checkbox",style:{width:"16px",height:"16px",cursor:"pointer",accentColor:"#49D399"}})}))]},e.id)))})]}))})):Y.map(((e,s)=>(0,i.jsxs)("div",Object.assign({className:"o_Jh6jVCocx5gxYnmwwt"},{children:[(0,i.jsx)("p",Object.assign({className:"color-dark"},{children:e.visitDate})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1 gap-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"????????????????????"})),(0,i.jsx)("div",Object.assign({style:{color:"#64748B",fontWeight:"bold"}},{children:e.discipline}))]})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"?????? ??????????????"})),(0,i.jsx)("div",Object.assign({style:{color:"#64748B",fontWeight:"bold"}},{children:e.short_name}))]})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1 gap-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"??????????????????????????"})),(0,i.jsx)("div",Object.assign({style:{color:"#64748B",fontWeight:"bold"}},{children:e.t_fio}))]})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1 gap-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"????????"})),(0,i.jsx)("div",Object.assign({style:{color:"#64748B",fontWeight:"bold"}},{children:e.visitDate}))]})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1 gap-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"????????????"})),(0,i.jsx)("div",Object.assign({style:{color:"#64748B",fontWeight:"bold"}},{children:e.otsenka}))]})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1 gap-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"?????? ??????????????????"})),(0,i.jsx)("div",Object.assign({style:{color:"#64748B",fontWeight:"bold"}},{children:e.working_off}))]})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1 gap-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"????????????????"})),(0,i.jsx)("div",Object.assign({style:{color:"#64748B",fontWeight:"bold"}},{children:e.paymentStatus}))]})),(0,i.jsxs)("div",Object.assign({className:"flex justify-content-between mt-1 gap-1"},{children:[(0,i.jsx)("div",Object.assign({className:"color-primary"},{children:"????????????????"})),!!e.statusUpd&&(0,i.jsx)(a.II,{onChange:s=>M(s,e),value:String(e.id),type:"checkbox",style:{width:"16px",height:"16px",cursor:"pointer",accentColor:"#49D399"}})]}))]})))),(0,i.jsx)("div",Object.assign({className:x.eU?"flex justify-content-end":"bBmLKYKJWM5vtvrxer7w"},{children:(0,i.jsx)(a.zx,{value:"????????????????????????",disabled:!z.length,onClick:()=>{document.body.style.overflowY="hidden",R(!0)}})}))]}))]})}}}]);