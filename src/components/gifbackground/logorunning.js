(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"logorunning_atlas_1", frames: [[0,0,1657,302]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.横式LOGO = function() {
	this.initialize(ss["logorunning_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.runningbackground = function() {
	this.initialize(img.runningbackground);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1926,4167);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.logo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.横式LOGO();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.logo, new cjs.Rectangle(0,0,1657,302), null);


// stage content:
(lib.logorunning = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// logo_复制
	this.instance = new lib.logo();
	this.instance.setTransform(643,464.1,0.181,0.181,3.7755,0,0,829.4,152.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:828.9,regY:151.6,rotation:-4.831,guide:{path:[642.9,464.1,758.8,474.3,861.1,471.8,959,469.4,1038.2,463.8]}},15).to({regX:829,regY:151.8,rotation:-14.998,guide:{path:[1038.2,463.7,1096.7,459.6,1144.9,453.7,1258.6,439.7,1420.8,391.2]}},14).wait(1).to({regX:828.6,regY:151.5,rotation:14.9967,x:-161.75,y:296.4},0).to({regX:829.1,regY:152.3,rotation:6.0735,guide:{path:[-161.7,296.4,-104,315.6,-52.9,333.6,-1.8,351.6,137.2,382.8,276,414,483.5,444.9,511.2,449,538.3,452.5]}},25).to({regX:828.9,regY:151.6,rotation:-4.831,guide:{path:[538.3,452.6,713.7,475.4,861.1,471.8,959,469.4,1038.2,463.8]}},19).to({regX:829,regY:151.8,rotation:-14.998,guide:{path:[1038.2,463.7,1096.7,459.6,1144.9,453.7,1258.6,439.7,1420.8,391.2]}},15).wait(1));

	// logo
	this.instance_1 = new lib.logo();
	this.instance_1.setTransform(-161.75,296.4,0.181,0.181,14.9967,0,0,828.6,151.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:829.1,regY:152.3,rotation:6.0735,guide:{path:[-161.7,296.4,-104,315.6,-52.9,333.6,-1.8,351.6,137.2,382.8,276,414,483.5,444.9,511.2,449,538.3,452.5]}},25).to({regX:829.4,regY:152.7,rotation:3.7755,guide:{path:[538.3,452.6,591.9,459.6,643,464.1]}},4).to({regX:828.9,regY:151.6,rotation:-4.831,guide:{path:[642.9,464.1,758.8,474.3,861.1,471.8,959,469.4,1038.2,463.8]}},15).to({regX:829,regY:151.8,rotation:-14.998,guide:{path:[1038.2,463.7,1096.7,459.6,1144.9,453.7,1258.6,439.7,1420.8,391.2]}},15).wait(1).to({regX:828.6,regY:151.5,rotation:14.9967,x:-161.75,y:296.4},0).to({regX:829.1,regY:152.3,rotation:6.0735,guide:{path:[-161.7,296.4,-104,315.6,-52.9,333.6,-1.8,351.6,137.2,382.8,276,414,483.5,444.9,511.2,449,538.3,452.5]}},25).to({regX:829.4,regY:152.7,rotation:3.7755,guide:{path:[538.3,452.6,591.9,459.6,643,464.1]}},4).wait(1));

	// 图层_1
	this.instance_2 = new lib.runningbackground();
	this.instance_2.setTransform(0,0,0.5607,0.5607);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(90));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(226.3,1168,1346.4,1168.6);
// library properties:
lib.properties = {
	id: 'DF78BFB2BCD5984E9EFE6D1B064F8514',
	width: 1080,
	height: 2336,
	fps: 6,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/runningbackground.jpg?1678868615009", id:"runningbackground"},
		{src:"images/logorunning_atlas_1.png?1678868614996", id:"logorunning_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['DF78BFB2BCD5984E9EFE6D1B064F8514'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;