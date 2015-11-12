Handlebars.registerHelper("log", function(something) {
  console.log(something);
});

var Home = function(){

	this.id = 'home';

	View.apply(this, arguments);

	this.images = {
		'home-background': 'img/home-bg.jpg'
	};

	this.loadExternalJson('a');

};

Home.prototype = Object.create(View.prototype);

Home.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

};

Home.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Home.prototype.loadExternalJson = function (letter) {

        var json = $.ajax({
            dataType: "json",
            url: "../assets/json/"+letter+".json"
        });

        // load your external HTML template
        var homePartial = $.ajax({
            url:"templates/home.hbs"
        });

        homePartial.done(function (html){
			var template = Handlebars.compile(html);        	

			json.done(function (data) {
				$("#external").append(template(data));
			});

        });
};