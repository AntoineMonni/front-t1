// Classe View
// Qui sera la classe parente à toutes nos vues
var View = function(){

	// On définit le sélecteur en fonction du paramètre id de chaque vue
	this.domElem = $('#' + this.id);

	// On définit le CTA en fonction du domElem
	this.ctaButton = this.domElem.find('.cta');

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

};

// Fonction unbind
View.prototype.unbind = function() {

};

// Fonction onAnimateIn
View.prototype.onAnimateIn = function() {

};