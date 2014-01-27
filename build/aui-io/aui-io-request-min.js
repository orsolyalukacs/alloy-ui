AUI.add("aui-io-request",function(m){var f=m.Lang,C=f.isBoolean,o=f.isFunction,g=f.isString,E=YUI.AUI.namespace("defaults.io"),G=function(A){return function(){return E[A];};},u="active",b="arguments",v="autoLoad",r="cache",F="cfg",q="complete",M="content-type",w="context",l="data",e="dataType",i="",K="end",z="failure",a="form",s="get",j="headers",J="IORequest",d="json",x="method",t="responseData",y="start",k="success",B="sync",p="timeout",n="transaction",D="uri",I="xdr",N="xml",H="Parser error: IO dataType is not correctly parsing",c={all:"*/*",html:"text/html",json:"application/json, text/javascript",text:"text/plain",xml:"application/xml, text/xml"};var h=m.Component.create({NAME:J,ATTRS:{autoLoad:{value:true,validator:C},cache:{value:true,validator:C},dataType:{setter:function(A){return(A||i).toLowerCase();},value:null,validator:g},responseData:{setter:function(A){return this._setResponseData(A);},value:null},uri:{setter:function(A){return this._parseURL(A);},value:null,validator:g},active:{value:false,validator:C},cfg:{getter:function(){var A=this;return{arguments:A.get(b),context:A.get(w),data:A.get(l),form:A.get(a),headers:A.get(j),method:A.get(x),on:{complete:m.bind(A.fire,A,q),end:m.bind(A._end,A),failure:m.bind(A.fire,A,z),start:m.bind(A.fire,A,y),success:m.bind(A._success,A)},sync:A.get(B),timeout:A.get(p),xdr:A.get(I)};},readOnly:true},transaction:{value:null},arguments:{valueFn:G(b)},context:{valueFn:G(w)},data:{valueFn:G(l),setter:"_setIOData"},form:{valueFn:G(a)},headers:{getter:function(O){var P=[];var A=this;var L=A.get(e);if(L){P.push(c[L]);}P.push(c.all);return m.merge(O,{Accept:P.join(", ")});},valueFn:G(j)},method:{valueFn:G(x)},selector:{value:null},sync:{valueFn:G(B)},timeout:{valueFn:G(p)},xdr:{valueFn:G(I)}},EXTENDS:m.Plugin.Base,prototype:{init:function(L){var A=this;h.superclass.init.apply(this,arguments);A._autoStart();},destructor:function(){var A=this;A.stop();A.set(n,null);},start:function(){var A=this;A.destructor();A.set(u,true);var L=m.io(A.get(D),A.get(F));A.set(n,L);},stop:function(){var A=this;var L=A.get(n);if(L){L.abort();}},_autoStart:function(){var A=this;if(A.get(v)){A.start();}},_parseURL:function(P){var A=this;var L=A.get(r);var S=A.get(x);if((L===false)&&(S==s)){var R=+new Date;var O=P.replace(/(\?|&)_=.*?(&|$)/,"$1_="+R+"$2");P=O+((O==P)?(P.match(/\?/)?"&":"?")+"_="+R:"");}var Q=E.uriFormatter;if(o(Q)){P=Q.apply(A,[P]);}return P;},_end:function(L){var A=this;A.set(u,false);A.set(n,null);A.fire(K,L);},_success:function(O,L){var A=this;A.set(t,L);A.fire(k,O,L);},_setIOData:function(O){var A=this;var L=E.dataFormatter;if(o(L)){O=L.call(A,O);}return O;},_setResponseData:function(S){var Q=null;var L=this;if(S){var P=L.get(e);var T=S.getResponseHeader(M)||"";if((P==N)||(!P&&T.indexOf(N)>=0)){Q=S.responseXML;if(Q.documentElement.tagName=="parsererror"){throw H;}}else{Q=S.responseText;}if(Q===i){Q=null;}if(P==d){try{Q=m.JSON.parse(Q);}catch(R){}}else{var A=L.get("selector");if(Q&&A){var O;if(Q.documentElement){O=m.one(Q);}else{O=m.Node.create(Q);}Q=O.all(A);}}}return Q;}}});m.IORequest=h;m.io.request=function(L,A){return new m.IORequest(m.merge(A,{uri:L}));};},"@VERSION@",{requires:["aui-base","io-base","json","plugin","querystring-stringify"]});