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
});
