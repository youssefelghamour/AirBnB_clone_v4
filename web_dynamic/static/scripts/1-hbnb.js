$(document).ready(function () {
  const amenityIDs = [];

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityIDs[amenityId] = amenityName;
    } else {
      delete amenityIDs[amenityId];
    }
    $('.popover h4').text(Object.keys(amenityIDs).join(', '));
  });
});
