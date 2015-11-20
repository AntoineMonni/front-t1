// Class Demarche
var Demarche = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'demarche';
	
	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

};

// Ici on dit que Demarche hérite de la classe parente View
// Demarche va hériter de toutes les méthodes de View
Demarche.prototype = Object.create(View.prototype);

// Méthode bind spécifique à Demarche
Demarche.prototype.bind = function() {

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	app.currentPage = app.pages.demarche;

};

// Méthode onAnimateIn spécifique à Demarche
// Cette fonction sera appellée une fois la vue affichée (cf. View)
Demarche.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.onAnimateIn.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;
};
