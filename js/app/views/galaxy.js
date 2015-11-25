// Class Galaxy
var Galaxy = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'galaxy';
	this.letter = "A";
	this.tpl = app_templates.galaxy;

	// Handlebars.registerPartial("Galaxy", app_templates.galaxy);
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

	this.tplContent = 	this.domElem.find('[tpl-content]');

	console.log('galaxy');

};

// Ici on dit que Galaxy hérite de la classe parente View
// Galaxy va hériter de toutes les méthodes de View
Galaxy.prototype = Object.create(View.prototype);

// Méthode bind spécifique à Galaxy
Galaxy.prototype.bind = function() {

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	console.log(this.letter);

	var url = History.getState().hash;
	var letter = url.substring(1);
	if ( letter != "" )
		this.letter = letter;

	// console.log('galaxy');
	app.currentGalaxy = app.pages.galaxy;
	app.pages.artist.artist = null;

	$(app.header).find('a').removeClass('active');
	$(app.header).find('#'+this.letter).addClass('active');

	// this.artistButton.on('click', $.proxy(this.onCtaClick, this));
};

// Méthode onAnimateIn spécifique à Galaxy
// Cette fonction sera appellée une fois la vue affichée (cf. View)
Galaxy.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	// View.prototype.onAnimateIn.call(this);

	this.getJson(this.letter);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;

	// On attend 1s
	setTimeout(function(){

		// On affiche le CTA
		//self.help.addClass('show');

	}, 200);

};

// Méthode onAnimateOut spécifique à Galaxy
// Cette fonction sera appellée une fois la vue affichée (cf. View)
Galaxy.prototype.onAnimateOut = function() {
	
	// On appelle d'abord la fonction onAnimateOut de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	// View.prototype.onAnimateOut.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;

	this.tplContent.html("");

};

// Au click sur le CTA
Galaxy.prototype.onCtaClick = function(e) {
	
	// On intercepte le click
	e.preventDefault();

	// On cache la vue
	this.hide();

	// On affiche le trailer
	// A remplacer par app.pages.trailer.show() une fois la classe Trailer créé
	History.pushState(null, null, '/'+app.pages.galaxy.letter+'/olly-moss');

};

Galaxy.prototype.getJson = function(param){
	var self = this;
	letter = param.toLowerCase();
	return $.getJSON( "/assets/json/"+letter+".json", function(response) {
		self.data = response;
 		self.initArtists(response);
	});
};

Galaxy.prototype.initArtists = function(param){
	var self = this;
	$.each(param, function( index, value ) {
		parseName = index.replace(/ /g, "-");
		data = {name:index, parseName:parseName, letter:self.letter, details:value};
  		self.tplContent.append(self.tpl(data));
  		self.bindLinkArtist();
	});
};

Galaxy.prototype.bindLinkArtist = function(){
	this.artist = this.domElem.find('[linkArtist]');

	this.artist.on('click', $.proxy(this.clickArtist, this));
}

Galaxy.prototype.clickArtist = function(e){
	e.preventDefault();
	var url = $(e.target).attr('href');
	History.pushState(null, null, url);
}