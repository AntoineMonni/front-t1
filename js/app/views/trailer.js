$(window).on('keydown', function(e){
	
	console.log(e.keyCode);

	// Si on est sur la page Trailer
	if ( $('#trailer').is(':visible') ){

		// Echap
		if ( e.keyCode == 27 ){
			
			closeTrailer();				
		
		}

		// Space
		if ( e.keyCode == 32 ){

			// Si la vidéo est arrêtée
			if ( $('#trailer video')[0].paused ){

				// On la joue
				$('#trailer video')[0].play();
				
			} 
			// Sinon
			else {
				
				// On la pause
				$('#trailer video')[0].pause();
			
			}

		}

	}

});

var closeTrailer = function(){

	// On pause la vidéo
	$('#trailer video')[0].pause();

	// Une fois que le trailer est caché
	$('#trailer').fadeOut(function(){
		
		// On remet la vidéo à 0
		$('#trailer video')[0].currentTime = 0;
		
		// On remet le volume à 1
		$('#trailer video')[0].volume = 1;

		// On enlève la classe mute au bouton volume
		$('#trailer .sound').removeClass('mute');

	});

	$('#the-movie').fadeIn();

};

// Au clic sur la croix pour fermer le trailer
$('#trailer .close').on('click', function(e){
	
	e.preventDefault();

	closeTrailer();

});

$('#trailer .sound').on('click', function(e){

	e.preventDefault();

	// La vidéo est déjà mute
	if ( $('#trailer .sound').hasClass('mute') ){

		$('#trailer .sound').removeClass('mute');

		$('#trailer video')[0].volume = 1;

	}
	// La vidéo n'est pas mute
	else {

		$('#trailer .sound').addClass('mute');

		$('#trailer video')[0].volume = 0;

	}

});

var trailerVideo = $('#trailer video');
var trailerVideoElem = trailerVideo[0];

trailerVideo.on('timeupdate', function(e){

	var currentTime = $('#trailer video')[0].currentTime;
	var duration = $('#trailer video')[0].duration;

	var percent = currentTime / duration * 100;

	console.log('timeupdate', currentTime, duration, percent);

	$('#trailer .progress').css('width', percent + '%');

});

trailerVideo.on('ended', function(e){

	closeTrailer();

});