// Class Credits
var Credits = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View_sup)
	this.id = 'credits';

	this.btn = '.credits-btn';
	
	// Appelle le constructeur de View_sup
	// Et ajoute les propriétés de View_sup à Home
	View_sup.apply(this, arguments);

};

// Ici on dit que Credits hérite de la classe parente View_sup
// Credits va hériter de toutes les méthodes de View_sup
Credits.prototype = Object.create(View_sup.prototype);

// Méthode bind spécifique à Credits
Credits.prototype.bind = function() {

	// On appelle d'abord la fonction bind de la classe parente View_sup
	// Equivalent de la fonction super() dans d'autres languages
	View_sup.prototype.bind.call(this);

	app.currentSupport = app.pages.credits;

	View_sup.prototype.handleMenu.call(this.id);
};

// Méthode onAnimateIn spécifique à Credits
// Cette fonction sera appellée une fois la vue affichée (cf. View_sup)
Credits.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View_sup
	// Equivalent de la fonction super() dans d'autres languages
	View_sup.prototype.onAnimateIn.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;
};
