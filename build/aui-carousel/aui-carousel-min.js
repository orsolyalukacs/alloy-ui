YUI.add("aui-carousel",function(e,t){var n=e.Lang,r=e.getClassName,i=r("image","viewer","base","control"),s=r("image","viewer","base","control","left"),o=r("image","viewer","base","control","right"),u=r("image","viewer","base","image"),a=r("carousel","item","active","transition"),f=r("carousel","item","transition"),l=r("carousel","menu"),c=r("carousel","menu","active"),h=r("carousel","menu","index"),p=r("carousel","menu","item"),d=[p,h,c].join(" "),v=[p,h].join(" "),m=r("carousel","menu","next"),g=r("carousel","menu","pause"),y=r("carousel","menu","play"),b=r("carousel","menu","prev"),w=r("carousel","outside","menu"),E="inside",S="outside",x="."+h;e.Carousel=e.Base.create("carousel",e.ImageViewerBase,[e.ImageViewerSlideshow],{TPL_ITEM:'<li><a class="'+p+" "+i+' {cssClasses}">{index}</a></li>',TPL_MENU:'<div class="'+l+'"><menu>'+'<li><a class="'+p+" "+y+" "+i+'"></a></li>'+'<li><a class="'+p+" "+b+" "+s+" "+i+'"></a></li>'+"{items}"+'<li><a class="'+p+" "+m+" "+o+" "+i+'"></a></li>'+"</menu></div>",initializer:function(){this.after({render:this._afterRender})},bindUI:function(){e.Carousel.superclass.bindUI.apply(this,arguments),this.after({nodeMenuChange:this._afterNodeMenuChange,nodeMenuItemSelectorChange:this._afterNodeMenuItemSelectorChange,nodeMenuPositionChange:this._afterNodeMenuPositionChange,pauseOnHoverChange:this._afterPauseOnHoverChange,playingChange:this._afterPlayingChange}),this._bindPauseOnHover()},renderUI:function(){e.Carousel.superclass.renderUI.apply(this,arguments)},syncUI:function(){this._syncNodeMenuPositionUI(),this.get("useARIA")&&this._syncAriaMenuUI()},destructor:function(){this._menuClickDelegateHandler&&this._menuClickDelegateHandler.detach()},item:function(e){this.set("currentIndex",e)},_afterNodeMenuChange:function(){this._bindPauseOnHover(),this._syncControlsUI(),this._syncNodeMenuPositionUI()},_afterNodeMenuItemSelectorChange:function(){this._bindControls()},_afterNodeMenuPositionChange:function(){this._syncNodeMenuPositionUI()},_afterPauseOnHoverChange:function(){this._bindPauseOnHover()},_afterPlayingChange:function(){this.get("useARIA")&&this._syncAriaPlayerUI()},_afterRender:function(){this._plugFocusManager()},_afterResponsive:function(e){this.get("boundingBox").all(".image-viewer-base-image-list, .image-viewer-base-image").setStyles({height:e.height,width:e.width})},_bindControls:function(){this._menuClickDelegateHandler&&this._menuClickDelegateHandler.detach(),this._menuClickDelegateHandler=this.get("boundingBox").delegate("click",this._onClickControl,this.get("nodeMenuItemSelector"),this)},_bindPauseOnHover:function(){var t=this.get("boundingBox"),n=this.get("nodeMenu"),r=this.get("pauseOnHover");r?this.hoverEventHandles=[t.on("mouseenter",e.bind(this._onCarouselEnter,this)),t.on("mouseleave",e.bind(this._onCarouselLeave,this)),n.on("mouseenter",e.bind(this._onMenuEnter,this)),n.on("mouseleave",e.bind(this._onMenuLeave,this))]:((new e.EventHandle(this.hoverEventHandles)).detach(),this.hoverEventHandles=null)},_createMenuNode:function(){var t=this.get("currentIndex"),r=[],i,s=this.get("sources").length,o;for(i=0;i<s;i++)r.push(n.sub(this.TPL_ITEM,{cssClasses:t===i?d:v,index:i}));return o=e.Node.create(n.sub(this.TPL_MENU,{items:r.join(" ")})),o},_defAnimateFn:function(){if(!this.get("playing"))return;e.Carousel.superclass._defAnimateFn.apply(this,arguments);var t,r;n.isNumber(this._previousIndex)&&(r=this._getImageContainerAtIndex(this._previousIndex),t=this._getCurrentImageContainer(this._previousIndex),r.addClass(f),t.addClass(a),this._animation.onceAfter("end",function(){r.removeClass(f),t.removeClass(a)}))},_isMouseInsideMenu:function(e){var t=this.get("nodeMenu").get("region");return t.left>e.clientX||e.clientX>t.right||t.top>e.clientY||e.clientY>t.bottom},_onCarouselEnter:function(e){this._isMouseInsideMenu(e)&&this._pauseOnEnter()},_onCarouselLeave:function(){this._playOnLeave()},_onClickControl:function(t){e.Carousel.superclass._onClickControl.apply(this,arguments),t.preventDefault(),t.currentTarget.hasClass(h)&&this.set("currentIndex",this._menuNodes.indexOf(t.currentTarget))},_onKeydown:function(e){var t=this.get("controlNext"),n=this.get("controlPrevious"),r=this.get("nodeMenu"),i=r.focusManager._focusedNode.one("a");i&&e.isKey("ENTER")&&(i==t?this.next():i==n?this.prev():i.hasClass(h)?(e.currentTarget=i,this._onClickControl(e)):(i.hasClass(y)||i.hasClass(g))&&this._onPlayerClick(),e.preventDefault()),e.isKey("SPACE")&&(e.preventDefault(),this._onPlayerClick())},_onMenuEnter:function(e){e.relatedTarget&&e.relatedTarget.hasClass(u)&&this._playOnLeave()},_onMenuLeave:function(e){e.relatedTarget&&e.relatedTarget.hasClass(u)&&this._pauseOnEnter()},_pauseOnEnter:function(){this.get("playing")&&(this.pause(),this._pausedOnEnter=!0)},_playOnLeave:function(){this._pausedOnEnter&&(this.play(),this._pausedOnEnter=!1)},_plugFocusManager:function(){var t=this.get("focusManager"),n=this.get("nodeMenu");n.plug(e.Plugin.NodeFocusManager,t),n.on("keydown",e.bind("_onKeydown",this))},_renderControls:function(){this.get("boundingBox").append(this.get("nodeMenu"))},_renderPlayer:function(){this._player=this.get("nodeMenu").one("."+y)},_setNodeMenu:function(t){var n=e.one(t)||this._createMenuNode();return this._menuNodes=n.all(x),n},_syncAriaControlsUI:function(e){this.aria.setAttributes([{name:"selected",node:this._menuNodes,value:"false"},{name:"selected",node:e,value:"true"}])},_syncAriaMenuUI:function(){this.aria.setAttributes([{name:"controls",node:this.get("nodeMenu"),value:"carousel"},{name:"label",node:this.get("controlNext"),value:"next"},{name:"label",node:this.get("controlPrevious"),value:"previous"},{name:"label",node:this._player,value:"play"},{name:"live",node:this.get("boundingBox"),value:"polite"}])},_syncAriaPlayerUI:function(){var e="pause";this.get("playing")&&(e="play"),this.aria.setAttribute("label",e,this._player)},_syncControlsUI:function(){var e=this.get("currentIndex"),t=this._menuNodes.item(e);t&&(t.addClass(c),this.get("useARIA")&&this
._syncAriaControlsUI(t)),n.isNumber(this._previousIndex)&&(t=this._menuNodes.item(this._previousIndex),t&&t.removeClass(c))},_syncNodeMenuPositionUI:function(){var e=this.get("nodeMenuPosition"),t=0;this.get("boundingBox").toggleClass(w,e===S),e===S&&(t=this.get("nodeMenu").get("offsetHeight")),this.set("gutter",[0,t])},_syncPlaying:function(){var e=this._player;if(e){var t=g,n=y;this.get("playing")&&(t=y,n=g),e.replaceClass(t,n)}},_validateNodeMenuPosition:function(e){return e===E||e===S}},{ATTRS:{circular:{validator:n.isBoolean,value:!0},controlNext:{setter:function(e){return e?e:this.get("nodeMenu").one("."+m)},validator:n.isNode,value:null},controlPrevious:{setter:function(e){return e?e:this.get("nodeMenu").one("."+b)},validator:n.isNode,value:null},focusManager:{value:{circular:!0,descendants:"li",focusClass:"focused",keys:{next:"down:39",previous:"down:37"}},validator:n.isObject,writeOnce:"initOnly"},nodeMenu:{setter:"_setNodeMenu",value:null},nodeMenuItemSelector:{validator:n.isString,value:"."+p},nodeMenuPosition:{validator:"_validateNodeMenuPosition",value:E},pauseOnHover:{validator:n.isBoolean,value:!1}},CSS_PREFIX:e.getClassName("carousel")})},"3.0.3-deprecated.73",{requires:["anim","aui-event","aui-image-viewer-base","aui-image-viewer-slideshow","node-event-delegate","node-focusmanager"],skinnable:!0});
