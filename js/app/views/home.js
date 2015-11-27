// Class Home
var Home = function(){

	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'home';

	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

};

// Ici on dit que Home hérite de la classe parente View
// Home va hériter de toutes les méthodes de View
Home.prototype = Object.create(View.prototype);

// Ici on n'a pas besoin de créer de méthode show ni de méthode hide
// Car le comportement que l'on souhaite n'a rien de spécifique
// par rapport à celui de la classe parente View
//
// Etant donné que la classe Home hérite de la classe View
// Si dans Home il n'y a pas de fonction show, alors ce sera
// la fonction View.show qui sera exécutée par défaut

// Méthode bind spécifique à Home
Home.prototype.bind = function() {
	
	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	// On stocke le contexte
	var self = this;

	app.currentPage = app.pages.home;
	// On bind le click sur le CtaButton
	// Avec $.proxy on dit qu'au click sur le boutton :
	// Exécute moi la fonction onCtaButtonClick
	// En gardant le contexte passé en 2ème paramètre, this
	this.ctaButton.on('click', $.proxy(this.onCtaButtonClick, this));

	// On cache les éléments de navigation sur la home
	this.help.addClass('show');
	$('#help-button').css('display', 'none');
	this.header.css('display', 'none');
	this.menu.css('display', 'none');
	$('.logo').addClass('home-logo');
};

// Méthode onCtaButtonClick spécifique à Home
Home.prototype.onCtaButtonClick = function(e) {
	
	// On intercepte le click
	e.preventDefault();


	// On exécute la fonction pour cacher la vue
	this.hide();

	// On ré-affiche tout une fois qu'on arrive sur galaxy
	this.help.removeClass('show');
	$('#help-button').fadeIn();
	this.header.fadeIn();
	this.menu.fadeIn();
	$('.logo').removeClass('home-logo');

	// On dit à la vue Galaxy de s'afficher
	History.pushState(null, null, '/'+app.pages.galaxy.letter);

};