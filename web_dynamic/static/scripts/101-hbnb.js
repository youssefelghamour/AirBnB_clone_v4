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

  $('.locations ul li input[type="checkbox"]').change(function () {
    const stateId = $(this).data('id');
    const stateName = $(this).data('name');
    // when a state is checked all its cities are checked too
    // meaning that all the places within all the cities in that state are displayed

    if ($(this).is(':checked')) {
      selectedStates[stateId] = stateName;
    } else {
      delete selectedStates[stateId];
    }
    $('div.locations > h4').text(Object.values(selectedStates).join(', '));
  });

  $('.locations ul li input[type="checkbox"]').change(function () {
    const cityId = $(this).data('id');
    const cityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedCities[cityId] = cityName;
    } else {
      delete selectedCities[cityId];
    }
    $('div.locations > h4').text(Object.values(selectedCities).join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
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
			<div class="reviews">
				<h2>Reviews<span class="toggleReviews" data-place-id=${place.id}>show</span></h2>
				<ul class="reviewList"></ul>
			</div>
                    </article>`);
      });
    }
  });
  $('button').on('click', function () {
    const amenities = Object.keys(selectedAmenities);
    const states = Object.keys(selectedStates);
    const cities = Object.keys(selectedCities);
    const reqData = { amenities, states, cities };
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
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
			<div class="reviews">
				<h2>Reviews<span class="toggleReviews" data-place-id=${place.id}>show</span></h2>
				<ul class="reviewList"></ul>
			</div>
                    </article>`);
        });
      }
    });
  });
  $(document).on('click', '.toggleReviews', function () {
    const placeId = $(this).data('place-id');
    const article = $(this).closest('article');
    const reviewList = article.find('.reviewList');
    if ($(this).text() === 'show') {
      $(this).text('hide');
      $.get(`http://localhost:5001/api/v1/places/${placeId}/reviews`, function(response) {
        reviewList.empty();
        const num = `${response.length} Review${response.length !== 1 ? 's' : ''}`;
        const $toggleReviews = article.find('.reviews h2 .toggleReviews');
        article.find('.reviews h2').html(`${num} `);
        article.find('.reviews h2').append($toggleReviews);
        response.forEach((review) => {
          $.get(`http://localhost:5001/api/v1/users/${review.user_id}`, function(data) {
            const date = new Date(review.created_at);
            const month = date.toLocaleString('en', { month: 'long' });
            const day = date.getDate();
            reviewList.append(`
	  	<li>
			<li><h3>From ${data.first_name} ${data.last_name} ${day + ' ' + month + ' ' + date.getFullYear()}</h3>
			<p>${review.text}</p>
		</li>`);
	  });
	});
      });
    } else {
      reviewList.empty();
      $(this).text('show');
    }
  })
});
