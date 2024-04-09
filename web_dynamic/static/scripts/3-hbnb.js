$(document).ready(() => {
	let amenityIds = [];
	let amenityNames = [];
	let places = [];
	$('.amenities .popover ul li input').change(function() {
		if ($(this).is(':checked')) {
			amenityIds.push($(this).attr('data-id'));
			amenityNames.push($(this).attr('data-name'));
		} else {
			amenityIds.splice(amenityIds.indexOf($(this).attr('data-id')));
			amenityNames.splice(amenityNames.indexOf($(this).attr('data-name')));
		}
		if (amenityNames.length === 0) {
			$('.amenities h4').html("&nbsp;")
		} else {
			 $('.amenities h4').text(amenityNames.join(', '));
			}

	});
	async function getStatus () {
		const response = await fetch ("http://127.0.0.1:5001/api/v1/status/");
		const stat = await response.json();
		if (stat.status === 'OK') {
			$('div#api_status').addClass('available');
		} else {
			$('div#api_status').removeClass('available');
		}
	}
	async function getPlaces () {
		const url = 'http://127.0.0.1:5001/api/v1/places_search';
		const opt = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		};
		const response = await fetch(url, opt);
		places = await response.json();
	}
	function showPlaces () {
		places.forEach(function (item) {
			art = $('<article></article>');
			titleBox = $('<div class="title_box"><h2>' + item.name + '</h2><div class="price_by_night">' + item.price_by_night + '</div></div>');
			info = $('<div class="information">');
			maxGuest = $('<div class="max_guest">' + item.max_guest + 'Guests</div>');
			rooms = $('<div class="number_rooms">' + item.number_rooms + 'Bedrooms</div>');
			baths = $('<div class="number_bathrooms">' + item.number_bathrooms + 'Bathrooms</div>');
			description = $('<div class="description">' + item.description + '</div>');
			art.append(titleBox);
			info.append(maxGuest, rooms, baths);
			art.append(info);
			art.append(description);
			$('section.places').append(art);
		});
	}
	getStatus();
	getPlaces().then(showPlaces);
});
