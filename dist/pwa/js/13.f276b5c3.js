(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"0b0d":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"lista-usuario"},[a("q-page",{attrs:{padding:""}},[a("q-table",{attrs:{title:"Lista de Usuarios",data:t.usuarios,columns:t.columns,"row-key":"id","hide-bottom":"","rows-per-page-options":[0],pagination:t.pagination,loading:t.loading},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"body-cell-id",fn:function(t){return a("q-td",{attrs:{props:t}},[a("q-icon",{attrs:{name:"person",size:"1.5rem",color:"gray"}})],1)}},{key:"body-cell-tipo",fn:function(e){return a("q-td",{attrs:{props:e}},[a("q-badge",{attrs:{color:t.getColorTipo(e.row.tipo),dark:""}},[t._v(t._s(e.row.tipo))])],1)}},{key:"body-cell-action",fn:function(e){return a("q-td",{attrs:{props:e}},[a("q-btn",{attrs:{color:"primary",flat:"",icon:"edit"},on:{click:function(a){return t.edit(e.row)}}}),a("q-btn",{attrs:{color:"red",flat:"",icon:"delete"},on:{click:function(a){return t.showModalDelete(e.row)}}})],1)}}])}),a("paginacao",{attrs:{last_page:t.lastPage,current_page:t.currentPage},on:{input:function(e){return t.load(e)}}}),a("q-page-sticky",{attrs:{position:"bottom-right",offset:[18,18]}},[a("q-btn",{attrs:{fab:"",icon:"add",color:"primary"},on:{click:function(e){t.showModal=!0}}})],1)],1),a("modal-cadastro",{attrs:{edit:t.editarUsuario,show:t.showModal},on:{fechar:t.fecharModal,salvar:function(e){return t.onSubmit(e)}}}),a("modal-delete",{attrs:{dialog:t.showDeleteModal,item:t.editarUsuario},on:{fechar:function(e){t.showDeleteModal=!1},deletar:function(e){return t.deletar(e)}}}),a("footer-component")],1)},o=[],n=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("386d"),a("967e")),i=a.n(n),s=(a("96cf"),a("fa84")),c=a.n(s),l=a("c47a"),u=a.n(l),d=a("9989"),p=a("eaac"),f=a("de5e"),h=a("74f7"),m=a("bac0"),g=a("7734"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-cadastro-usuario"},[a("q-dialog",{attrs:{value:t.show},on:{input:t.fechar}},[a("q-card",{staticStyle:{width:"700px","max-width":"100vw"}},[a("q-card-section",{staticClass:"bg-orange text-white"},[a("div",{staticClass:"text-h6"},[t._v("Cadastro Usuario")])]),a("q-card-section",[a("q-form",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.id,expression:"usuario.id"}],attrs:{type:"hidden"},domProps:{value:t.usuario.id},on:{input:function(e){e.target.composing||t.$set(t.usuario,"id",e.target.value)}}}),a("div",{staticClass:"q-gutter-md"},[a("q-input",{attrs:{outlined:"",label:"Nome"},model:{value:t.usuario.name,callback:function(e){t.$set(t.usuario,"name",e)},expression:"usuario.name"}}),a("q-input",{attrs:{readonly:null!=t.edit.id,outlined:"",label:"Email"},model:{value:t.usuario.email,callback:function(e){t.$set(t.usuario,"email",e)},expression:"usuario.email"}}),a("q-input",{attrs:{readonly:null!=t.edit.id,outlined:"",type:"password"},model:{value:t.usuario.password,callback:function(e){t.$set(t.usuario,"password",e)},expression:"usuario.password"}}),a("q-select",{attrs:{filled:"",options:t.tipo,label:"Tipo"},model:{value:t.usuario.tipo,callback:function(e){t.$set(t.usuario,"tipo",e)},expression:"usuario.tipo"}})],1)])],1),a("q-card-actions",{staticClass:"bg-white text-teal",attrs:{align:"right"}},[a("q-btn",{staticClass:"q-mt-md",attrs:{color:"grey",label:"Fechar"},on:{click:t.fechar}}),a("q-btn",{staticClass:"q-mt-md",attrs:{label:"Salvar",type:"submit",color:"primary"},on:{click:t.salvar}})],1)],1)],1)],1)},w=[],v=a("24e8"),y=a("0378");function O(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function P(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?O(Object(a),!0).forEach((function(e){u()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):O(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var q={name:"ModalCadastroUsuario",components:{QDialog:v["a"],QForm:y["a"]},props:["show","edit"],data:function(){return{tipo:["Administrador","Coordenador","Usuario"],usuario:{}}},methods:{salvar:function(){this.$emit("salvar",this.usuario)},fechar:function(){this.$emit("fechar")}},watch:{edit:function(t){this.usuario=P({},t)}}},j=q,k=a("2877"),Q=a("eebe"),x=a.n(Q),C=a("f09f"),D=a("a370"),M=a("27f9"),S=a("ddd8"),U=a("4b7e"),_=a("9c40"),$=Object(k["a"])(j,b,w,!1,null,null,null),E=$.exports;x()($,"components",{QDialog:v["a"],QCard:C["a"],QCardSection:D["a"],QForm:y["a"],QInput:M["a"],QSelect:S["a"],QCardActions:U["a"],QBtn:_["a"]});var T=a("b83f"),A=a("f0e1"),F=a("4c03");function R(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function B(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?R(Object(a),!0).forEach((function(e){u()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var I={name:"ListaUsuario",components:{QPage:d["a"],QTable:p["a"],QPageSticky:f["a"],ModalCadastro:E,ModalDelete:T["a"],QInnerLoading:h["a"],Paginacao:A["a"],FooterComponent:F["a"]},data:function(){return{loading:!1,currentPage:0,lastPage:0,UsuarioService:new m["a"],RegisterService:new g["a"],showModal:!1,showDeleteModal:!1,editarUsuario:{},usuarios:[],colors:{Administrador:function(){return"primary"},Coordenador:function(){return"amber"},Usuario:function(){return"grey"},default:function(){return"red"}},columns:[{name:"id",style:"min-width: 15px; width: 15px",label:"",field:"id",align:"center"},{name:"name",label:"Nome",field:"name",align:"left"},{name:"email",label:"Email",field:"email",align:"left"},{name:"tipo",label:"Tipo",field:"tipo",align:"left"},{name:"action",label:"Ação",field:"action",align:"center"}],pagination:{page:1,rowsPerPage:0}}},methods:{getColorTipo:function(t){return(this.colors[t]||this.colors.default)()},edit:function(t){this.editarUsuario=B({},t),this.showModal=!0},onSubmit:function(){var t=c()(i.a.mark((function t(e){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.RegisterService.createOrUpdate(e);case 2:this.load(),this.onReset(),this.fecharModal();case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),load:function(){var t=c()(i.a.mark((function t(e){var a;return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.next=3,this.UsuarioService.search({},e);case 3:a=t.sent,this.loading=!1,this.lastPage=a.last_page,this.currentPage=a.current_page,this.usuarios=a.data;case 8:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),onReset:function(){this.usuario={}},fecharModal:function(){this.editarUsuario={},this.showModal=!1},showModalDelete:function(t){this.editarUsuario=t,this.showDeleteModal=!0},deletar:function(){var t=c()(i.a.mark((function t(e){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.UsuarioService.remove(e.id);case 2:this.showDeleteModal=!1,this.load();case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},mounted:function(){this.load()}},L=I,N=a("db86"),J=a("0016"),z=a("58a8"),G=Object(k["a"])(L,r,o,!1,null,null,null);e["default"]=G.exports;x()(G,"components",{QPage:d["a"],QTable:p["a"],QTd:N["a"],QIcon:J["a"],QBadge:z["a"],QBtn:_["a"],QPageSticky:f["a"]})}}]);