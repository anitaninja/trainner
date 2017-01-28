function MainController(){
	this.likelist=[];
	this.movieTitle="";
	this.movieYear="";

	this.addMovie=function(){
		this.movieDetails.push({
			title: this.movieTitle,
			year: this.movieYear
		});
		
	};


	this.likeMovie=function(movie){
		this.likelist.push(movie);
	};


	this.unlikeMovie=function(ind){
		this.likelist.splice(ind);
	};


	this.name="controller as Syntax";
	
	this.movieDetails=[
		{
			title:"Movie A",
			year:"2015"
			
		},{
			title:"Movie B",
			year:"2016"
		},{
			title:"Movie C",
			year:"1999"
		}
	];

}

angular
	.module('app')
	.controller("MainController",['$scope',MainController]);