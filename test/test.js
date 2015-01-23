"format global";


var get = function(url, cb){
	console.log(url);
	function reqListener () {
		cb(this.responseText);
	}
	
	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.open("get", url, true);
	oReq.send();
};

var amdExports = amd({});

QUnit.module("system-amd-parse plugin");

asyncTest("Basics works", function(){
	get("basics.js", function(basics){
		deepEqual( amdExports.getAMDDeps(basics), ["foo","bar"]);
		start();
	});
});

asyncTest("named basics works", function(){
	get("named.js", function(basics){
		deepEqual( amdExports.getAMDDeps(basics), ["foo","bar","car"]);
		start();
	});
});

asyncTest("empty deps works", function(){
	get("empty-deps.js", function(basics){
		deepEqual( amdExports.getAMDDeps(basics), []);
		start();
	});
});

asyncTest("no deps works", function(){
	get("no-deps.js", function(basics){
		deepEqual( amdExports.getAMDDeps(basics), []);
		start();
	});
});

asyncTest("named export object", function(){
	get("named-obj.js", function(basics){
		deepEqual( amdExports.getAMDDeps(basics), []);
		start();
	});
});

asyncTest("cjs dependencies", function(){
	get("cjs-deps.js", function(basics){
		deepEqual( amdExports.getAMDDeps(basics), ["foo","bar"]);
		start();
	});
});

asyncTest("cjs dependencies", function(){
	get("cjs-deps-named-function.js", function(basics){
		deepEqual( amdExports.getAMDDeps(basics), ["foo","bar"]);
		start();
	});
});


QUnit.start();
