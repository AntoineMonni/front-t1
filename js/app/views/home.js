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
	console.log('this');
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

        var self = this;

        homePartial.done(function (html){
			var template = Handlebars.compile(html);  
			json.done(function (data) {
				$("#external").append(template(data));
				self.createGalaxy(data)
			});

        });
};

Home.prototype.createGalaxy = function(data) {

	var galaxy = new Galaxy(data)

};

var Galaxy = function(data) {
	this.init(data)
};
Galaxy.prototype.init = function(data) {
	this.data = data
	this.setScale(followers)
	this.draw()
};
Galaxy.prototype.setScale = function(accessor) {
	this.scale = d3.scale.linear()
		.domain([0, this.getMax(this.data, accessor)])
		.range([0, 100])
};
Galaxy.prototype.draw = function() {
	d3.select('.galaxyContainer')
		.selectAll('.star')
			.data(this.data.artist)
		.enter().append('div')
			.attr('class', 'star')
			.style('width', function(d) {return this.scale(d.followers) + 'px'})
			.style('height', function(d) {return this.scale(d.followers) + 'px'})
			.style('background', '#F00F00');
}
Galaxy.prototype.getMax = function(obj, accessor) {
	for (var i = 0; i < obj.artist.length; i++) {
		if (i > 0) {
			if (obj.artist[i][accessor] > currentMax) {
				currentMax = obj.artist[i][accessor]
			}
		} else {
			var currentMax = obj.artist[i][accessor];
		}
	}
	console.log(currentMax);
	return currentMax;	
};
Galaxy.prototype.getMin = function(obj, accessor) {
	for (var i = 0; i < obj.artist.length; i++) {
		if (i > 0) {
			if (obj.artist[i][accessor] < currentMin) {
				currentMin = obj.artist[i][accessor]
			}
		} else {
			var currentMin = obj.artist[i][accessor];
		}
	}
	console.log(currentMin)
	return currentMin;
};