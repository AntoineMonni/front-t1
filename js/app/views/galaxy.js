// Class Galaxy
var Galaxy = function(){
	
	this.init()

};

// Ici on dit que Galaxy hérite de la classe parente View
// Galaxy va hériter de toutes les méthodes de View
Galaxy.prototype = Object.create(View.prototype);

Galaxy.prototype.init = function() {

	this.id = 'galaxy';
	this.letter = "A";
	this.tpl = app_templates.galaxy;

	this.createWidthAndHeight()

	this.centerPosition = {
		'x': this.width/2,
		'y': this.height/2
	}

	this.sortStatistic = "worksCount";

	this.scale = {};
	this.filters = ["videogames", "film", "series"];

	View.apply(this, arguments);

	this.tplContent = this.domElem.find('[tpl-content]');

}

Galaxy.prototype.createWidthAndHeight = function() {

	var iw = window.innerHeight;
	var ih = window.innerWidth;

	var disponibleW = iw - (0.07 * iw) - 130;
	var disponibleH = ih - 55 - 64;

	var widthAndHeight = disponibleW > disponibleH ? disponibleH : disponibleW;

	this.width = widthAndHeight;
	this.height = widthAndHeight;

}

// Méthode bind spécifique à Galaxy
Galaxy.prototype.bind = function() {

	// On appelle d'abord la fonction bind de la classe parente View
	// Equivalent de la fonction super() dans d'autres languages
	View.prototype.bind.call(this);

	var url = History.getState().hash;
	var letter = url.substring(1);
	if ( letter != "" ) 
		this.letter = letter;

	app.pages.navigation.letter = this.letter;
	app.currentGalaxy = app.pages.galaxy;
	app.pages.artist.artist = null;

	$(app.header).find('a').removeClass('active');
	$(app.header).find('#'+this.letter).addClass('active');

	var self = this;

};

// Appelle le bon json au chargement de la vue
Galaxy.prototype.onAnimateIn = function() {
	
	this.getJson(this.letter);

	var self = this;

};


Galaxy.prototype.onAnimateOut = function() {
	
	var self = this;
	this.tplContent.html("");

};

// Récupère le Json et l'envoi au D3
Galaxy.prototype.getJson = function(param){

	var self = this;
	
	letter = param.toLowerCase();
	
	return $.getJSON( "/assets/json/"+letter+".json", function(response) {
	
		self.data = self.formatData(response);
		self.filterData = self.data;
		self.dataForArtist = response;
	
	}).then(function() {
	
		self.setScale(self.data);

		self.svg = d3.select('.artist-section')
			.append('svg')
			.attr('width', self.width)
			.attr('height', self.height);

		self.drawGalaxy(self.data);

		self.domElem.find('.tags').unbind().bind().on('click', 'a', function (e) {
		
			e.preventDefault();

			if (self.contains(self.filters, $(this).attr('href'))) {
				
				self.removeFilter($(this).attr('href'), $(this));

			} else {

				self.addFilter($(this).attr('href'), $(this));
			
			}
				
		})

		self.domElem.find('.filters').unbind().bind().on('click', 'a', function(e)  {

			e.preventDefault();

			$(this).parent().parent().find(".filter").find("a").each(function() {
				$(this).toggleClass("active")
			})

			self.swapSortStatistic($(this).attr('href'))

		})
	
	});
};

Galaxy.prototype.contains = function(table, element) {
	for (var i = 0; i < table.length; i++) {
		if (table[i] == element){
			return true;
		}
	}
	return false;
}

// Ajoute les filtres (séries, jeux vidéos, films) et trie les points
Galaxy.prototype.addFilter = function(filter, e) {

	this.filters.push(filter)

	e.removeClass("active").addClass("underline");

	var filterData = []

	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.filters.length; j++) {
			if (this.data[i].theme == this.filters[j]) {
				filterData.push(this.data[i])
			}
		}
	}

	this.filterData = filterData;

	this.setScale(this.filterData);
	$('svg').empty();
	this.drawGalaxy(this.filterData)

}

// Enlève le filtre au clic et revient à la disposition de base de la galaxie
Galaxy.prototype.removeFilter = function(filter, e) {

	var newFilters = [];
	for (var i = 0; i < this.filters.length; i++) {
		if (this.filters[i] != filter) {
			newFilters.push(this.filters[i]);
		}
	}

	this.filters = newFilters;

	e.addClass("active");



	var filterData = []

	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.filters.length; j++) {
			if (this.data[i].theme == this.filters[j]) {
				filterData.push(this.data[i])
			}
		}
	}

	this.filterData = filterData;

	this.setScale(this.filterData);
	$('svg').empty();
	this.drawGalaxy(this.filterData)

}

Galaxy.prototype.updateData = function(data) {

	this.data = data;
	this.filterData = data;
	this.setScale(this.data);
	$('svg').empty();
	this.drawGalaxy(this.data)

};


Galaxy.prototype.swapSortStatistic = function(sortStatistic) {

	this.sortStatistic = sortStatistic;
	this.setScale(this.filterData);
	$('svg').empty();
	this.drawGalaxy(this.filterData);

};

