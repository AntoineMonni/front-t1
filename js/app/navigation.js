var Navigation = function(target) {

	this.init(target);
};

Navigation.prototype.init = function(target) {
	app = target;
	this.status = 0;
	this.timeMax = 200;
	this.letter = app.pages.galaxy.letter;
	this.beforeLetter = null;
	this.artist = null;
	this.menuLetters = app.keyboardNav.find('.single-letter').find('ul');
	this.allLetters = this.menuLetters.find('li');
	this.menuArtist = app.keyboardNav.find('.single-artist').find('ul');
	this.setTableLetters();
};

Navigation.prototype.bind = function(key) {

	// On sauvegarde la touche pressée et sa valeur
	this.key = key;


	// On lance la bonne fonction selon la touche
	switch(true) {
		// Si l'utilisateur a cliqué sur une touche [A-Z]
		case (key > 64 && key < 91): 
			this.displaySingleLetter(key);
			break;
		// Flèche vers la gauche
		case (key == 37):
			this.previousLetter();
			break;
		// Flèche vers le Haut
		case (key == 38):
			// if ( app.currentPage.id == 'artist' )
			// {
				this.previousArtist();
			// }
			break;
		// Flèche vers la droite
		case (key == 39):
			this.nextLetter()
			break;
		// Flèche vers le Haut
		case (key == 40):
			// if ( app.currentPage.id == 'artist' )
			// {
				this.nextArtist();
			// }
			break;
	}
};


// fonction qui gère l'appartion menu des lettres et le timer
Navigation.prototype.letterNav = function() {
	if ( this.status != 1 ){
		clearInterval(this.interval);
		this.timer();
		app.keyboardNav.fadeIn();
		this.menuArtist.css('display','none');
		this.menuLetters.css('display','block');
	}
	this.status = 1;


};

// fonction qui gère l'appartition menu des Artistes et le timer
Navigation.prototype.ArtistNav = function() {

	if ( this.status != 1 ){
		clearInterval(this.interval);
		this.timer();
		this.setArtistTable();
		if ( app.pages.artist.artist == null )
		{
			this.artist = this.tableArtistsByNum[0];
		}
		else
		{
			this.artist = app.pages.artist.artist;
		}
		this.letter = app.pages.galaxy.letter;
		app.keyboardNav.fadeIn();
		this.menuLetters.css('display','none');
		this.menuArtist.css('display','block');
	}
	this.status = 1;


};

// actualise le compteur et actualise les donnés pour les lettres
Navigation.prototype.displaySingleLetter = function(key) {

	this.letterNav();

	this.timeShow = this.timeMax;

	this.letter = String.fromCharCode(key);
	
	this.allLetters.removeClass('active');
	this.menuLetters.find('#'+this.letter).addClass('active');

	var IDLetter = this.tableLettersByLetter[this.letter];

	this.moveMenuLetter(IDLetter);

	this.param = this.letter;
};

// actualise le compteur et envoie la lettre suivante
Navigation.prototype.nextLetter = function() {

	this.letterNav();

	this.timeShow = this.timeMax;

	var IDLetter = this.tableLettersByLetter[this.letter];
	if ( IDLetter < $(this.allLetters).length - 1 )
	{
		IDLetter ++ ;
	}

	this.letter = this.tableLettersByNum[IDLetter];

	this.allLetters.removeClass('active');
	this.menuLetters.find('#'+this.letter).addClass('active');

	this.moveMenuLetter(IDLetter);

	this.param = this.letter;
	
};

// actualise le compteur et envoie la lettre précédente
Navigation.prototype.previousLetter = function() {

	this.letterNav();

	this.timeShow = this.timeMax;

	var IDLetter = this.tableLettersByLetter[this.letter];
	if ( IDLetter > 0 )
	{
		IDLetter -- ;
	}

	this.letter = this.tableLettersByNum[IDLetter];

	this.allLetters.removeClass('active');
	this.menuLetters.find('#'+this.letter).addClass('active');

	this.moveMenuLetter(IDLetter);

	this.param = this.letter;
};

// actualise le compteur et envoie l'artiste précédent
Navigation.prototype.nextArtist = function() {
	var IDArtist,
		newArtist;
	this.ArtistNav();

	this.timeShow = this.timeMax;

	IDArtist = this.tableArtistsByParseName[this.artist];

	if ( IDArtist < this.tableArtistsByNum.length - 1 )
	{
		IDArtist ++ ;
		newArtist = this.tableArtistsByNum[IDArtist];
		this.artist = newArtist;
	}

	this.menuArtist.find('li').removeClass('active');
	this.menuArtist.find('#'+this.artist).addClass('active');

	this.moveMenuArtist(IDArtist);

	this.param = this.letter+'/'+this.artist;
};

