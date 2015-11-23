// Class Artist
var Artist = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'artist';
	
	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

};

Artist.prototype = Object.create(View.prototype);

// Méthode bind spécifique à Artist
Artist.prototype.bind = function() {

	var self = this;

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	app.currentPage = app.pages.artist;
	app.currentArtist = app.pages.artist;

	// On bind KeyEvent pour que les évènements du clavier soient écoutés dès que la vue est chargée
	this.keyEvent();
};

Artist.prototype.keyEvent = function() {

	var self = this;
	
	$(window).on('keydown', function(e){

		// Si on est sur la page artist
		if ( $('#artist').is(':visible') ){

			console.log('visible');

			// Echap
			if ( e.keyCode == 27 ){
				
				// On exécute la fonction pour cacher la vue
				self.hide();
				// // On dit à la vue Galaxy de s'afficher
				// app.pages.galaxy.show();
			}

		}
	});
};
