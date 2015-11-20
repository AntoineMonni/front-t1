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

	// On crée une instance de la classe Demarche
	this.pages.demarche = new Demarche();

	// On crée une instance de la classe Mentions
	this.pages.mentions = new Mentions();

	// On crée une instance de la classe Credits
	this.pages.credits = new Credits();

	// On crée une instance de la classe Contact
	this.pages.contact = new Contact();

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

	// crossroads.addRoute('/{letter}/', function(ltr){
	// console.log("tessst");
	// 	if ( app.currentPage != null ) app.currentPage.hide();

	// 	console.log(ltr);
	// 	app.pages.galaxy.show();

	// 	app.currentPage = app.pages.galaxy;

	// });

	// crossroads.addRoute('/{letter}/{name}/', function(ltr,name){
 //  		console.log("tessst");
	// 	if ( app.currentPage != null ) app.currentPage.hide();

	// 	console.log(ltr);
	// 	console.log(name);
	// 	app.pages.artist.show();

	// 	app.currentPage = app.pages.artist;
	// });


	crossroads.addRoute('/{param}', function(param){
  	
		if ( app.currentPage != null ) app.currentPage.hide();

		console.log(param)

		app.currentPage = app.pages.param;
	});


	// Bind URL change
	History.Adapter.bind(window, "statechange", function(e){
	  // URL has changed

	  // Value of History hash
		var newUrl = History.getState().hash;

		console.log('new url is', newUrl);

		crossroads.parse( newUrl );

	});

	var header = $('header');
	var footer = $('footer');

	function menuRoads(menu) {
		menu.find('nav a').on('click', function(e){
			e.preventDefault();

			var url = $(this).attr('href');

			History.pushState(null, null, url);

		});
	}

	menuRoads(header);
	menuRoads(footer);

	// On click on menu button
	clickMenu($('#burger'));

	function clickMenu(elem) {
		elem.on('click', function(e) {
			e.preventDefault();

			// Active state on the button
			$(this).toggleClass('active');

			// Show the footer / menu
			footer.toggleClass('show');
			// Hide header if not / reverse
			if(!header.hasClass('hide')) {
				header.addClass('hide');
			}else {
				header.removeClass('hide');
			}
		});
	}

	mouseOver(footer);
	mouseLeave(footer);

	// Set green cursor beside the right menu item
	function mouseOver(elem) {
		elem.find('a').on('mouseover', function() {
			var distanceLeft = $(this)[0].offsetLeft;
			elem.find('span').css('left', distanceLeft-10);
		});
	}
	
	function mouseLeave(elem) {
		elem.on('mouseleave', function() {
			elem.find('span').css('left', -10);
		});
	}

	footer.find('nav a').on('click', function(e) {
		e.preventDefault();

		$(this).parent().find('a').removeClass('active');
		$(this).addClass('active');
	});

	// Parse URL for the first time
	crossroads.parse( History.getState().hash );

	console.log(app_templates);


	// Display Help panel
	$('#help-button').on('click', function(e) {
		e.preventDefault();

		$('#help').toggleClass('show');
	});
	// Hide on click
	$('#help').on('click', function(e) {
		e.preventDefault();

		if($(this).hasClass('show')) {
			$(this).removeClass('show');
		}
	});

});