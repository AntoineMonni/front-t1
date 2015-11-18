// Class Galaxy
var Galaxy = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'galaxy';
	
	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

};

// Ici on dit que Galaxy hérite de la classe parente View
// Galaxy va hériter de toutes les méthodes de View
Galaxy.prototype = Object.create(View.prototype);

// Méthode bind spécifique à Galaxy
Galaxy.prototype.bind = function() {

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	app.currentPage = app.pages.galaxy;

	this.artistButton.on('click', $.proxy(this.onCtaClick, this));
};

// Méthode onAnimateIn spécifique à Galaxy
// Cette fonction sera appellée une fois la vue affichée (cf. View)
Galaxy.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.onAnimateIn.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;

	// On attend 1s
	setTimeout(function(){

		// On affiche le CTA
		self.artistButton.fadeIn();

	}, 1000);

};

// Au click sur le CTA
Galaxy.prototype.onCtaClick = function(e) {
	
	// On intercepte le click
	e.preventDefault();

	// On cache la vue
	this.hide();

	// On affiche le trailer
	// A remplacer par app.pages.trailer.show() une fois la classe Trailer créé
	app.pages.artist.show();

};