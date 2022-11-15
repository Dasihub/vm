"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[28],{1028:(e,s,a)=>{a.r(s),a.d(s,{default:()=>v});var l=a(5893),i=a(7294),t=a(1824),n=a(7026),c=a(927),d=a(9948),u=a(5495);var r=function(e,s,a,l){return new(a||(a=Promise))((function(i,t){function n(e){try{d(l.next(e))}catch(e){t(e)}}function c(e){try{d(l.throw(e))}catch(e){t(e)}}function d(e){var s;e.done?i(e.value):(s=e.value,s instanceof a?s:new a((function(e){e(s)}))).then(n,c)}d((l=l.apply(e,s||[])).next())}))};const v=()=>{const{request:e}=(0,c.i)(),{ws:s}=(0,n.X)((e=>e.wsReducer)),{lang:a}=(0,n.X)((e=>e.langReducer)),{years:v}=(0,n.X)((e=>e.yearReducer)),{id_group:o}=(0,n.X)((e=>e.userInfoReducer)),{id_user:b}=(0,n.X)((e=>e.authReducer)),[j,g]=i.useState([]),[_,h]=i.useState(),[p,m]=i.useState([]),[O,$]=i.useState([]),[f,x]=i.useState([]),[w,y]=i.useState(),[C,N]=i.useState(),[S,k]=i.useState({discipline:!1,semester:!1,teacher:!1,journal:!1}),[D,U]=i.useState({v_year:{value:null,label:""},v_ws:{value:null,label:""},v_semester:{value:null,label:""},v_teacher:{value:null,label:""}}),E=(0,d.t)(f,"short_name");i.useEffect((()=>{if(v.length){const{id_a_year:e,p32:s}=v.find((e=>1==e.defaultValue));U(Object.assign(Object.assign({},D),{v_year:{value:e,label:s}}))}}),[v]);const{v_year:R,v_ws:X,v_semester:q,v_teacher:A}=D;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",Object.assign({className:"box_container"},{children:[(0,l.jsx)("h2",Object.assign({className:"text-center "},{children:"Студент"})),(0,l.jsxs)("div",Object.assign({className:"_WaUejHbB3qj_okgATCs mt-2"},{children:[(0,l.jsx)("div",Object.assign({className:"w-100"},{children:(0,l.jsx)(t.uU,{placeholder:"Учебный год",label:"Учебный год",value:R,options:v.map((e=>({value:e.id_a_year,label:e.p32}))),onChange:e=>{U(Object.assign(Object.assign({},D),{v_year:e,v_semester:{value:null,label:""},v_ws:{value:null,label:""},v_teacher:{value:null,label:""}})),h(void 0),f.length&&x([])}})})),(0,l.jsx)("div",Object.assign({className:"w-100"},{children:(0,l.jsx)(t.uU,{placeholder:"Полугодие",label:"Полугодие",value:X.value?X:"",options:s.map((e=>({value:e.id_ws,label:e.ws}))),onChange:s=>{U(Object.assign(Object.assign({},D),{v_ws:s,v_semester:{value:null,label:""},v_teacher:{value:null,label:""}})),h(void 0),j.length&&g([]),(s=>{r(void 0,void 0,void 0,(function*(){k(Object.assign(Object.assign({},S),{discipline:!0}));const{data:l}=yield e(`/student/discipline/?id_year=${R.value}&id_ws=${s}&id_group=${o}&id_student=${b}&lang=${a}`),i=l.map(((e,s)=>Object.assign(Object.assign({},e),{num:s})));g(i),k(Object.assign(Object.assign({},S),{discipline:!1}))}))})(s.value),p.length&&m([]),O.length&&$([]),f.length&&x([])},isDisabled:!R.value})})),(0,l.jsx)("div",Object.assign({className:"w-100"},{children:(0,l.jsx)(t.uU,{placeholder:"Дисциплина",label:"Дисциплина",value:(null==_?void 0:_.id_discipline)?{value:null==_?void 0:_.num,label:null==_?void 0:_.discipline}:"",options:j.map((e=>({value:e.num,label:e.discipline}))),loader:S.discipline,onChange:s=>{const l=j.find((e=>e.num==s.value));var i;h(l),p.length&&m([]),i=null==l?void 0:l.id_discipline,r(void 0,void 0,void 0,(function*(){k(Object.assign(Object.assign({},S),{semester:!0}));const{data:s}=yield e(`/student/semester/?id_year=${R.value}&id_ws=${X.value}&id_group=${o}&id_student=${b}&id_discipline=${i}&lang=${a}`);m(s),k(Object.assign(Object.assign({},S),{semester:!1}))})),O.length&&$([]),f.length&&x([])},isDisabled:!X.value})}))]})),(0,l.jsxs)("div",Object.assign({className:"_WaUejHbB3qj_okgATCs mt-2"},{children:[(0,l.jsx)("div",Object.assign({className:"w-100"},{children:(0,l.jsx)(t.uU,{placeholder:"Семестр",label:"Семестр",value:q.value?q:"",options:p.map((e=>({value:e.id_semester,label:e.p43}))),loader:S.semester,onChange:s=>{var l;U(Object.assign(Object.assign({},D),{v_semester:s,v_teacher:{value:null,label:""}})),O.length&&$([]),l=s.value,r(void 0,void 0,void 0,(function*(){k(Object.assign(Object.assign({},S),{teacher:!0}));const{data:s}=yield e(`/student/teacher/?id_year=${R.value}&id_ws=${X.value}&id_group=${o}&id_student=${b}&id_discipline=${null==_?void 0:_.id_discipline}&id_semester=${l}&is_select=${null==_?void 0:_.isSelect}&lang=${a}`);$(s),k(Object.assign(Object.assign({},S),{teacher:!1}))})),f.length&&x([])},isDisabled:!(null==_?void 0:_.id_discipline)})})),(0,l.jsx)("div",Object.assign({className:"w-100"},{children:(0,l.jsx)(t.uU,{placeholder:"Преподаватель",label:"Преподаватель",value:A.value?A:"",options:O.map((e=>({value:e.id_teacher,label:e.t_fio}))),loader:S.teacher,onChange:s=>{var l;U(Object.assign(Object.assign({},D),{v_teacher:s})),l=s.value,r(void 0,void 0,void 0,(function*(){k(Object.assign(Object.assign({},S),{journal:!0}));const{data:s}=yield e(`/student/journal/?id_year=${R.value}&id_ws=${X.value}&id_group=${o}&id_student=${b}&id_discipline=${null==_?void 0:_.id_discipline}&id_semester=${q.value}&is_select=${null==_?void 0:_.isSelect}&credit=${null==_?void 0:_.credits}&id_teacher=${l}&lang=${a}`);x(s),k(Object.assign(Object.assign({},S),{journal:!1}));const i=(0,d.t)(s,"visitDate");Object.keys(i).forEach(((e,s)=>{const a=(0,d.t)(i[e],"short_name");i[e]=a,Object.keys(a).forEach(((s,a)=>{const l=(0,d.t)(i[e][s],"timesCount");i[e][s]=l}))}));let t={};Object.keys(i).forEach((e=>{t[e]=0})),s.forEach((e=>{e.timesCount>t[e.visitDate]&&(t[e.visitDate]=e.timesCount)})),y(i),N(t)}))},isDisabled:!q.value})}))]}))]})),S.journal?(0,l.jsx)("div",Object.assign({className:"_WaUejHbB3qj_okgATCs mt-2"},{children:(0,l.jsx)(t.aN,{})})):f.length?(0,l.jsx)(u.ih,{data:w,dataMax:C,visitDateGrouped:E}):(0,l.jsx)("p",Object.assign({className:"text-center mt-4"},{children:"Пока нет данных!"}))]})}}}]);