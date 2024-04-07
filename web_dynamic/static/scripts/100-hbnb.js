const $ = window.$;
$(document).ready(function () {
  const selectedAmenities = {};
  const selectedStates = {};
  const selectedCities = {};
  

  $('div.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    $('div.amenities > h4').text(Object.values(selectedAmenities).join(', '));
  });
  
  $('ul.states input[type="checkbox"]').change(function () {
    const stateId = $(this).data('id');
    const stateName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedStates[stateId] = stateName;
    } else {
      delete selectedStates[stateId];
    }
    $('div.locations > h4').text(Object.values(selectedStates).join(', '));
  });
  
  $('ul.cities input[type="checkbox"]').change(function () {
    const cityId = $(this).data('id');
    const cityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedCities[cityId] = cityName;
    } else {
      delete selectedCities[cityId];
    }
    $('div.locations > h4').text(Object.values(selectedCities).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    dataType: 'json',
    success: function (response) {
      response.forEach(function (place) {
        $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`);
      });
    }
  });
  $('button').on('click', function () {
    const amenities = Object.keys(selectedAmenities);
    const states = Object.keys(selectedStates);
    const cities = Object.keys(selectedCities);
    const reqData = { amenities: amenities, states: states, cities: cities };
    reqData.amenities = amenities;
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(reqData),
      contentType: 'application/json',
      success: function (response) {
        $('section.places').empty();
        response.forEach(function (place) {
          $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`);
        });
      }
    });
  });
});
