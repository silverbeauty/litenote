(function(t){function e(e){for(var i,a,l=e[0],s=e[1],u=e[2],d=0,h=[];d<l.length;d++)a=l[d],o[a]&&h.push(o[a][0]),o[a]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i]);c&&c(e);while(h.length)h.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,l=1;l<n.length;l++){var s=n[l];0!==o[s]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={app:0},r=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var c=s;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"24b2":function(t,e,n){"use strict";var i=n("3eb1"),o=n("6a3c"),r=n("2877"),a=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=a.exports},"2d06":function(t,e,n){"use strict";var i=n("493f"),o=n.n(i);o.a},"3eb1":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mobile-container paddingbottom70"},[n("p",[t._v("Edit")])])}];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},"493f":function(t,e,n){},"56d7":function(t,n,i){"use strict";i.r(n);i("cadf"),i("551c"),i("f751"),i("097d"),i("f5b8");var o=i("2b0e"),r=i("bb71");i("da64");o["a"].use(r["a"],{iconfont:"md"});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("router-view")],1)],1)},l=[],s={},u=s,c=i("2877"),d=i("6544"),h=i.n(d),f=i("7496"),p=i("549c"),m=Object(c["a"])(u,a,l,!1,null,null,null),g=m.exports;h()(m,{VApp:f["a"],VContent:p["a"]});var v=i("8c4f"),b=i("2f62"),q={discount:0},x={setDiscount:function(t){q.discount=t}},y={namespaced:!0,state:q,mutations:x};o["a"].use(b["a"]);var _=new b["a"].Store({modules:{note:y}}),T=_,C=i("9339"),E=i.n(C),k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"quillWrapper"},[t._t("toolbar"),n("div",{ref:"quillContainer",attrs:{id:t.id}}),t.useCustomImageHandler?n("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{id:"file-upload",type:"file",accept:"image/*"},on:{change:function(e){return t.emitImageInfo(e)}}}):t._e()],2)},O=[],j=(i("7514"),i("ac6a"),i("456d"),[[{header:[!1,1,2,3,4,5,6]}],["bold","italic","underline","strike"],[{align:""},{align:"center"},{align:"right"},{align:"justify"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"},{list:"check"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],["link","image","video"],["clean"]]),S=j,w={props:{customModules:Array},methods:{registerCustomModules:function(t){void 0!==this.customModules&&this.customModules.forEach(function(e){t.register("modules/"+e.alias,e.module)})}}},I=i("7618");function L(t,e){var n=function(t){return t&&"object"===Object(I["a"])(t)};return n(t)&&n(e)?(Object.keys(e).forEach(function(i){var o=t[i],r=e[i];Array.isArray(o)&&Array.isArray(r)?t[i]=o.concat(r):n(o)&&n(r)?t[i]=L(Object.assign({},o),r):t[i]=r}),t):e}i("7f7f"),i("ac4d"),i("8a81");var N=i("768b"),M=(i("386d"),i("4917"),i("b0b4")),H=i("d225"),P=i("308d"),A=i("6bb5"),V=i("4e2b"),D=E.a.import("blots/block/embed"),F=function(t){function e(){return Object(H["a"])(this,e),Object(P["a"])(this,Object(A["a"])(e).apply(this,arguments))}return Object(V["a"])(e,t),e}(D);F.blotName="hr",F.tagName="hr",E.a.register("formats/horizontal",F);var B=function(){function t(e,n){var i=this;Object(H["a"])(this,t),this.quill=e,this.options=n,this.ignoreTags=["PRE"],this.matches=[{name:"header",pattern:/^(#){1,6}\s/g,action:function(t,e,n){var o=n.exec(t);if(o){var r=o[0].length;setTimeout(function(){i.quill.formatLine(e.index,0,"header",r-1),i.quill.deleteText(e.index-r,r)},0)}}},{name:"blockquote",pattern:/^(>)\s/g,action:function(t,e){setTimeout(function(){i.quill.formatLine(e.index,1,"blockquote",!0),i.quill.deleteText(e.index-2,2)},0)}},{name:"code-block",pattern:/^`{3}(?:\s|\n)/g,action:function(t,e){setTimeout(function(){i.quill.formatLine(e.index,1,"code-block",!0),i.quill.deleteText(e.index-4,4)},0)}},{name:"bolditalic",pattern:/(?:\*|_){3}(.+?)(?:\*|_){3}/g,action:function(t,e,n,o){var r=n.exec(t),a=r[0],l=r[1],s=o+r.index;t.match(/^([*_ \n]+)$/g)||setTimeout(function(){i.quill.deleteText(s,a.length),i.quill.insertText(s,l,{bold:!0,italic:!0}),i.quill.format("bold",!1)},0)}},{name:"bold",pattern:/(?:\*|_){2}(.+?)(?:\*|_){2}/g,action:function(t,e,n,o){var r=n.exec(t),a=r[0],l=r[1],s=o+r.index;t.match(/^([*_ \n]+)$/g)||setTimeout(function(){i.quill.deleteText(s,a.length),i.quill.insertText(s,l,{bold:!0}),i.quill.format("bold",!1)},0)}},{name:"italic",pattern:/(?:\*|_){1}(.+?)(?:\*|_){1}/g,action:function(t,e,n,o){var r=n.exec(t),a=r[0],l=r[1],s=o+r.index;t.match(/^([*_ \n]+)$/g)||setTimeout(function(){i.quill.deleteText(s,a.length),i.quill.insertText(s,l,{italic:!0}),i.quill.format("italic",!1)},0)}},{name:"strikethrough",pattern:/(?:~~)(.+?)(?:~~)/g,action:function(t,e,n,o){var r=n.exec(t),a=r[0],l=r[1],s=o+r.index;t.match(/^([*_ \n]+)$/g)||setTimeout(function(){i.quill.deleteText(s,a.length),i.quill.insertText(s,l,{strike:!0}),i.quill.format("strike",!1)},0)}},{name:"code",pattern:/(?:`)(.+?)(?:`)/g,action:function(t,e,n,o){var r=n.exec(t),a=r[0],l=r[1],s=o+r.index;t.match(/^([*_ \n]+)$/g)||setTimeout(function(){i.quill.deleteText(s,a.length),i.quill.insertText(s,l,{code:!0}),i.quill.format("code",!1),i.quill.insertText(i.quill.getSelection()," ")},0)}},{name:"hr",pattern:/^([-*]\s?){3}/g,action:function(t,e){var n=e.index-t.length;setTimeout(function(){i.quill.deleteText(n,t.length),i.quill.insertEmbed(n+1,"hr",!0,E.a.sources.USER),i.quill.insertText(n+2,"\n",E.a.sources.SILENT),i.quill.setSelection(n+2,E.a.sources.SILENT)},0)}},{name:"asterisk-ul",pattern:/^(\*|\+)\s$/g,action:function(t,e,n){setTimeout(function(){i.quill.formatLine(e.index,1,"list","unordered"),i.quill.deleteText(e.index-2,2)},0)}},{name:"image",pattern:/(?:!\[(.+?)\])(?:\((.+?)\))/g,action:function(t,e,n){var o=t.search(n),r=t.match(n)[0],a=t.match(/(?:\((.*?)\))/g)[0],l=e.index-r.length-1;-1!==o&&setTimeout(function(){i.quill.deleteText(l,r.length),i.quill.insertEmbed(l,"image",a.slice(1,a.length-1))},0)}},{name:"link",pattern:/(?:\[(.+?)\])(?:\((.+?)\))/g,action:function(t,e,n){var o=t.search(n),r=t.match(n)[0],a=t.match(/(?:\[(.*?)\])/g)[0],l=t.match(/(?:\((.*?)\))/g)[0],s=e.index-r.length-1;-1!==o&&setTimeout(function(){i.quill.deleteText(s,r.length),i.quill.insertText(s,a.slice(1,a.length-1),"link",l.slice(1,l.length-1))},0)}}],this.quill.on("text-change",function(t,e,n){for(var o=0;o<t.ops.length;o++)t.ops[o].hasOwnProperty("insert")&&(" "===t.ops[o].insert?i.onSpace():"\n"===t.ops[o].insert&&i.onEnter())})}return Object(M["a"])(t,[{key:"isValid",value:function(t,e){return"undefined"!==typeof t&&t&&-1===this.ignoreTags.indexOf(e)}},{key:"onSpace",value:function(){var t=this.quill.getSelection();if(t){var e=this.quill.getLine(t.index),n=Object(N["a"])(e,2),i=n[0],o=n[1],r=i.domNode.textContent,a=t.index-o;if(this.isValid(r,i.domNode.tagName)){var l=!0,s=!1,u=void 0;try{for(var c,d=this.matches[Symbol.iterator]();!(l=(c=d.next()).done);l=!0){var h=c.value,f=r.match(h.pattern);if(f)return console.log("matched:",h.name,r),void h.action(r,t,h.pattern,a)}}catch(p){s=!0,u=p}finally{try{l||null==d.return||d.return()}finally{if(s)throw u}}}}}},{key:"onEnter",value:function(){var t=this.quill.getSelection();if(t){var e=this.quill.getLine(t.index),n=Object(N["a"])(e,2),i=n[0],o=n[1],r=i.domNode.textContent+" ",a=t.index-o;if(t.length=t.index++,this.isValid(r,i.domNode.tagName)){var l=!0,s=!1,u=void 0;try{for(var c,d=this.matches[Symbol.iterator]();!(l=(c=d.next()).done);l=!0){var h=c.value,f=r.match(h.pattern);if(f)return console.log("matched",h.name,r),void h.action(r,t,h.pattern,a)}}catch(p){s=!0,u=p}finally{try{l||null==d.return||d.return()}finally{if(s)throw u}}}}}}]),t}(),z=B,Q={name:"VueEditor",mixins:[w],props:{id:{type:String,default:"quill-container"},placeholder:{type:String,default:""},value:{type:String,default:""},disabled:{type:Boolean},editorToolbar:{type:Array,default:function(){return[]}},editorOptions:{type:Object,required:!1,default:function(){return{}}},useCustomImageHandler:{type:Boolean,default:!1},useMarkdownShortcuts:{type:Boolean,default:!1}},data:function(){return{quill:null}},watch:{value:function(t){t==this.quill.root.innerHTML||this.quill.hasFocus()||(this.quill.root.innerHTML=t)},disabled:function(t){this.quill.enable(!t)}},mounted:function(){this.registerCustomModules(E.a),this.registerPrototypes(),this.initializeEditor()},beforeDestroy:function(){this.quill=null,delete this.quill},methods:{initializeEditor:function(){this.setupQuillEditor(),this.checkForCustomImageHandler(),this.handleInitialContent(),this.registerEditorEventListeners(),this.$emit("ready",this.quill)},setupQuillEditor:function(){var t={debug:!1,modules:this.setModules(),theme:"snow",placeholder:this.placeholder?this.placeholder:"",readOnly:!!this.disabled&&this.disabled};this.prepareEditorConfig(t),this.quill=new E.a(this.$refs.quillContainer,t)},setModules:function(){var t={toolbar:this.editorToolbar.length?this.editorToolbar:S};return this.useMarkdownShortcuts&&(E.a.register("modules/markdownShortcuts",z,!0),t["markdownShortcuts"]={}),t},prepareEditorConfig:function(t){Object.keys(this.editorOptions).length>0&&this.editorOptions.constructor===Object&&(this.editorOptions.modules&&"undefined"!==typeof this.editorOptions.modules.toolbar&&delete t.modules.toolbar,L(t,this.editorOptions))},registerPrototypes:function(){E.a.prototype.getHTML=function(){return this.container.querySelector(".ql-editor").innerHTML},E.a.prototype.getWordCount=function(){return this.container.querySelector(".ql-editor").innerText.length}},registerEditorEventListeners:function(){this.quill.on("text-change",this.handleTextChange),this.quill.on("selection-change",this.handleSelectionChange),this.listenForEditorEvent("text-change"),this.listenForEditorEvent("selection-change"),this.listenForEditorEvent("editor-change")},listenForEditorEvent:function(t){var e=this;this.quill.on(t,function(){console.log("type",t);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];e.$emit.apply(e,[t].concat(i))})},handleInitialContent:function(){this.value&&(this.quill.root.innerHTML=this.value)},handleSelectionChange:function(t,e){!t&&e?this.$emit("blur",this.quill):t&&!e&&this.$emit("focus",this.quill),$("#quill-container .ql-editor p").unbind("dblclick"),$("#quill-container .ql-editor p").bind("dblclick",function(t){t.preventDefault();var e=this;$(this).find("~li").slideToggle(),console.log('$(tree).next().prop("tagName")',$(e).next().prop("tagName")),"UL"!=$(e).next().prop("tagName")&&"LI"!=$(e).next().prop("tagName")||$(e).next().slideToggle()}),$("#quill-container .ql-editor li").unbind("dblclick"),$("#quill-container .ql-editor li").bind("dblclick",function(t){t.preventDefault();$(this).find("~li").slideToggle()})},handleTextChange:function(){var t="<p><br></p>"===this.quill.getHTML()?"":this.quill.getHTML();this.$emit("input",t)},checkForCustomImageHandler:function(){!0===this.useCustomImageHandler&&this.setupCustomImageHandler()},setupCustomImageHandler:function(){var t=this.quill.getModule("toolbar");t.addHandler("image",this.customImageHandler)},customImageHandler:function(t,e){this.$refs.fileInput.click()},emitImageInfo:function(t){var e=function(){var t=document.getElementById("file-upload");t.value=""},n=t.target.files[0],i=this.quill,o=i.getSelection(),r=o.index;this.$emit("imageAdded",n,i,r,e)}}},R=Q,J=(i("4351"),i("2d06"),Object(c["a"])(R,k,O,!1,null,null,null)),U=J.exports,W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mobile-container"},[t._l(t.notes,function(t,e){return n("NoteItem",{key:e,attrs:{note:t}})}),n("div",{staticClass:"col text-right"},[n("button",{attrs:{type:"secondary"},on:{click:function(e){return t.moveCartPage()}}},[t._v("Add")])])],2)},G=[],K=i("bc3a"),X=i.n(K),Y="https://lite-note-view.herokuapp.com/api",Z={install:function(t,e){this.store=1},getNoteList:function(){var t=this;return X.a.get(this._url("note"),{headers:this._headers()}).then(function(n){var i=n.status,o=n.data;return i?t._responseData(o):t._responseError(e)}).catch(function(e){return console.log("e = ",e),t._responseError(e)})},getNote:function(t){var e=this;return X.a.get(this._url("note/"+t),{headers:this._headers()}).then(function(t){return e._responseData(t)}).catch(function(t){return console.log("e = ",t),e._responseError(t)})},postNote:function(t,e){var n=this,i={title:t,content:e};return X.a.post(this._url("note"),i,{headers:this._headers()}).then(function(t){return n._responseData(t).then(function(t){return Promise.resolve(t)})}).catch(function(t){return n._responseError(t)})},_url:function(t){return"".concat(Y,"/").concat(t)},_headers:function(){return{"Content-Type":"application/json",Accept:"application/json"}},_responseData:function(t,e){var n=t.data;return void 0!==e&&(n=e(n)),Promise.resolve(n)},_responseError:function(t){var e=new Error;return e.errors=t.response.errors,Promise.reject(e)}},tt=Z,et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"note-item"},[n("h4",{staticClass:"note-title"},[t._v(t._s(t.note.title))]),n("div",{staticClass:"note-content",domProps:{innerHTML:t._s(t.note.content)}})])},nt=[],it={name:"NoteItem",data:function(){return{}},props:{note:{type:Object}}},ot=it,rt=Object(c["a"])(ot,et,nt,!1,null,null,null),at=rt.exports,lt={name:"Home",components:{NoteItem:at},mounted:function(){var t=this;tt.getNoteList().then(function(e){console.log("response:",e),t.notes=e}).catch(function(t){console.log("error: ",t)})},beforeDestroy:function(){clearInterval(this.interval)},methods:{moveCartPage:function(){this.$router.push({name:"add"})}},watch:{},data:function(){return{notes:[]}}},st=lt,ut=Object(c["a"])(st,W,G,!1,null,null,null),ct=ut.exports,dt=i("24b2"),ht=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mobile-container paddingbottom70"},[n("vue-editor",{attrs:{"use-markdown-shortcuts":"","editor-options":t.editorOptions},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}},[n("div",{attrs:{slot:"toolbar",id:"my-toolbar"},slot:"toolbar"},[n("span",{staticClass:"ql-formats"},[n("select",{staticClass:"ql-header",attrs:{defaultValue:"0"}},[n("option",{attrs:{value:"1"}},[t._v("Heading")]),n("option",{attrs:{value:"2"}},[t._v("Subheading")]),n("option",{attrs:{value:"0"}},[t._v("Normal")])]),n("select",{staticClass:"ql-font"},[n("option"),n("option",{attrs:{value:"serif"}}),n("option",{attrs:{value:"monospace"}})])]),n("span",{staticClass:"ql-formats"},[n("button",{staticClass:"ql-bold"}),n("button",{staticClass:"ql-italic"}),n("button",{staticClass:"ql-underline"})]),n("span",{staticClass:"ql-formats"},[n("select",{staticClass:"ql-color"}),n("select",{staticClass:"ql-background"})]),n("span",{staticClass:"ql-formats"},[n("button",{staticClass:"ql-list",attrs:{value:"ordered"}}),n("button",{staticClass:"ql-list",attrs:{value:"bullet"}}),n("select",{staticClass:"ql-align"},[n("option",{attrs:{defaultValue:""}}),n("option",{attrs:{value:"center"}}),n("option",{attrs:{value:"right"}}),n("option",{attrs:{value:"justify"}})])]),n("span",{staticClass:"ql-formats"},[n("button",{staticClass:"ql-link"}),n("button",{staticClass:"ql-image"}),n("button",{staticClass:"ql-code-block"})]),n("span",{staticClass:"ql-formats"},[n("button",{staticClass:"ql-clean"})])])])],1)},ft=[],pt={data:function(){return{editorOptions:{modules:{toolbar:"#my-toolbar"},placeholder:"new placeholder text here ..."},content:"value"}},methods:{handleTextChange:function(t){console.log("TCL: handleTextChange -> obj",t)}}},mt=pt,gt=Object(c["a"])(mt,ht,ft,!1,null,null,null),vt=gt.exports;i.d(n,"install",function(){return qt});var bt="__VERSION__";function qt(t){qt.installed||(qt.installed=!0,t.component("VueEditor",U))}var xt={install:qt,version:bt,Quill:E.a};o["a"].use(v["a"]),o["a"].use(xt),o["a"].config.productionTip=!1;var yt=[{name:"home",path:"/",component:ct},{name:"edit",path:"/edit",component:dt["default"],props:!0},{name:"add",path:"/add",component:vt,props:!0}],_t=new v["a"]({mode:"history",routes:yt});new o["a"](o["a"].util.extend({store:T,router:_t},g)).$mount("#app")},"6a3c":function(t,e,n){"use strict";var i=n("d910"),o=n.n(i);e["default"]=o.a},d910:function(t,e){}});
//# sourceMappingURL=app.da3eb12c.js.map