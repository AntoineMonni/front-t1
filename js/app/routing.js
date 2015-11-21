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

	crossroads.addRoute(/^\/[A-Z]{1}$/, function(){
		if ( app.currentPage != null ) app.currentPage.hide();

		app.pages.galaxy.show();

		app.currentPage = app.pages.galaxy;

	});


	crossroads.addRoute(/^\/[A-Z]{1}\/\w+.?\w*/, function(){
		if ( app.currentPage != null ) app.currentPage.hide();

		app.pages.artist.show();

		app.currentPage = app.pages.artist;
	});


	crossroads.addRoute(/mentions|credits|demarche|contact/, function(){
  		if ( app.currentPage != null ) app.currentPage.hide();
  		if ( app.currentSupport != null ) app.currentSupport.hide();
  		var url = History.getState().hash;
  		var param = url.substring(1);
  		console.log(param);

		app.pages[param].show();

		app.currentSupport = app.pages[param];

	});


	// Bind URL change
	History.Adapter.bind(window, "statechange", function(e){
	  // URL has changed

	  // Value of History hash
		var newUrl = History.getState().hash;

		console.log('new url is', newUrl);

		crossroads.parse( newUrl );

	});

	// Parse URL for the first time
	crossroads.parse( History.getState().hash );
	
	// console.log(app_templates);
});