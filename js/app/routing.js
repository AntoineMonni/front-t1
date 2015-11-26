$(document).ready(function(){

	// On crée une instance de notre classe App
	// Et on la stock dans une variable globale app
	app = new App();

	var self = this;

	// home
	crossroads.addRoute('/', function(){
		if ( app.currentPage != null ) app.currentPage.hide();
		console.log('proc');
		app.pages.home.show();

		app.currentPage = app.pages.home;

	});

	// galaxy
	crossroads.addRoute(/^\/[A-Z]{1}$/, function(){
		if ( app.currentPage != null ) app.currentPage.hide();

		app.pages.galaxy.show();

		app.currentGalaxy = app.pages.galaxy;
		app.currentPage = app.pages.galaxy;

	});

	// artist
	crossroads.addRoute(/^\/[A-Z]{1}\/\w+(.?\w*)*/, function(){
		if ( app.currentPage != null ) app.currentPage.hide();

		app.pages.artist.show();

		app.currentArtist = app.pages.artist;
		app.currentPage = app.pages.artist;
	});

	// support
	crossroads.addRoute(/mentions|credits|demarche|contact/, function(){
  		if ( app.currentPage != null ) app.currentPage.hide();
  		var url = History.getState().hash;
  		var param = url.substring(1);
  		console.log(param);

		app.pages[param].show();

		app.currentPage = app.pages[param];
		app.currentSupport = app.pages[param];

	});

	crossroads.bypassed.add(function(request){
		if ( app.currentPage != null ) app.currentPage.hide();
	   	console.log(request);
		// app.pages.404.show();

		// app.currentPage = app.pages.404;
	});

	// Bind URL change
	History.Adapter.bind(window, "statechange", function(e){
	  // URL has changed

	  // Value of History hash
		var newUrl = History.getState().hash;

		crossroads.parse( newUrl );


	});

	// Parse URL for the first time
	crossroads.parse( History.getState().hash );
});