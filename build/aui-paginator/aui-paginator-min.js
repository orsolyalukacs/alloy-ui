AUI.add("aui-paginator",function(W){var P=W.Lang,f=P.isArray,am=P.isBoolean,aj=P.isFunction,I=P.isNumber,D=P.isObject,ar=P.isString,x=P.toInt,y="alwaysVisible",z="circular",c="container",F="containers",R="content",ae="current",O=".",u="first",X="firstPageLink",ay="firstPageLinkLabel",g="last",H="lastPageLink",av="lastPageLinkLabel",S="link",aa="maxPageLinks",l="next",ai="nextPageLink",V="nextPageLinkLabel",ao="option",m="page",t="pageContainerTemplate",G="pageLinkContent",E="pageLinkTemplate",e="pageReportEl",r="pageReportLabelTemplate",Z="paginator",al="per",an="prev",i="prevPageLink",b="prevPageLinkLabel",Q="report",j="rows",Y="rowsPerPage",au="rowsPerPageEl",q="rowsPerPageOptions",ap="selected",o=" ",M="state",ah="template",U="total",J="totalEl",N="totalLabel",T="totalPages",at=function(){return Array.prototype.slice.call(arguments).join(o);},aw=function(A){return(A instanceof W.NodeList);},C=W.ClassNameManager.getClassName,ag=W.UA.ie,v=C(Z),p=C(Z,c),ab=C(Z,R),w=C(Z,ae,m),ax=C(Z,u,S),k=C(Z,g,S),aq=C(Z,S),d=C(Z,l,S),a=C(Z,m,c),ad=C(Z,m,S),s=C(Z,ae,m,Q),ac=C(Z,an,S),n=C(Z,j,al,m),h=C(Z,U),ak={defaultOutput:"{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}",firstLink:'<a href="#" class="'+at(aq,ax)+'"></a>',lastLink:'<a href="#" class="'+at(aq,k)+'"></a>',nextLink:'<a href="#" class="'+at(aq,d)+'"></a>',pageContainer:"<span></span>",pageLink:'<a href="#"></a>',pageReport:'<span class="'+at(s)+'"></span>',pageReportLabel:"({page} of {totalPages})",prevLink:'<a href="#" class="'+at(aq,ac)+'"></a>',rowsPerPage:'<select class="'+n+'"></select>',total:'<span class="'+at(h)+'"></span>',totalLabel:"(Total {total})"},af="&gt;",K="&lt;";var B=W.Component.create({NAME:Z,TPL:ak,ATTRS:{alwaysVisible:{validator:am,value:true},circular:{validator:am,value:false},containers:{setter:function(L){var A=this;if(aw(L)){return L;}else{if(ar(L)){return W.all(L);}}return new W.NodeList([L]);},writeOnce:true},firstPageLink:{setter:W.one,valueFn:function(){var A=this;var L=W.Node.create(A.configTpl.firstLink);return L.html(A.get(ay));}},firstPageLinkLabel:{validator:ar,value:u},lastPageLink:{setter:W.one,valueFn:function(){var A=this;var L=W.Node.create(A.configTpl.lastLink);return L.html(A.get(av));}},lastPageLinkLabel:{validator:ar,value:g},maxPageLinks:{getter:function(L){var A=this;return Math.min(A.get(T),L);},validator:I,value:10},nextPageLink:{setter:W.one,valueFn:function(){var A=this;var L=W.Node.create(A.configTpl.nextLink);return L.html(A.get(V));}},nextPageLinkLabel:{validator:ar,value:at(l,af)},page:{setter:x,value:1},pageContainerTemplate:{getter:function(L){var A=W.Node.create(L);return A.addClass(a);},validator:ar,valueFn:function(){var A=this;return A.configTpl.pageContainer;}},pageLinkContent:{validator:aj,value:function(az,A,L){az.html(A);}},pageLinkTemplate:{getter:function(L){var A=W.Node.create(L);return A.addClass(at(aq,ad));},validator:ar,valueFn:function(){var A=this;return A.configTpl.pageLink;}},pageReportEl:{setter:W.one,valueFn:function(){var A=this;var L=W.Node.create(A.configTpl.pageReport);return L.html(A.get(r));}},pageReportLabelTemplate:{getter:function(){var A=this;return P.sub(A.configTpl.pageReportLabel,{page:A.get(m),totalPages:A.get(T)});},validator:ar},prevPageLink:{setter:W.one,valueFn:function(){var A=this;var L=W.Node.create(A.configTpl.prevLink);return L.html(A.get(b));}},prevPageLinkLabel:{validator:ar,value:at(K,an)},rowsPerPage:{setter:x,value:1},rowsPerPageEl:{getter:function(aB){var A=this;var aA=A.get(Y);var L=aB.all(ao);L.removeAttribute(ap);var az=L.filter("[value="+aA+"]");if(az){az.setAttribute(ap,ap);}return aB;},setter:W.one,valueFn:function(){var A=this;var L=W.Node.create(A.configTpl.rowsPerPage);return L.addClass(n);}},rowsPerPageOptions:{validator:f,value:[]},state:{getter:"_getState",setter:"_setState",validator:D,value:{}},template:{getter:"_getTemplate",writeOnce:true,validator:ar,valueFn:function(){var A=this;return A.configTpl.defaultOutput;}},total:{setter:"_setTotal",validator:I,value:0},totalEl:{getter:function(){var A=this;var L=W.Node.create(A.configTpl.total);return L.html(A.get(N));},setter:W.one},totalLabel:{getter:function(){var A=this;return P.sub(A.configTpl.totalLabel,{total:A.get(U)});},validator:ar},totalPages:{readOnly:true,getter:function(aA){var A=this;var az=A.get(Y);var L=A.get(U);return Math.ceil(L/az);}}},constructor:function(az){var A=this;var L=az.TPL||{};W.mix(L,B.TPL);A.configTpl=L;B.superclass.constructor.call(A,az);},prototype:{lastState:null,templatesCache:null,renderUI:function(){var A=this;var L=A.get(F);L.unselectable();A._renderRowsPerPageOptions();A._renderTemplateUI();L.addClass(p);},bindUI:function(){var A=this;A._delegateDOM();A.publish("changeRequest");A.after("stateChange",W.bind(A._afterSetState,A));A.before("stateChange",W.bind(A._beforeSetState,A));A.after("maxPageLinksChange",W.bind(A._renderTemplateUI,A));A.after("rowsPerPageChange",W.bind(A._renderTemplateUI,A));A.after("totalChange",W.bind(A._renderTemplateUI,A));},syncUI:function(){var A=this;A.changeRequest();},destructor:function(){var A=this;A.get(F).remove(true);},calculateRange:function(aA){var A=this;var az=A.get(T);var aD=A.get(aa);var aB=Math.ceil(aD/2);var aC=Math.min(Math.max(aA-aB,1),(az-aD+1));var L=Math.min(aC+aD-1,az);return{end:L,start:aC};},changeRequest:function(){var A=this;var aA=A.get(M);if(A.get(z)){var az=aA.page;var L=aA.totalPages;if(aA.before&&(aA.before.page==az)){if(az<=1){aA.page=L;}else{if(az>=L){aA.page=1;}}A.set(M,aA);}}A.fire("changeRequest",{state:aA});},eachContainer:function(L){var A=this;A.get(F).each(function(az){if(az){L.apply(A,arguments);}});},hasNextPage:function(){var A=this;var L=A.get(m)+1;return A.hasPage(L);},hasPage:function(az){var A=this;var L=A.get(T);return((az>0)&&(az<=L));},hasPrevPage:function(){var A=this;var L=A.get(m)-1;return A.hasPage(L);},setState:function(L){var A=this;A.set(M,L);},_afterSetState:function(L){var A=this;A._syncPageLinksUI();
A._syncPageReportUI();},_beforeSetState:function(L){var A=this;A.lastState=L.prevVal;},_bindDOMEvents:function(){var A=this;var L=A.get(Y);A.eachContainer(function(aA){var az=aA.one(O+n);if(az){az.val(L);az.detach("change");az.on("change",function(aB){try{L=aB.target.val();}catch(aC){}A.set(m,1);A.set(Y,L);A.changeRequest();});}});},_delegateDOM:function(){var A=this;A.eachContainer(function(az,L){az.delegate("click",W.bind(A._onClickFirstLinkEl,A),O+ax);az.delegate("click",W.bind(A._onClickLastLinkEl,A),O+k);az.delegate("click",W.bind(A._onClickNextLinkEl,A),O+d);az.delegate("click",W.bind(A._onClickPageLinkEl,A),O+ad);az.delegate("click",W.bind(A._onClickPrevLinkEl,A),O+ac);});},_getState:function(L){var A=this;return{before:A.lastState,page:A.get(m),paginator:A,rowsPerPage:A.get(Y),total:A.get(U),totalPages:A.get(T)};},_getTemplate:function(aB){var A=this;if(!A.templatesCache){var aA=0;var aE=A.get(aa);var az=A.get(t);while(aA++<aE){var aD=A.get(E);az.append(aD);}var L=function(aF){return A.get(aF).outerHTML();};var aC=L(au);if(ag>=9){aC=aC.replace(/selected=""/gi,"");}A.templatesCache=P.sub(aB,{CurrentPageReport:L(e),FirstPageLink:L(X),LastPageLink:L(H),NextPageLink:L(ai),PageLinks:az.outerHTML(),PrevPageLink:L(i),RowsPerPageSelect:L(au),Total:L(J)});}return A.templatesCache;},_onClickFirstLinkEl:function(L){var A=this;A.set(m,1);A.changeRequest();L.halt();},_onClickLastLinkEl:function(az){var A=this;var L=A.get(T);A.set(m,L);A.changeRequest();az.halt();},_onClickNextLinkEl:function(az){var A=this;var aA=A.get(m);var L=A.hasNextPage()?aA+1:aA;A.set(m,L);A.changeRequest();az.halt();},_onClickPageLinkEl:function(az){var A=this;var L=az.currentTarget.attr(m);A.set(m,L);A.changeRequest();az.halt();},_onClickPrevLinkEl:function(az){var A=this;var aA=A.get(m);var L=A.hasPrevPage()?aA-1:aA;A.set(m,L);A.changeRequest();az.halt();},_renderRowsPerPageOptions:function(){var A=this;var L=A.get(au);var az=A.get(q);W.each(az,function(aC,aB,aD){var aA=L.getDOM();aA.options[aB]=new Option(aC,aC);});},_renderTemplateUI:function(){var A=this;var az=A.get(F);var L=A.get(ah);A.templatesCache=null;az.html(L);A._syncPageLinksUI();A._syncPageReportUI();A._bindDOMEvents();},_setState:function(L){var A=this;W.each(L,function(aA,az){A.set(az,aA);});return L;},_setTotal:function(aA){var A=this;var L=A.get(y);var az=A.get(Y);var aB=(L||(aA!==0&&aA>az));A.get(F).toggle(aB);return aA;},_syncPageLinksUI:function(){var A=this;var az=A.get(m);var L=A.calculateRange(az);A.get(F).each(function(aC){var aB=0;var aA=L.start;var aF=aC.all(O+ad);if(aF.size()){aF.removeClass(w);while(aA<=L.end){var aE=A.get(G);var aD=aF.item(aB);aE.apply(A,[aD,aA,aB]);aD.setAttribute(m,aA);if(aA==az){aD.addClass(w);}aB++;aA++;}}});},_syncPageReportUI:function(az){var A=this;var L=A.get(r);A.get(F).each(function(aA){var aB=aA.one(O+s);if(aB){aB.html(L);}});}}});W.Paginator=B;},"@VERSION@",{requires:["aui-base"],skinnable:true});