$(document).ready(function () {
  const amenityNames = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityNames[amenityId] = amenityName;
    } else {
      delete amenityNames[amenityId];
    }
    $('div.amenities > h4').text(Object.values(amenityNames).join(', '));
  });
});
