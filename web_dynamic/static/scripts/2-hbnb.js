$(document).ready(() => {
	let amenityIds = []
	let amenityNames = []
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
			console.log(stat.status);
			$('div#api_status').addClass('available');
		} else {
			$('div#api_status').removeClass('available');
		}
	}
	getStatus();
});
