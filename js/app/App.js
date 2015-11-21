// On crée une classe App qui sera notre classe principale
var App = function(){

	// On crée un objet vide qui nous servira à stocker nos vues / pages
	this.pages = {};

	this.currentPage = null;
	this.currentArtist = null;
	this.currentGalaxy = null;
	this.currentSupport = null;

	this.menu = $('#burger');
	this.header = $('header');
	this.footer = $('footer');
	this.helpButton = $('#help-button');
	this.help = $('#help');

	this.allMenuItem = $('nav a');
	this.headerMenuItem = this.header.find('nav a');
	this.footerMenuItem = this.footer.find('nav a');


	this.bind();
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

App.prototype.bind = function(){

	this.allMenuItem.on('click', $.proxy(this.menuRoads, this));
	this.menu.on('click', $.proxy(this.toggleMenu, this));
	this.allMenuItem.on('click', $.proxy(this.toggleActive, this));

	this.footerMenuItem.on('mouseover', $.proxy(this.mouseOver, this));
	this.footer.on('mouseleave', $.proxy(this.mouseLeave, this));

	this.helpButton.on('click', $.proxy(this.showHelp, this));
	this.help.on('click', $.proxy(this.toggleHelp, this));

};

App.prototype.menuRoads = function(e) {
	e.preventDefault();
	var url = $(e.target).attr('href');
	History.pushState(null, null, url);
};

App.prototype.toggleMenu = function(e){
	e.preventDefault();
	// Active state on the button
	$(e.target).toggleClass('active');

	// Show the this.footer / menu
	this.footer.toggleClass('show');
	// Hide this.header if not / reverse
	if(!this.header.hasClass('hide')) {
		this.header.addClass('hide');
	}else {
		this.header.removeClass('hide');
	}
};

// Set green cursor beside the right menu item
App.prototype.mouseOver = function(e) {
	var distanceLeft = $(e.target)[0].offsetLeft;
	this.footer.find('span').css('left', distanceLeft-10);
};

App.prototype.mouseLeave = function(e) {
	this.footer.find('span').css('left', -10);
};

App.prototype.toggleActive = function(e){
	e.preventDefault();

	$(e.target).parent().find('a').removeClass('active');
	$(e.target).addClass('active');
};

App.prototype.showHelp = function(e){
	e.preventDefault();

	this.helpButton.toggleClass('active');
	this.help.toggleClass('show');
}

App.prototype.toggleHelp = function(e){
	e.preventDefault();
	console.log(e.target);
	this.helpButton.removeClass('active');
	if($(e.target).hasClass('show')) {
		$(e.target).removeClass('show');
	}
}