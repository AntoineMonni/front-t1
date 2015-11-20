// Classe View
// Qui sera la classe parente à toutes nos vues
var View = function(){

	// On définit le sélecteur en fonction du paramètre id de chaque vue
	this.domElem = $('#' + this.id);

	// On définit le CTA en fonction du domElem
	this.ctaButton = this.domElem.find('.cta');
	this.artistButton = this.domElem.find('.artist');
	this.closeButton = this.domElem.find('.close');

	this.help = $('#help');

	this.menu = this.domElem.find('#burger');

	this.footerItem = $(document).find('.footer-item');

};

// Afficher la vue
View.prototype.show = function() {
	
	// On commence par "binder" la vue avant de l'afficher
	this.bind();

	// On stocke le contexte dans une variable pour pouvoir y accéder plus bas
	var self = this;

	// On affiche le domElem de la vue
	this.domElem.fadeIn(function(){

		// Une fois que le domElem est affiché
		// On appelle une fonction dans laquelle on pourra mettre
		// tout ce dont on a besoin de faire une fois la vue affichée 
		self.onAnimateIn();

	});

};

// Cacher la vue
View.prototype.hide = function() {
		
	// On "unbind" la vue
	// Càd on désactive les onclick etc.
	// Pour éviter d'avoir plusieurs onclick sur le même élément
	// Lorsqu'on affichera à nouveau la vue par la suite
	this.unbind();

	// Cache la vue
	this.domElem.fadeOut();

};

// Fonction bind
View.prototype.bind = function() {

	// Bind footer menu items to display right views
	this.footerItem.on('click', $.proxy(this.onFooterClick, this));

	// Bind close button for all views
	this.closeButton.on('click', $.proxy(this.onCloseView, this));

};

// Fonction unbind
View.prototype.unbind = function() {

};

// Fonction onAnimateIn
View.prototype.onAnimateIn = function() {

};

View.prototype.onCloseView = function(e) {
	
	// On intercepte le click
	e.preventDefault();

	// On exécute la fonction pour cacher la vue
	this.hide();

	// On dit à la vue Galaxy de s'afficher
	app.pages.galaxy.show();
};

View.prototype.onFooterClick = function(e) {

	e.preventDefault();

	var target = e.target,
		value  = $(target).attr('href');

	this.hide();

	app.currentView = app.pages.galaxy;

	switch(value) {
		case '/demarche':
			app.pages.demarche.show();
			break;
		case '/mentions':
			app.pages.mentions.show();
			break;
		case '/credits':
			app.pages.credits.show();
			break;
		case '/contact':
			app.pages.contact.show();
			break;

		default: 
			app.pages.galaxy.show();
		break;
	}
};

View.prototype.help = function(e) {
	
	e.preventDefault();




	
};