Galaxy.prototype.formatData = function(data) {

	var formattedData = []

	for (var key in data) {

		if (data.hasOwnProperty(key)){
			formattedData.push({})
			formattedData[formattedData.length - 1].name = key

			for (var i = 0; i < data[key].works.length; i++) {
				if (i > 0) {
					if (data[key].works[i].year > lastWork) {
						lastWork = data[key].works[i].year;
					}
				} else {
					var lastWork = data[key].works[i].year;
				}
			}

			formattedData[formattedData.length - 1].url = "/" + this.letter + "/" + key.replace(/ /g, "-");
			formattedData[formattedData.length - 1].lastWork = lastWork;
			formattedData[formattedData.length - 1].allWorksCount = data[key].worksCount;
			formattedData[formattedData.length - 1].worksCount = data[key].works.length;
			formattedData[formattedData.length - 1].theme = data[key].theme;
		}
	}
	
	for (var i = 0; i < formattedData.length; i++) {

		if (i == 0) {

			var yearMap = [];
			yearMap[formattedData[i].lastWork] = 1;

		} else {

			if (yearMap[formattedData[i].lastWork]) {

				yearMap[formattedData[i].lastWork]++

			} else {

				yearMap[formattedData[i].lastWork] = 1

			}
		}
	}

	for (var i = 0; i < formattedData.length; i++) {

		if (i == 0) {

			var angle = []
			var count = []

			angle[formattedData[i].lastWork] = 360 / yearMap[formattedData[i].lastWork];
			formattedData[i].position = Math.random() * 40 - 20;
			count[formattedData[i].lastWork] = 1;

		} else {

			if (!angle[formattedData[i].lastWork]) {

				angle[formattedData[i].lastWork] = 360 / yearMap[formattedData[i].lastWork];
				formattedData[i].position = Math.random() * 40 - 20;
				count[formattedData[i].lastWork] = 1;

			} else {

				formattedData[i].position = (Math.random() * 40 - 20) + count[formattedData[i].lastWork] * angle[formattedData[i].lastWork]
				count[formattedData[i].lastWork]++

			}

		}
	}

	return formattedData
}

Galaxy.prototype.setScale = function(data) {

	var self = this;

	this.scale.planetRadius = d3.scale.linear()
		.domain([0, this.getMax(data, this.sortStatistic)])
		.range([(this.width/2)/25, (this.width/2)/15]);

};

Galaxy.prototype.drawGalaxy = function(data) {

	var self = this;

	this.drawOrbits();

	this.svg
		.append("circle")
		.attr("fill", "black")
		.attr("stroke", "black")
		.attr("r", 15)
		.attr("cx", this.centerPosition.x)
		.attr("cy", this.centerPosition.y)

	this.svg
		.append('text')
		.html(this.letter)
		.attr("class", "sun")
		.attr("fill", "white")
		.attr("x", this.centerPosition.x - 6)		
		.attr("y", this.centerPosition.y + 6)		

	this.svg
		.selectAll(".planet")
		.data(data)
			.enter().append("circle")
		.attr("class", "planet")
		.attr("r", function(d) {return self.scale.planetRadius(d[self.sortStatistic])})
		.attr("cx", function(d) {return self.centerPosition.x})
		.attr("cy", function(d) {return self.centerPosition.y - (d.lastWork - 2007) * (self.width/2)/6})
		.attr("fill", function(d) {
			if (d.theme == "videogames") {
				return "#C3575A";
			} else if (d.theme == "film"){
				return "#6888C0";
			} else if (d.theme == "series"){
				return "#FFB767";
			}
		})
		.attr("stroke", "#FAFAFA")
		.attr("stroke-width", 3)
		.attr("transform", function(d) {return "rotate(" +d.position+ " " +self.centerPosition.x+ " " +self.centerPosition.y+ ")"})
		.on("click", function(e) {
			History.pushState(null, null, e.url);
		})
		.on('mouseover',function(e) {
			app.followAge.find('h4').html(e.name);
			app.followAge.find('p span').html(e.worksCount);
			app.followAge.addClass('active');
		})
		.on('mouseleave',function(e) {
			app.followAge.removeClass('active');
		})

};

Galaxy.prototype.drawOrbits = function() {

	var self = this;
	for (var i = 5; i >= 0; i--) {
		this.svg
			.append('circle')
			.attr("fill", "#FAFAFA")
			.attr("stroke", "black")
			.attr("stroke-width", 1)			
			.attr("r", i * (self.width/2)/6)
			.attr("cx", self.centerPosition.x)
			.attr("cy", self.centerPosition.y)
	}
	for (var i = 4; i >= 0; i--) {
	
		this.svg
			.append('text')
			.html(i + 2009)
			.attr("y", self.centerPosition.y + 3)
			.attr("x", (self.width/2)/11 + self.centerPosition.x + i * (self.width/2)/6)
			.attr("fill", "black")
			.attr("class", "scale")
	}
	
}

Galaxy.prototype.getMax = function(obj, accessor) {

	for (var i = 0; i < obj.length; i++) {
		if (i > 0) {
			if (obj[i][accessor] > currentMax) {
				currentMax = obj[i][accessor];
			}
		} else {
			var currentMax = obj[i][accessor];
		}
	};
	return currentMax;

};

Galaxy.prototype.getMin = function(obj, accessor) {

	for (var i = 0; i < obj.length; i++) {
		if (i > 0) {
			if (obj[i][accessor] < currentMin) {
				currentMin = obj[i][accessor]
			}
		} else {
			var currentMin = obj[i][accessor];
		}
	};
	return currentMin;

};
