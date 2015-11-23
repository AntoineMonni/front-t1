var Navigation = function() {

	this.init();
};

Navigation.prototype.init = function() {


};

Navigation.prototype.bind = function(key) {

	// On sauvegarde la touche pressée et sa valeur
	this.key = key;
	this.letter = String.fromCharCode(this.key);

	// On lance la bonne fonction selon la touche
	switch(true) {
		// Si l'utilisateur a cliqué sur une touche [A-Z]
		case (key > 64 && key < 91): 
			this.directNav();
			break;
		// Flèche vers la gauche
		case (key == 37):
			console.log('gauche');
			break;
		// Flèche vers le Haut
		case (key == 38):
			console.log('haut');
			break;
		// Flèche vers la droite
		case (key == 39):
			console.log('droite');
			break;
		// Flèche vers le Haut
		case (key == 40):
			console.log('bas');
			break;
	}
};

Navigation.prototype.directNav = function() {

	app.pages.galaxy.letter = this.letter;

	this.displaySingleLetter();
	

	History.pushState(null, null, '/'+app.pages.galaxy.letter);
};

Navigation.prototype.displaySingleLetter = function() {
	
	app.letterSection.find('.single-letter').html(this.letter);

	app.letterSection.fadeIn();

	setTimeout(function(){

		app.letterSection.fadeOut();

	}, 1000);

};