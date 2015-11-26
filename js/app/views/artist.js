// Class Artist
var Artist = function(){
	
	// On définit ici l'id de la vue
	// Ce qui va permettre de définir le sélecteur du domElem (cf. classe View)
	this.id = 'artist';
	this.artist = null;
	this.actualImg = null;
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

	app.pages.navigation.letter = letter;
	app.currentPage = app.pages.artist;
	app.currentArtist = app.pages.artist;

	this.letter = letter;

	$(app.header).find('a').removeClass('active');
	$(app.header).find('#'+this.letter).addClass('active');

	// Bind Escape
	this.document.on('keyup', $.proxy(this.keyEvent, this));
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

	var positionCounter = 1,
		self = this;
    Handlebars.registerHelper('position', function() {
        return positionCounter++;
    });

	this.tplContent.append(this.tpl(data));
	this.artistWork = $('.artist-work').find('a');
	this.linkWork = $('.artist-meta').find('a');
	this.linkWork.on('click', $.proxy(this.goToWebsites, this));
	this.setArtistTable();
	$('.legend-container').on('click',function(e){
		e.preventDefault();
		self.onClickPicture(this);
	});

};

Artist.prototype.goToWebsites = function(e){
	e.preventDefault();
	var url = $(e.target).attr('href');
	// crossroads.ignoreState
	window.location.replace(url);
};

Artist.prototype.matchArtist = function(data){


	var self = this;
	var parseName = this.artist.replace(/-/g, " ").replace(/_/g, "'");
	$.each(data, function( index, value ) {
		if ( index == parseName ){
			data = {name:index, details:value};
			self.printTpl(data);
			return false;
		}

	});
};

Artist.prototype.setArtistTable = function(){
	var self = this;
	this.artistTable = [];
	$.each(this.artistWork, function( index, value ) {
		self.artistTable[$(value).attr('index')] = self.getPictureData(value);
	});
};

// Au click sur une image, récupère le lien et déclenche l'ouverture de la lightbox
Artist.prototype.onClickPicture = function(target) {

		this.actualImg = this.getPictureData(target);
		this.lightbox = $('#lightbox');
		this.openLightbox(this.url);
};

Artist.prototype.getPictureData = function(target){
	var legend,
		resultat = {};

	legend = $(target).parent().find('.legend');

	resultat.url = $(target).attr('href');
	resultat.id = $(target).attr('index');
	resultat.name = $(legend).find('strong').html();
	resultat.date = $(legend).find('p').html();
	return resultat;
};

// Affiche la lightbox avec la bonne url
Artist.prototype.openLightbox = function(url) {

	// Création de la lightbox avec les informations de l'image cliquée
	this.lightbox.find('.lightbox-container').append('<img src="/assets/images/'+this.actualImg.url+'" alt="'+this.actualImg.name+'"><div class="legend-container"><span class="legend"><strong>'+this.actualImg.name+'</strong>&nbsp;-&nbsp;'+this.actualImg.date+'</span></div>');

	app.currentPage = "lightBox";

	// On l'affiche et on appelle la fonction pour écouter les évènement qui vont permettre de la fermer
	this.lightbox.fadeIn();

	// Au clic dans la lightbox on la ferme + Au clic sur le bouton close
	this.lightbox.on('click', $.proxy(this.closeLightbox, this));
	this.lightbox.find('.close').on('click', $.proxy(this.closeLightbox, this));
	// Ici on ferme grace au bouton échap
	this.document.on('keyup', $.proxy(this.navigationLightbox, this));
};

Artist.prototype.changePicture = function(){
	this.lightbox.find('img').attr('src','/assets/images/'+this.actualImg.url);
	this.lightbox.find('img').attr('alt',this.actualImg.name);
	this.lightbox.find('.legend-container').find('.legend').html('<strong>'+this.actualImg.name+'</strong>&nbsp;-&nbsp;'+this.actualImg.date);
};

Artist.prototype.closeLightbox = function() {
	app.currentPage = app.pages.artist;
	this.lightbox.fadeOut();
	this.lightbox.find('.lightbox-container').html('');
};

Artist.prototype.nextLightbox = function() {
	var id;

	var id = Number(this.actualImg.id);
	if ( id < this.artistTable.length - 1 )
	{
		this.actualImg = this.artistTable[id + 1];
		this.changePicture();
	}
};

Artist.prototype.previousLightbox = function() {
	var id;

	var id = Number(this.actualImg.id);
	if ( id > 0 )
	{
		this.actualImg = this.artistTable[id - 1];
		this.changePicture();
	}
};

Artist.prototype.navigationLightbox = function(e) {
	e.preventDefault();
	key = e.which;
// On lance la bonne fonction selon la touche
	switch(true) {
		// Si l'utilisateur a cliqué sur une touche [A-Z]
		case (key == 27 ): 
			this.closeLightbox(e);
			break;
		// Flèche vers la gauche
		case (key == 37):
			this.previousLightbox();
			break;
		// Flèche vers la droite
		case (key == 39):
			this.nextLightbox();
			break;
		// Click
		case (key == 1):
			this.closeLightbox(e);
			break;
	}		
};

Artist.prototype.keyEvent = function(e) {
	e.preventDefault();

	var self = this;

	// Si on est sur la page artist et qu'il n'y a pas de lightbox ouverte
	if ( $('#artist').css('display') == 'block' && $('#lightbox').css('display') == 'none'){

		// Echap
		if ( e.which == 27 ){
			
			// On exécute la fonction pour cacher la vue
			self.hide();
			// // On dit à la vue Galaxy de s'afficher
			History.pushState(null, null, '/'+app.currentGalaxy.letter);
		}

	};
};


