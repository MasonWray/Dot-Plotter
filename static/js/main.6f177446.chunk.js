(this["webpackJsonpdot-plotter"]=this["webpackJsonpdot-plotter"]||[]).push([[0],{16:function(e){e.exports=JSON.parse('{"name":"dot-plotter","version":"v1.0.0","private":false,"homepage":"https://masonwray.github.io/Dot-Plotter","dependencies":{"@testing-library/jest-dom":"^5.11.9","@testing-library/react":"^11.2.5","@testing-library/user-event":"^12.7.0","bootstrap":"^5.0.0-beta2","bootstrap-icons":"^1.3.0","jszip":"^3.6.0","react":"^17.0.1","react-dom":"^17.0.1","react-redux":"^7.2.2","react-scripts":"4.0.2","redux":"^4.0.5","web-vitals":"^1.1.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","predeploy":"npm run build","deploy":"gh-pages -d build"},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"gh-pages":"^3.1.0","worker-loader":"^3.0.8"}}')},34:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var r=a(1),c=a.n(r),s=a(6),i=a.n(s),n=a(3),l=a(4),o=a(2),d={TOGGLE_RASTER_VISIBILITY:"TOGGLE_RASTER_VISIBILITY",TOGGLE_VECTOR_VISIBILITY:"TOGGLE_VECTOR_VISIBILITY",SET_LAYER_RASTER:"SET_LAYER_RASTER",SET_LAYER_VECTOR:"SET_LAYER_VECTOR",SET_LAYER_GCODE:"SET_LAYER_GCODE",SET_VECTOR_REF:"SET_VECTOR_REF",SET_SOURCE_IMAGE:"SET_SOURCE_IMAGE",SET_OUTPUT_SIZE:"SET_OUTPUT_SIZE",SET_SOURCE_SIZE:"SET_SOURCE_SIZE",SET_OUTPUT_TOOL_DIAMETER:"SET_OUTPUT_TOOL_DIAMETER",SET_FEEDRATE_TRAVEL:"SET_FEEDRATE_TRAVEL",SET_FEEDRATE_PLUNGE:"SET_FEEDRATE_PLUNGE",SET_HEIGHT_TRAVEL:"SET_HEIGHT_TRAVEL",SET_HEIGHT_PLUNGE:"SET_HEIGHT_PLUNGE"},u=function(e,t,a){var r=e/255,c=t/255,s=a/255,i=1-Math.max(r,c,s);return{C:(1-r-i)/(1-i),M:(1-c-i)/(1-i),Y:(1-s-i)/(1-i),K:i}},h=[{name:"Cyan",color:{r:0,g:255,b:255},mapper:function(e,t,a){return u(e,t,a).C},raster_visible:!0,raster:void 0,vector_visible:!1,vector:void 0,vector_ref:void 0},{name:"Magenta",color:{r:255,g:0,b:255},mapper:function(e,t,a){return u(e,t,a).M},raster_visible:!0,raster:void 0,vector_visible:!1,vector:void 0,vector_ref:void 0},{name:"Yellow",color:{r:255,g:255,b:0},mapper:function(e,t,a){return u(e,t,a).Y},raster_visible:!0,raster:void 0,vector_visible:!1,vector:void 0,vector_ref:void 0},{name:"Black",color:{r:0,g:0,b:0},mapper:function(e,t,a){return u(e,t,a).K},raster_visible:!0,raster:void 0,vector_visible:!1,vector:void 0,vector_ref:void 0}],j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d.TOGGLE_RASTER_VISIBILITY:return e.map((function(e,a){return a!==t.payload.id?e:Object(o.a)(Object(o.a)({},e),{},{raster_visible:!e.raster_visible})}));case d.SET_LAYER_RASTER:return e.map((function(e,a){return a!==t.payload.id?e:Object(o.a)(Object(o.a)({},e),{},{raster:t.payload.raster})}));case d.TOGGLE_VECTOR_VISIBILITY:return e.map((function(e,a){return a!==t.payload.id?e:Object(o.a)(Object(o.a)({},e),{},{vector_visible:!e.vector_visible})}));case d.SET_LAYER_VECTOR:return e.map((function(e,a){return a!==t.payload.id?e:Object(o.a)(Object(o.a)({},e),{},{vector:t.payload.vector})}));case d.SET_VECTOR_REF:return e.map((function(e,a){return a!==t.payload.id?e:Object(o.a)(Object(o.a)({},e),{},{vector_ref:t.payload.ref})}));default:return e}},b={sourceImage:void 0},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d.SET_SOURCE_IMAGE:return Object(o.a)(Object(o.a)({},e),{},{sourceImage:t.payload});default:return e}},v={needsUpdate:!0,sourceWidth:0,sourceHeight:0,stockWidth:0,stockHeight:0,toolDiameter:.4,feedrateTravel:2e3,feedratePlunge:1200,heightTravel:3,heightPlunge:.2};var O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d.SET_OUTPUT_SIZE:return Object(o.a)(Object(o.a)({},e),{},{stockWidth:t.payload.width,stockHeight:t.payload.height});case d.SET_SOURCE_SIZE:return Object(o.a)(Object(o.a)({},e),{},{stockWidth:t.payload.width,stockHeight:t.payload.height,sourceWidth:t.payload.width,sourceHeight:t.payload.height});case d.SET_OUTPUT_TOOL_DIAMETER:return Object(o.a)(Object(o.a)({},e),{},{toolDiameter:t.payload});case d.SET_FEEDRATE_TRAVEL:return Object(o.a)(Object(o.a)({},e),{},{feedrateTravel:t.payload});case d.SET_FEEDRATE_PLUNGE:return Object(o.a)(Object(o.a)({},e),{},{feedratePlunge:t.payload});case d.SET_HEIGHT_TRAVEL:return Object(o.a)(Object(o.a)({},e),{},{heightTravel:t.payload});case d.SET_HEIGHT_PLUNGE:return Object(o.a)(Object(o.a)({},e),{},{heightPlunge:t.payload});default:return e}},g={package:void 0};var E,p,f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d.SET_DOWNLOAD_PACKAGE:return Object(o.a)(Object(o.a)({},e),{},{package:t.payload});default:return e}},T=Object(l.b)({Layers:j,FileSelector:m,OutputSettings:O,Output:f}),_=null===(E=(p=window).__REDUX_DEVTOOLS_EXTENSION__)||void 0===E?void 0:E.call(p),x=Object(l.c)(T,_),S=a(0);var w=function(){var e=Object(n.b)();return Object(S.jsxs)("div",{className:"card",children:[Object(S.jsx)("div",{className:"card-header",children:"File Selector"}),Object(S.jsx)("div",{className:"card-body",children:Object(S.jsx)("div",{className:"form-group",children:Object(S.jsx)("input",{type:"file",className:"form-control-file",onChange:function(t){if(t.target.files[0]){var a=new FileReader,r=new Image;a.onload=function(){r.src=a.result,r.onload=function(){e({type:d.SET_SOURCE_IMAGE,payload:r}),e({type:d.SET_SOURCE_SIZE,payload:{width:r.width,height:r.height}})}},a.readAsDataURL(t.target.files[0])}}})})})]})},R=a(12),N=a.n(R),y=a(17),I=a(15);function L(){return(L=Object(I.a)(N.a.mark((function e(t,a,r){var c,s,i,n,l,o,u,h;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.source){for(c=a.current,s=c.getContext("2d"),c.height=t.source.height,c.width=t.source.width,s.drawImage(t.source,0,0),i=s.getImageData(0,0,t.source.width,t.source.height),n=Object(y.a)(i.data),l=i.data,o=0,u=l.length;o<u;o+=4)l[o+0]=t.color.r,l[o+1]=t.color.g,l[o+2]=t.color.b,l[o+3]=255*t.mapper(n[o+0],n[o+1],n[o+2]);s.putImageData(i,0,0),(h=new Image).onload=function(){console.log("Rendered Raster: ",t.name),r({type:d.SET_LAYER_RASTER,payload:{id:t.id,raster:h}})},h.src=c.toDataURL()}case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=function(e,t,a){return L.apply(this,arguments)};function C(e){var t=Object(n.b)(),a=Object(r.useRef)(),c=Object(r.useRef)(),s=Object(n.c)((function(t){return t.Layers[e.id]})),i=Object(n.c)((function(e){return e.FileSelector.sourceImage}));return Object(r.useEffect)((function(){s.vector_ref||t({type:d.SET_VECTOR_REF,payload:{id:e.id,ref:c}})})),Object(r.useEffect)((function(){var r={source:i,name:s.name,id:e.id,color:s.color,mapper:s.mapper};A(r,a,t)}),[i,s.name,e.id,s.color,s.mapper,t]),Object(S.jsxs)("li",{className:"list-group-item",children:[Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{children:s.name})}),Object(S.jsxs)("div",{className:"col",align:"right",children:[Object(S.jsxs)("div",{onClick:function(){t({type:d.TOGGLE_RASTER_VISIBILITY,payload:{id:e.id}})},children:[Object(S.jsx)("label",{className:"form-label pr-2",children:"Raster"}),G(s.raster_visible)]}),Object(S.jsxs)("div",{onClick:function(){t({type:d.TOGGLE_VECTOR_VISIBILITY,payload:{id:e.id}})},children:[Object(S.jsx)("label",{className:"form-label pr-2",children:"Vector"}),G(s.vector_visible)]})]})]}),Object(S.jsx)("canvas",{ref:a,hidden:!0}),Object(S.jsx)("canvas",{ref:c,hidden:!0})]})}function G(e){return e?Object(S.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-eye-fill mx-3",viewBox:"0 0 16 16",children:[Object(S.jsx)("path",{d:"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"}),Object(S.jsx)("path",{d:"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"})]}):Object(S.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-eye-slash-fill mx-3",viewBox:"0 0 16 16",children:[Object(S.jsx)("path",{d:"M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.027 7.027 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.088z"}),Object(S.jsx)("path",{d:"M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.707z"})]})}var H=function(e){var t=Object(n.c)((function(e){return e.Layers.map((function(e,t){return t}))}));return Object(S.jsxs)("div",{className:"card",children:[Object(S.jsx)("div",{className:"card-header",children:"Layers"}),Object(S.jsx)("ul",{className:"list-group list-group-flush",children:t.map((function(e,t){return Object(S.jsx)(C,{id:t},t)}))})]})},U=a(8);var V=function(e){var t=Object(r.useState)([0,0]),a=Object(U.a)(t,2),c=a[0],s=a[1];return Object(r.useLayoutEffect)((function(){function t(){e&&s([e.current.getBoundingClientRect().width,e.current.getBoundingClientRect().height])}return window.addEventListener("resize",t),t(),function(){return window.removeEventListener("resize",t)}}),[e]),c};var D=function(){var e=Object(r.useRef)(),t=Object(r.useRef)(),a=Object(n.c)((function(e){return e.Layers})),c=Object(n.c)((function(e){return e.FileSelector.sourceImage})),s=Object(n.c)((function(e){return e.OutputSettings})),i=V(e);return Object(r.useEffect)((function(){var r=t.current,i=r.getContext("2d");c&&(r.width=Math.round(e.current.getBoundingClientRect().width-20),r.height=Math.round(r.width*s.sourceHeight/s.sourceWidth),a.forEach((function(e){e.raster&&e.raster_visible&&(i.save(),i.scale(r.width/e.raster.width,r.height/e.raster.height),i.drawImage(e.raster,0,0),i.restore())})),a.forEach((function(e){e.vector&&e.vector_visible&&(i.save(),i.scale(r.width/e.vector.width,r.height/e.vector.height),i.drawImage(e.vector,0,0),i.restore())})))}),[s.sourceWidth,s.sourceHeight,c,a,i]),Object(S.jsxs)("div",{className:"card",ref:e,children:[Object(S.jsx)("div",{className:"card-header",children:"Preview"}),Object(S.jsx)("div",{className:"card-body d-flex justify-content-center",children:Object(S.jsx)("canvas",{ref:t})})]})},P={ARCHIVE:"ARCHIVE",RASTER:"RASTER",VECTOR:"VECTOR"};function M(){return new Worker(a.p+"static/js/Worker.42e0c0a9.worker.js")}var k=function(e,t,a){return new Promise((function(r,c){if(e.raster){var s=t.current,i=s.getContext("2d");s.width=Math.round(e.settings.stockWidth/e.settings.toolDiameter),s.height=Math.round(e.settings.stockHeight/e.settings.toolDiameter),i.scale(s.width/e.settings.sourceWidth,s.height/e.settings.sourceHeight),i.drawImage(e.raster,0,0);var n=i.getImageData(0,0,s.width,s.height).data,l=new M;l.onmessage=function(t){var c=new Image;c.onload=function(){a({type:d.SET_LAYER_VECTOR,payload:{id:e.id,vector:c}}),r({name:t.data.name,gcode:t.data.gcode})},c.src=t.data.image},l.postMessage({job:P.VECTOR,pix:n,settings:{heightTravel:e.settings.heightTravel,feedrateTravel:e.settings.feedrateTravel,heightPlunge:e.settings.heightPlunge,feedratePlunge:e.settings.feedratePlunge,width:s.width,toolDiameter:e.settings.toolDiameter,color:e.color,stockHeight:e.settings.stockHeight,stockWidth:e.settings.stockWidth,name:e.name}})}}))};var Y=function(e){var t=Object(n.c)((function(e){return e.OutputSettings})),a=Object(n.c)((function(e){return e.Layers})),c=Object(r.useRef)(),s=Object(r.useState)(),i=Object(U.a)(s,2),l=i[0],o=i[1],u=Object(n.b)();return Object(S.jsxs)("div",{className:"card",children:[Object(S.jsx)("div",{className:"card-header",children:"Output Settings"}),Object(S.jsxs)("ul",{className:"list-group list-group-flush",children:[Object(S.jsxs)("li",{className:"list-group-item",children:[Object(S.jsxs)("div",{className:"row mb-2",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{className:"form-label",children:"Stock Width (mm)"})}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("input",{type:"number",className:"form-control",disabled:!(t.sourceWidth>0),value:t.stockWidth,onChange:function(e){!function(e){var a=Math.round(e.target.value<1?1:1*e.target.value),r=Math.round(a*t.sourceHeight/t.sourceWidth);u({type:d.SET_OUTPUT_SIZE,payload:{width:a,height:r}})}(e)}})})]}),Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{className:"form-label",children:"Stock Height (mm)"})}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("input",{type:"number",className:"form-control",disabled:!(t.sourceHeight>0),value:t.stockHeight,onChange:function(e){!function(e){var a=Math.round(e.target.value<1?1:1*e.target.value),r=Math.round(a*t.sourceWidth/t.sourceHeight);u({type:d.SET_OUTPUT_SIZE,payload:{width:r,height:a}})}(e)}})})]})]}),Object(S.jsx)("li",{className:"list-group-item",children:Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{className:"form-label",children:"Tool Diameter (mm)"})}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("input",{type:"number",className:"form-control",step:"0.1",value:t.toolDiameter,onChange:function(e){u({type:d.SET_OUTPUT_TOOL_DIAMETER,payload:1*e.target.value})}})})]})}),Object(S.jsxs)("li",{className:"list-group-item",children:[Object(S.jsxs)("div",{className:"row mb-2",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{className:"form-label",children:"Travel Feedrate (mm/s)"})}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("input",{type:"number",className:"form-control",step:"50",value:t.feedrateTravel,onChange:function(e){u({type:d.SET_FEEDRATE_TRAVEL,payload:1*e.target.value})}})})]}),Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{className:"form-label",children:"Plunge Feedrate (mm/s)"})}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("input",{type:"number",className:"form-control",step:"50",value:t.feedratePlunge,onChange:function(e){u({type:d.SET_FEEDRATE_PLUNGE,payload:1*e.target.value})}})})]})]}),Object(S.jsxs)("li",{className:"list-group-item",children:[Object(S.jsxs)("div",{className:"row mb-2",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{className:"form-label",children:"Travel Height (mm)"})}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("input",{type:"number",className:"form-control",step:"0.1",value:t.heightTravel,onChange:function(e){return u({type:d.SET_HEIGHT_TRAVEL,payload:1*e.target.value})}})})]}),Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("label",{className:"form-label",children:"Plunge Height (mm)"})}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("input",{type:"number",className:"form-control",step:"0.1",value:t.heightPlunge,onChange:function(e){return u({type:d.SET_HEIGHT_PLUNGE,payload:1*e.target.value})}})})]})]}),Object(S.jsx)("li",{className:"list-group-item",children:Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col mx-4",children:Object(S.jsx)("button",{className:"btn btn-primary w-100",onClick:function(){var e=[];a.forEach((function(r,c){var s={raster:r.raster,name:r.name,color:r.color,id:c,settings:t};k(s,r.vector_ref,u).then((function(t){if(e.push({name:t.name,gcode:t.gcode}),e.length===a.length){var r=new M;r.onmessage=function(e){o(e.data),console.log("Archive Finished")},r.postMessage({job:P.ARCHIVE,gcode:e})}}))}))},children:Object(S.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",className:"bi bi-arrow-repeat",viewBox:"0 0 16 16",children:[Object(S.jsx)("path",{d:"M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"}),Object(S.jsx)("path",{fillRule:"evenodd",d:"M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"})]})})}),Object(S.jsxs)("div",{className:"col mx-4",children:[Object(S.jsx)("a",{hidden:!0,download:"output.zip",ref:c,href:l,children:"Download GCODE"}),Object(S.jsx)("button",{className:"btn btn-primary w-100",disabled:!l,onClick:function(){c.current.click()},children:Object(S.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",className:"bi bi-arrow-bar-down",viewBox:"0 0 16 16",children:Object(S.jsx)("path",{fillRule:"evenodd",d:"M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"})})})]})]})})]})]})},F=a(16);var W=function(){return Object(S.jsxs)("div",{children:[Object(S.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:Object(S.jsxs)("div",{className:"container-fluid",children:[Object(S.jsx)("div",{className:"navbar-brand",children:"Dot Plotter"}),Object(S.jsx)("div",{className:"d-flex",children:Object(S.jsx)("div",{className:"nav-item",children:Object(S.jsxs)("div",{className:"nav-link btn-group",children:[Object(S.jsx)("button",{className:"btn btn-outline-secondary btn-sm",disabled:!0,children:F.version}),Object(S.jsx)("a",{href:"https://github.com/MasonWray/Dot-Plotter",className:"btn btn-outline-secondary btn-sm",children:" View on GitHub"})]})})})]})}),Object(S.jsx)("div",{className:"container-fluid",children:Object(S.jsxs)("div",{className:"row",children:[Object(S.jsxs)("div",{className:"col-sm-3",children:[Object(S.jsx)(w,{}),Object(S.jsx)(H,{})]}),Object(S.jsx)("div",{className:"col-sm-6",children:Object(S.jsx)(D,{})}),Object(S.jsx)("div",{className:"col-sm-3",children:Object(S.jsx)(Y,{})})]})})]})};a(32),a(33),a(34);i.a.render(Object(S.jsx)(c.a.StrictMode,{children:Object(S.jsx)(n.a,{store:x,children:Object(S.jsx)(W,{})})}),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.6f177446.chunk.js.map