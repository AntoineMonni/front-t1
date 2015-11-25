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

	console.log(data);

	var positionCounter = 1;
    Handlebars.registerHelper('position', function() {
        return positionCounter++;
    });

	this.tplContent.append(this.tpl(data));

	$('.legend-container').on('click', $.proxy(this.onClickPicture, this));

};

Artist.prototype.matchArtist = function(data){

	console.log(data);

	var self = this;
	var parseName = this.artist.replace(/-/g, " ");
	$.each(data, function( index, value ) {
		if ( index == parseName ){
			data = {name:index, details:value};
			self.printTpl(data);
			return false;
		}

	});
};

// Au click sur une image, récupère le lien et déclenche l'ouverture de la lightbox
Artist.prototype.onClickPicture = function(e) {
		e.preventDefault();

		this.link = $(e.target),
		this.url = this.link.attr('href'),
		this.lightbox = $('#lightbox');

		// La div legende
		this.legend = this.link.parent().find('.legend');

		// Le nom de l'oeuvre et la date
		this.workName = this.legend.find('strong').html();
		this.workDate = this.legend.find('p').html();

		this.openLightbox(this.url);
};

// Affiche la lightbox avec la bonne url
Artist.prototype.openLightbox = function(url) {

	// Création de la lightbox avec les informations de l'image cliquée
	this.lightbox.find('.lightbox-container').append('<img src="/assets/images/'+this.url+'" alt="'+this.workName+'"><div class="legend-container"><span class="legend"><strong>'+this.workName+'</strong>&nbsp;-&nbsp;'+this.workDate+'</span></div>');
	console.log(this.url);

	// On l'affiche et on appelle la fonction pour écouter les évènement qui vont permettre de la fermer
	this.lightbox.fadeIn();

	// Au clic dans la lightbox on la ferme + Au clic sur le bouton close
	this.lightbox.on('click', $.proxy(this.closeLightbox, this));
	this.lightbox.find('.close').on('click', $.proxy(this.closeLightbox, this));
	// Ici on ferme grace au bouton échap
	this.document.on('keyup', $.proxy(this.closeLightbox, this));
};

Artist.prototype.closeLightbox = function(e) {
	e.preventDefault();

	// 27 pour échap et 1 pour le click
	if(e.which == 27 || e.which == 1) {
		this.lightbox.fadeOut();
		this.lightbox.find('.lightbox-container').html('');
	}

};

Artist.prototype.keyEvent = function(e) {
	e.preventDefault();

	var self = this;

	// Si on est sur la page artist et qu'il n'y a pas de lightbox ouverte
	if ( $('#artist').css('display') == 'block' && $('#lightbox').css('display') == 'none'){

		// Echap
		if ( e.which == 27 ){

			console.log()
			
			// On exécute la fonction pour cacher la vue
			self.hide();
			// // On dit à la vue Galaxy de s'afficher
			History.pushState(null, null, '/'+app.currentGalaxy.letter);
		}

	};
};


