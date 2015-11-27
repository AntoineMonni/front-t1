// Class NotFound
var NotFound = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'notfound';


	
	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à 404
	View.apply(this, arguments);

};

// Ici on dit que NotFound hérite de la classe parente View
// NotFound va hériter de toutes les méthodes de View
NotFound.prototype = Object.create(View.prototype);

// Méthode bind spécifique à NotFound
NotFound.prototype.bind = function() {

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	app.currentPage = app.pages.notfound;

	this.ctaButton.on('click', $.proxy(this.onCloseView, this));

	$('a').removeClass('active');
};

// Méthode onAnimateIn spécifique à NotFound
// Cette fonction sera appellée une fois la vue affichée (cf. View)
NotFound.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.onAnimateIn.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;
};
