// On crée une classe App qui sera notre classe principale
var App = function(){

	// On crée un objet vide qui nous servira à stocker nos vues / pages
	this.pages = {};

	this.currentPage = null;

	// On éxécute la fonction init de la classe
	this.init();

};

// Init
App.prototype.init = function() {
	
	// On crée une instance de la classe Home
	this.pages.home = new Home();

	// On crée une instance de la classe Galaxy
	this.pages.galaxy = new Galaxy();

	// On crée une instance de la classe Artist
	this.pages.artist = new Artist();

};

// On attend que le DOM soit prêt
$(document).ready(function(){

	// On crée une instance de notre classe App
	// Et on la stock dans une variable globale app
	app = new App();

	var self = this;

	crossroads.addRoute('/', function(){
  	
		if ( app.currentPage != null ) app.currentPage.hide();

		app.pages.home.show();

		app.currentPage = app.pages.home;

	});

	crossroads.addRoute('/galaxy', function(){
  	
		if ( app.currentPage != null ) app.currentPage.hide();

		app.pages.galaxy.show();

		app.currentPage = app.pages.galaxy;
	});

	// Bind URL change
	History.Adapter.bind(window, "statechange", function(e){
	  // URL has changed

	  // Value of History hash
		var newUrl = History.getState().hash;

		console.log('new url is', newUrl);

		crossroads.parse( newUrl );

	});

	$('header nav a').on('click', function(e){

		e.preventDefault();

		var url = $(this).attr('href');

		History.pushState(null, null, url);

		console.log(url);

	});


	// Parse URL for the first time
	crossroads.parse( History.getState().hash );

});