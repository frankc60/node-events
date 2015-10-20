"use strict";
let Events = require("events").EventEmitter;

//*****************************************
function Publisher_NewsPaper(name){
	this.emiter = new Events;
	this.name=name;
	this.money=0;
	this.info=function(){
		console.log("PUB: I am a NewsPaper publisher called " + this.name);
		//need to emit (publish) an event has happened
		(this.emiter).emit("info",this.name);
	}
	this.pressRelease=function(words){
		console.log("PUB: Press Release from the publisher called " + this.name + " ´"+words+"´");
		(this.emiter).emit("pressRelease",this);
	}
	this.addMoney=function(amount){
		this.money+=amount;
		(this.emiter).emit("addMoney",this);
	}

	//add a sub to this object when constructor is called
	Subscriber(this);
}
//*****************************************
function Subscriber(publisher){
	
	//add a sub listener (.on) to the pub eventEmiter
	(publisher.emiter).on("info",function(who){
		console.log("SUB: subcriber called to publisher: ·" + who + "·");
	});
	(publisher.emiter).on("pressRelease",function(who){
		console.log("SUB: pressRelease -subcriber called to publisher: ·" + who.name + "·");
	});
	publisher.emiter.on("addMoney",function(who){
		console.log("SUB: Money update for " + who.name + ", new total is " + who.money);
	});

}
//*****************************************

var paper1 = new Publisher_NewsPaper("The Press"); 
var paper2 = new Publisher_NewsPaper("The Outlook"); 
var paper3 = new Publisher_NewsPaper("The NewEarth"); 




paper1.info();
paper1.addMoney(125);
console.log("------------");
paper2.info();
console.log("------------");
paper3.info();
console.log("------------");
paper2.pressRelease("the end is nigh");
paper1.addMoney(125);
paper1.addMoney(125);
console.log("console.log out object property money: " +paper1.money);