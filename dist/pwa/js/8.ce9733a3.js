(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{6028:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"lista-atividade"},[a("q-page",{attrs:{padding:""}},[a("q-table",{attrs:{title:"Lista de Atividades",data:t.atividades,columns:t.columns,"row-key":"id","hide-bottom":"","rows-per-page-options":[],pagination:t.pagination,loading:t.loading},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"loading",fn:function(){return[a("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"body-cell-descricao",fn:function(e){return a("q-td",{attrs:{props:e}},[t._v("\n        "+t._s(e.row.descricao.length>40?e.row.descricao.substring(0,40)+"...":e.row.descricao)+"\n      ")])}},{key:"body-cell-id",fn:function(t){return a("q-td",{attrs:{props:t}},[a("q-icon",{attrs:{name:"event_note",size:"1.5rem",color:"gray"}})],1)}},{key:"body-cell-cliente",fn:function(e){return a("q-td",{attrs:{props:e}},[t._v("\n        "+t._s(e.row.cliente.nome)+"\n      ")])}},{key:"body-cell-status",fn:function(e){return a("q-td",{attrs:{props:e}},[a("q-badge",{attrs:{color:t.getColorStatus(e.row.status),dark:""}},[t._v(t._s(e.row.status))])],1)}},{key:"body-cell-faturado",fn:function(e){return a("q-td",{attrs:{props:e}},[a("q-badge",{attrs:{color:"Sim"===e.row.faturado?"green":"red",dark:""}},[t._v(t._s(e.row.faturado))])],1)}},{key:"body-cell-action",fn:function(e){return a("q-td",{attrs:{props:e}},[t.isAdmin||t.isCoordenador?a("q-btn",{attrs:{color:"primary",flat:"",icon:"edit"},on:{click:function(a){return t.edit(e.row)}}}):t._e(),t.isAdmin||t.isCoordenador?a("q-btn",{attrs:{color:"red",flat:"",icon:"delete"},on:{click:function(a){return t.showModalDelete(e.row)}}}):t._e(),a("q-btn",{attrs:{color:"grey",flat:"",placeholder:"Detalhes da atividade",icon:"chat"},on:{click:function(a){return t.editDetalhe(e.row)}}})],1)}}])},[t._v("\n      I\n\n      "),t._v("\n\n      I\n      ")]),a("paginacao",{attrs:{last_page:t.lastPage,current_page:t.currentPage},on:{input:function(e){return t.load(e)}}}),a("q-page-sticky",{attrs:{position:"bottom-right",offset:[18,18]}},[a("q-btn",{attrs:{fab:"",icon:"add",color:"primary"},on:{click:function(e){t.showModal=!0}}})],1)],1),a("modal-cadastro",{attrs:{edit:t.editarAtividade,show:t.showModal},on:{fechar:t.fecharModal,salvar:function(e){return t.onSubmit(e)}}}),a("modal-detalhe",{attrs:{edit:t.editarAtividade,show:t.showModalDetalhe},on:{fechar:t.fecharModal,salvar:function(e){return t.onSubmit(e)}}}),a("modal-delete",{attrs:{dialog:t.showDeleteModal,item:t.editarAtividade},on:{fechar:function(e){t.showDeleteModal=!1},deletar:function(e){return t.deletar(e)}}}),a("footer-component")],1)},n=[],r=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("386d"),a("967e")),o=a.n(r),s=(a("96cf"),a("fa84")),d=a.n(s),l=a("c47a"),c=a.n(l),u=a("9989"),f=a("eaac"),p=a("de5e"),v=a("74f7"),h=a("2f62"),m=a("f699"),b=a("3955"),g=a("6dcd"),w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-cadastro-atividade"},[a("q-dialog",{attrs:{value:t.show},on:{input:t.fechar}},[a("q-card",{staticStyle:{width:"700px","max-width":"100vw"}},[a("q-card-section",{staticClass:"bg-orange text-white"},[a("div",{staticClass:"text-h6"},[t._v("Cadastro Atividade")])]),a("q-card-section",[a("q-form",[a("div",{staticClass:"q-gutter-md"},[a("q-input",{attrs:{outlined:"",type:"date","fill-mask":"",label:"Data Inicio"},model:{value:t.atividade.datacadastro,callback:function(e){t.$set(t.atividade,"datacadastro",e)},expression:"atividade.datacadastro"}}),a("q-input",{attrs:{outlined:"",type:"date","fill-mask":"",label:"Data Final Prevista"},model:{value:t.atividade.datafinalprevista,callback:function(e){t.$set(t.atividade,"datafinalprevista",e)},expression:"atividade.datafinalprevista"}}),a("q-input",{attrs:{outlined:"",type:"date","fill-mask":"",label:"Data Final"},model:{value:t.atividade.datafinal,callback:function(e){t.$set(t.atividade,"datafinal",e)},expression:"atividade.datafinal"}}),a("q-input",{attrs:{outlined:"",label:"Descricao"},model:{value:t.atividade.descricao,callback:function(e){t.$set(t.atividade,"descricao",e)},expression:"atividade.descricao"}}),a("q-select",{attrs:{filled:"",options:t.impostos,label:"Impostos"},model:{value:t.atividade.imposto,callback:function(e){t.$set(t.atividade,"imposto",e)},expression:"atividade.imposto"}}),a("q-input",{attrs:{outlined:"",label:"Saving"},model:{value:t.atividade.saving,callback:function(e){t.$set(t.atividade,"saving",e)},expression:"atividade.saving"}}),a("q-input",{attrs:{outlined:"",label:"Honorario"},model:{value:t.atividade.honorario,callback:function(e){t.$set(t.atividade,"honorario",e)},expression:"atividade.honorario"}}),a("q-select",{attrs:{"emit-value":"","map-options":"",filled:"",options:t.clientes,label:"Clientes"},model:{value:t.atividade.cliente_id,callback:function(e){t.$set(t.atividade,"cliente_id",e)},expression:"atividade.cliente_id"}}),a("q-select",{attrs:{filled:"",options:t.faturado,label:"Faturado"},model:{value:t.atividade.faturado,callback:function(e){t.$set(t.atividade,"faturado",e)},expression:"atividade.faturado"}}),a("q-select",{attrs:{filled:"",options:t.status,label:"Status"},model:{value:t.atividade.status,callback:function(e){t.$set(t.atividade,"status",e)},expression:"atividade.status"}}),a("q-select",{attrs:{"emit-value":"","map-options":"",filled:"",options:t.users,label:"Responsável"},model:{value:t.atividade.user_id,callback:function(e){t.$set(t.atividade,"user_id",e)},expression:"atividade.user_id"}}),a("q-input",{attrs:{outlined:"",type:"textarea",label:"Observações"},model:{value:t.atividade.obs,callback:function(e){t.$set(t.atividade,"obs",e)},expression:"atividade.obs"}})],1)])],1),a("q-card-actions",{staticClass:"bg-white text-teal",attrs:{align:"right"}},[a("q-btn",{staticClass:"q-mt-md",attrs:{color:"grey",label:"Fechar"},on:{click:t.fechar}}),a("q-btn",{staticClass:"q-mt-md",attrs:{label:"Salvar",type:"submit",color:"primary"},on:{click:t.salvar}})],1)],1)],1)],1)},y=[],O=(a("7f7f"),a("24e8")),k=a("0378"),q=a("21fa"),S=a("bac0");function x(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function D(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?x(Object(a),!0).forEach((function(e){c()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var P={name:"ModalCadastroAtividade",components:{QDialog:O["a"],QForm:k["a"]},props:["show","edit"],data:function(){return{clientes:[],users:[],ClienteService:new q["a"],UserService:new S["a"],impostos:["IRPJ/CSLL","PIS/COFINS","INSS","ISS","Outros"],faturado:["Sim","Não","N/A"],status:["Iniciado","Não Iniciado","Em andamento","Concluido"],atividade:{}}},methods:{salvar:function(){this.$emit("salvar",this.atividade)},fechar:function(){this.$emit("fechar")},loadClientes:function(){var t=d()(o.a.mark((function t(){var e;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.ClienteService.list();case 2:e=t.sent,this.clientes=e.data.map((function(t){return{label:t.nome,value:t.id}}));case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),loadUsers:function(){var t=d()(o.a.mark((function t(){var e;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.UserService.list();case 2:e=t.sent,this.users=e.data.map((function(t){return{label:t.name,value:t.id}}));case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){this.loadClientes(),this.loadUsers()},watch:{edit:function(t){this.atividade=D({},t)}}},j=P,_=a("2877"),C=a("eebe"),M=a.n(C),Q=a("f09f"),A=a("a370"),I=a("27f9"),$=a("ddd8"),F=a("4b7e"),E=a("9c40"),L=Object(_["a"])(j,w,y,!1,null,null,null),N=L.exports;M()(L,"components",{QDialog:O["a"],QCard:Q["a"],QCardSection:A["a"],QForm:k["a"],QInput:I["a"],QSelect:$["a"],QCardActions:F["a"],QBtn:E["a"]});var U=a("a27d"),B=a("4c03"),J=a("b83f"),R=a("f0e1");function T(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function H(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?T(Object(a),!0).forEach((function(e){c()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var z={name:"ListaAtividade",computed:H({},Object(h["b"])("user",["nomeUser","isAdmin","isCoordenador"])),components:{QPage:u["a"],QTable:f["a"],QPageSticky:p["a"],ModalCadastro:N,ModalDelete:J["a"],ModalDetalhe:U["default"],Paginacao:R["a"],QInnerLoading:v["a"],FooterComponent:B["a"]},data:function(){return{loading:!1,currentPage:0,lastPage:0,showDeleteModal:!1,AtividadeService:new m["a"],showModal:!1,showModalDetalhe:!1,editarAtividade:{},atividades:[],colors:{"Em andamento":function(){return"amber"},"Não Iniciado":function(){return"red"},Iniciado:function(){return"primary"},default:function(){return"green"}},columns:[{name:"id",style:"min-width: 15px; width: 15px",label:"",field:"id",align:"left"},{name:"datacadastro",label:"Data Inicio",field:"datacadastro",align:"center",format:function(t){return Object(g["a"])(t)}},{name:"datafinalprevista",label:"Data Prevista",field:"datafinalprevista",align:"center",format:function(t){return Object(g["a"])(t)}},{name:"datafinal",label:"Data Final",field:"datafinal",align:"center",format:function(t){return Object(g["a"])(t)}},{name:"descricao",style:"min-width: 150px; width: 150px",label:"Descrição",field:"descricao",align:"left"},{name:"status",label:"Status",field:"status",align:"center"},{name:"imposto",label:"Imposto",field:"imposto",align:"center"},{name:"saving",label:"Saving",field:"saving",align:"center",format:function(t){return Object(b["a"])(t)}},{name:"honorario",label:"Honorario",field:"honorario",align:"center",format:function(t){return Object(b["a"])(t)}},{name:"cliente",label:"Responsável",field:"cliente",align:"center"},{name:"faturado",label:"Faturado",field:"faturado",align:"center"},{name:"action",label:"Opções",field:"action",align:"center"}],pagination:{page:1,rowsPerPage:0}}},methods:{getColorStatus:function(t){return(this.colors[t]||this.colors.default)()},edit:function(t){this.editarAtividade=H({},t),this.showModal=!0},editDetalhe:function(t){this.editarAtividade=H({},t),this.showModalDetalhe=!0},onSubmit:function(){var t=d()(o.a.mark((function t(e){return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.AtividadeService.createOrUpdate(e);case 2:this.load(),this.fecharModal();case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),load:function(){var t=d()(o.a.mark((function t(e){var a;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.next=3,this.AtividadeService.search({},e);case 3:a=t.sent,this.loading=!1,this.lastPage=a.last_page,this.currentPage=a.current_page,this.atividades=a.data;case 8:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),fecharModal:function(){this.showModal=!1,this.showModalDetalhe=!1,this.editarAtividade={}},showModalDelete:function(t){this.editarAtividade=t,this.showDeleteModal=!0},deletar:function(){var t=d()(o.a.mark((function t(e){return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.AtividadeService.remove(e.id);case 2:this.showDeleteModal=!1,this.load();case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},mounted:function(){this.load()}},G=z,K=a("db86"),V=a("0016"),W=a("58a8"),X=Object(_["a"])(G,i,n,!1,null,null,null);e["default"]=X.exports;M()(X,"components",{QPage:u["a"],QTable:f["a"],QInnerLoading:v["a"],QTd:K["a"],QIcon:V["a"],QBadge:W["a"],QBtn:E["a"],QPageSticky:p["a"]})}}]);