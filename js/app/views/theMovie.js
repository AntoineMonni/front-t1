// Class TheMovie
var TheMovie = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'the-movie';
	
	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

};

// Ici on dit que TheMovie hérite de la classe parente View
// TheMovie va hériter de toutes les méthodes de View
TheMovie.prototype = Object.create(View.prototype);

// Méthode bind spécifique à TheMovie
TheMovie.prototype.bind = function() {

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	// On bind le click sur le CtaButton
	// Avec $.proxy on dit qu'au click sur le boutton :
	// Exécute moi la fonction onCtaButtonClick
	// En gardant le contexte passé en 2ème paramètre, this
	this.ctaButton.on('click', $.proxy(this.onCtaClick, this));

};

// Méthode onAnimateIn spécifique à TheMovie
// Cette fonction sera appellée une fois la vue affichée (cf. View)
TheMovie.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.onAnimateIn.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;

	// On attend 1s
	setTimeout(function(){

		// On affiche le CTA
		self.ctaButton.fadeIn();

	}, 1000);

	// On affiche le carré gris de texte en lui ajoutant la classe "visible"
	$('#the-movie .content').addClass('visible');

};

// Au click sur le CTA
TheMovie.prototype.onCtaClick = function(e) {
	
	// On intercepte le click
	e.preventDefault();

	// On cache la vue
	this.hide();

	// On affiche le trailer
	// A remplacer par app.pages.trailer.show() une fois la classe Trailer créé
	$('#trailer').fadeIn(function(){
		
		// On play le trailer	
		$('#trailer video')[0].play();

	});

};