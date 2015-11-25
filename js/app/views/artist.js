// Class Artist
var Artist = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'artist';
	this.artist = null;

	this.tpl = app_templates.artist;

	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

	this.tplContent = 	this.domElem.find('[tpl-content]');
	this.document = $(document);

};

Artist.prototype = Object.create(View.prototype);

// Méthode bind spécifique à Artist
Artist.prototype.bind = function() {

	var self = this;

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	var url = History.getState().hash;
	var artist = url.substring(3);
	var letter = url.substring(1,2);
	if ( artist != "" )
		this.artist = artist;

	app.currentPage = app.pages.artist;
	app.currentArtist = app.pages.artist;

	this.letter = letter;


	// Bind scroll listening
	// this.document.on('scroll', $.proxy(this.listenScroll, this));
};


// Méthode onAnimateIn spécifique à Artist
// Cette fonction sera appellée une fois la vue affichée (cf. View)
Artist.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	// View.prototype.onAnimateIn.call(this);

	this.superTpl();
	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;

	// On attend 1s
	setTimeout(function(){

		// On affiche le CTA
		//self.help.addClass('show');

	}, 200);

};

// Méthode onAnimateOut spécifique à Artist
// Cette fonction sera appellée une fois la vue affichée (cf. View)
Artist.prototype.onAnimateOut = function() {
	
	// On appelle d'abord la fonction onAnimateOut de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	// View.prototype.onAnimateOut.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;
	this.tplContent.html("");

};

Artist.prototype.superTpl = function(){

	var self = this;


	if ( app.pages.galaxy.letter != this.letter )
	{
		app.pages.galaxy.letter = this.letter;
		$.when(app.pages.galaxy.getJson(this.letter)).done(function(){

			self.matchArtist(app.pages.galaxy.dataForArtist);

		});

	}
	else
	{
		this.matchArtist(app.pages.galaxy.dataForArtist);
	}
};

Artist.prototype.printTpl = function(data){
	this.tplContent.append(this.tpl(data));

};

Artist.prototype.matchArtist = function(data){

	console.log(data);

	var self = this;
	var parseName = this.artist.replace(/-/g, " ")
	$.each(data, function( index, value ) {
		if ( index == parseName ){
			data = {name:index, details:value};
			self.printTpl(data);
			return false;
		}

	});
};

// Artist.prototype.keyEvent = function(e) {
// 		e.preventDefault();

// 		// Si on est sur la page artist
// 		if ( $('#artist').is(':visible') ){

// 			// Echap
// 			if ( e.which == 27 ){
				
// 				// On exécute la fonction pour cacher la vue
// 				self.hide();
// 				// // On dit à la vue Galaxy de s'afficher
// 				// app.pages.galaxy.show();
// 			}

// 		}
// 	});
// };

// Artist.prototype.listenScroll = function() {

// 	console.log('scrolling');
	
// };

