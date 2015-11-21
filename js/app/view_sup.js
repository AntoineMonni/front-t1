// Class View_sup
var View_sup = function(){
	
	// Appelle le constructeur de View
	// Et ajoute les propriétés de View à Home
	View.apply(this, arguments);

};

// Ici on dit que View_sup hérite de la classe parente View
// View_sup va hériter de toutes les méthodes de View
View_sup.prototype = Object.create(View.prototype);

// Méthode bind spécifique à View_sup
View_sup.prototype.bind = function() {


	if ( app.currentPage == null )
	{
		app.currentPage = app.pages.home;
	}

	this.closeButton.on('click', $.proxy(this.onCloseView, this));
};


// Cacher la vue
View_sup.prototype.onCloseView = function(e) {

	e.preventDefault();
	View.prototype.hide.call(this);

	console.log('view sup');

	if ( app.footer.hasClass('show'))
		app.footer.removeClass('show');
	if ( app.header.hasClass('hide'))
		app.header.removeClass('hide');
	if ( app.menu.hasClass('active'))
		app.menu.removeClass('active');

	$(app.footer).find('a').removeClass('active');

	History.pushState(null, null, app.currentPage.id);

};

View_sup.prototype.handleMenu = function(param) {

	if ( !app.footer.hasClass('show') )
	{
		$('.'+param+'-btn').addClass('active');

		// Show the app.footer / menu
		app.footer.toggleClass('show');
		// Hide app.header if not / reverse
		if(!app.header.hasClass('hide')) {
			app.header.addClass('hide');
		}else {
			app.header.removeClass('hide');
		}	
	}
	if ( !app.menu.hasClass('active') )
	{
		app.menu.addClass('active');
	}
	$(app.footer).find('a').removeClass('active');
	$(app.footer).find('.'+param+'-btn').addClass('active');
};

// Méthode onAnimateIn spécifique à View_sup
// Cette fonction sera appellée une fois la vue affichée (cf. View)
View_sup.prototype.onAnimateIn = function() {
	
	// On appelle d'abord la fonction onAnimateIn de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.onAnimateIn.call(this);

	// On stocke le contexte de la classe pour l'utiliser plus tard
	var self = this;
};