// actualise le compteur et envoie l'artiste précédent
Navigation.prototype.previousArtist = function() {
	var IDArtist,
		newArtist;
	this.ArtistNav();

	this.timeShow = this.timeMax;

	IDArtist = this.tableArtistsByParseName[this.artist];
	if ( IDArtist > 0 )
	{
		IDArtist -- ;
		newArtist = this.tableArtistsByNum[IDArtist];
		this.artist = newArtist;
	}

	this.menuArtist.find('li').removeClass('active');
	this.menuArtist.find('#'+this.artist).addClass('active');

	this.moveMenuArtist(IDArtist);

	this.param = this.letter+'/'+this.artist;
};

// Declenche la fermeture et donc le fadeOut
Navigation.prototype.closing = function(){
	var self = this;
	History.pushState(null, null, '/'+this.param);
	app.keyboardNav.fadeOut(function(){
		self.onAnimateOut();
	});
};

// Action finale
Navigation.prototype.onAnimateOut = function(){

	this.status = 0;
};

// Initialise les tableaux qui permettent de définir la position d'une lettre dans l'aphabet
Navigation.prototype.setTableLetters = function(){
	var self = this;
	this.tableLettersByNum = [];
	this.tableLettersByLetter = [];
	$.each(this.allLetters, function( index, value ) {
		self.tableLettersByNum[index] = $(value).html();
		self.tableLettersByLetter[$(value).html()] = index;
	});
};


Navigation.prototype.setArtistTable = function(){
	var self = this;
		this.tableArtistsByName = [];
		this.tableArtistsByParseName = [];
		this.tableArtistsByNum = [];
		this.tableArtistsByNumNoParse = [];
		var i = 0;
		$.each(app.currentGalaxy.dataForArtist, function( index, value ) {
			self.tableArtistsByNum[i] = index.replace(/ /g, "-");
			self.tableArtistsByNumNoParse[i] = index;
			self.tableArtistsByName[index] = i;
			self.tableArtistsByParseName[index.replace(/ /g, "-")] = i;
			i ++;
		});
		this.loadArtistName();
};

Navigation.prototype.loadArtistName = function(){
	var self = this,
		i = 0;
		this.menuArtist.html(' ');
		$.each(this.tableArtistsByNumNoParse, function( index, value ) {
			self.menuArtist.append('<li id="'+self.tableArtistsByNum[i]+'">'+value+'</li>');
			i ++;
		});
		this.allArtists = this.menuArtist.find('li');
};

// Bouge le menu pour centrer la lettre souhaité
Navigation.prototype.moveMenuLetter = function(num){
	var index = 0,
		letterWidth = $(this.allLetters[0]).width();
		windowWidth = $(window).width(),
		sizeMenu = $(this.allLetters).length * letterWidth;

	this.menuLetters.css('width',sizeMenu);
	index = (windowWidth/2) - ( letterWidth/2 );
	index -= num * letterWidth;

	this.menuLetters.css('-webkit-transform','translateX('+index+'px)');
	this.menuLetters.css('-moz-transform','translateX('+index+'px)');
	this.menuLetters.css('-ms-transform','translateX('+index+'px)');
	this.menuLetters.css('-o-transform','translateX('+index+'px)');
	this.menuLetters.css('transform','translateX('+index+'px)');
};

// Bouge le menu pour centrer l'artist souhaité
Navigation.prototype.moveMenuArtist = function(num){
	var index = 0,
		artistHeight = $(this.allArtists[0]).height();
		windowHeight = $(window).height();

	// index = ( windowHeight/2 ) - ( artistHeight/2 );
	index = 0;
	index -= num * artistHeight;

	this.menuArtist.css('-webkit-transform','translateY('+index+'px)');
	this.menuArtist.css('-moz-transform','translateY('+index+'px)');
	this.menuArtist.css('-ms-transform','translateY('+index+'px)');
	this.menuArtist.css('-o-transform','translateY('+index+'px)');
	this.menuArtist.css('transform','translateY('+index+'px)');
};

// timer pour afficher le menu
Navigation.prototype.timer = function(){
	var self = this;
    this.interval = setInterval(function()
    {
        self.timeShow--;
        if ( self.timeShow == 0 )
        {
                self.closing();
        }
    }, 1);
};