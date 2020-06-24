(function () {

	let svgStuff = angular.module("svg", []);

	svgStuff.controller(
	"appCtrl",
	function ($scope) {
	let app = this;
	});

	svgStuff.component("map", {
		controller: "mapCtrl",
		controllerAs: "map",
		templateUrl: "../map.html",
		bindings: {
			"animTime": "<",
			"animDist": "<"
		}
	});

	svgStuff.controller(
	"mapCtrl",
	function($scope){
	let map = this;

		map.$onInit = function(){
			if(map.animDist){
				map.view.startAnimate(
					map.animTime,
					map.animDist
				);
			}else{
				map.animDist = map.view.dist;
				if(map.animTime){
					map.view.startAnimate(
						map.animTime,
						map.animDist
					);
				}else{
					map.disabled = "Map Created without props."
				}
			}
		}

		map.view = {
			orig: {
				x: 0,
				y: 0
			},
			dim: {
				x: 617,
				y: 617
			},
			time: 1,
			dist: 617,
			animationLoop(distance){
			// go up by 1% of the distance or base
			// every "time"...
				this.orig.x = this.orig.x + 1;
				this.orig.y = this.orig.y + 1;
				if(this.orig.x > distance){
					map.view.orig.x = 0;
					map.view.orig.y = 0;
				};
			},
			stopAnimate(){
				clearInterval(this.setLoop);
				this.setLoop = null;
			},
			startAnimate(time, distance){
				map.disabled = null;
				if (!this.setLoop){
					if(typeof time === "number" && typeof distance === "number"){
						this.setLoop = setInterval(function(){
							map.view.animationLoop(distance);
							$scope.$apply();
						}, time);
						// if(typeof distance === "number"){

						// }
					} else if (typeof time == "number"){
						this.setLoop = setInterval(function(){
							map.view.animationLoop(distance);
							$scope.$apply();
						}, time);
					} else{
						this.setLoop = setInterval(function(){
							map.view.animationLoop(distance);
							$scope.$apply();
						}, 1);
					}
				}
			}
		};

	});

})();