/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { removeFalsyFromObject } = require('../resources/functions');
const { handler, token } = require('../resources/handlers');
const { https } = require('../utils/https');

/**
 * @module places
 */

module.exports = {

  /**
   * @summary
   * ### [Search For Places Nearby]{@link https://developers.google.com/maps/documentation/places/web-service/nearby-search}
   * 
   * @example
   * await api.google.places.nearby({
   *   address: '123 sesame street',
   *   radius: 10000,
   *   include: ['night clubs'],
   *   sort: 'distance'
   * });
   * 
   * @function nearby
   * @memberof module:places#
   * @param {Object} options
   * @param {string} options.address
   * @param {number} [options.distance]
   * @param {number} [options.limit]
   * @param {string} [options.sort] - 'POPULARITY' or 'DISTANCE'
   * @param {string[]} [options.include]
   * @param {string[]} [options.exclude]
   * @returns {Promise<GoogleMapsPlace[]|undefined>}
   */
  nearby: async (options) => {
    const location = await https({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${token('google', 'google')}&address=${encodeURIComponent(options.address)}`
    });

    // console.log(location);
    if (!location?.results?.length)
      throw new Error('Address not found');

    // const fields = 'places.displayName.text,places.id,places.nationalPhoneNumber,places.formattedAddress,places.websiteUri,places.googleMapsUri,places.rating,places.types,places.primaryTypeDisplayName.text,places.photos,places.priceLevel,places.currentOpeningHours';
    const attempt = await handler({
      method: 'POST',
      endpoint: 'places:searchNearby?fields=*',
      handler: 'places',
      body: {
        includedTypes: [options.include],
        excludedTypes: [options.exclude],
        maxResultCount: options.limit,
        rankPreference: options.sort ? options.sort.toUpperCase() : 'POPULARITY',
        languageCode: 'en',
        locationRestriction: {
          circle: {
            center: {
              latitude: location.results[0].geometry.location.lat,
              longitude: location.results[0].geometry.location.lng
            },
            radius: options.distance ? options.distance * 1609.34 : 8046.72
          }
        }
      }
    });

    // console.log('attempt', attempt);
    return buildPlace(attempt);
  },

  /**
   * @summary
   * ### [Search For Places With Text]{@link https://developers.google.com/maps/documentation/places/web-service/text-search}
   * 
   * @example
   * await api.google.places.search({
   *   query: 'chinese food in louisiana',
   *   limit: 5,
   * });
   * 
   * @example
   * await api.google.places.search({
   *   query: 'chinese food',
   *   location: 'louisiana',
   *   limit: 5,
   * });
   * 
   * @example
   * await api.google.places.search({
   *   query: 'chinese food',
   *   address: '123 sesame st',
   *   distance: 10, // miles
   *   sort: 'DISTANCE',
   *   limit: 5,
   * });
   * 
   * @function search
   * @memberof module:places#
   * @param {Object} options
   * @param {string} options.query
   * @param {string} [options.location]
   * @param {string} [options.address]
   * @param {number} [options.distance]
   * @param {number} [options.limit]
   * @param {string} [options.sort] - 'RELEVANCE' or 'DISTANCE'
   * @param {string} [options.include]
   * @param {number} [options.min_rating]
   * @param {boolean} [options.open]
   * @param {string} [options.price]
   * @returns {Promise<GoogleMapsPlace[]|undefined>}
   */
  search: async (options) => {

    // const fields = 'places.displayName.text,places.id,places.nationalPhoneNumber,places.formattedAddress,places.websiteUri,places.googleMapsUri,places.rating,places.types,places.primaryTypeDisplayName.text,places.photos,places.priceLevel,places.currentOpeningHours';
    const location = options.address ? await https({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${token('google', 'google')}&address=${encodeURIComponent(options.address)}`
    }) : undefined;
    
    if (options.address && !location?.results?.length)
      throw new Error('Address not found');

    const attempt = await handler({
      method: 'POST',
      endpoint: 'places:searchText?fields=*',
      handler: 'places',
      body: {
        textQuery: options.location ? `${options.query} in ${options.location}` : options.query,
        includedType: options.include,
        maxResultCount: options.limit,
        minRating: options.min_rating,
        openNow: options.open,
        priceLevels: options.price,
        rankPreference: options.sort ? options.sort.toUpperCase() : 'RELEVANCE',
        languageCode: 'en',
        locationBias: location ? {
          circle: {
            center: {
              latitude: location.results[0].geometry.location.lat,
              longitude: location.results[0].geometry.location.lng
            },
            radius: options.distance ? options.distance * 1609.34 : 8046.72
          }
        } : undefined
      }
    });

    // console.log('attempt', attempt);
    return buildPlace(attempt);
  }

};

/**
 * @param {any} payload
 * @param {Array<GoogleMapsPlace>} [places]
 * @returns {GoogleMapsPlace[]|undefined}
 */
function buildPlace(payload, places = []) {
  if (!payload || !payload.places?.length) return;
  for (const place of payload.places) {
    places.push(removeFalsyFromObject({
      id: place.id,
      name: place.displayName?.text,
      types: place.types,
      primary_type: place.primaryTypeDisplayName?.text,
      address: place.formattedAddress,
      phone: place.nationalPhoneNumber,
      maps_url: place.googleMapsUri,
      website: place.websiteUri,
      status: cap(place.businessStatus.toLowerCase()),
      price: cap(place.priceLevel?.split(/_/g)[2]?.toLowerCase()),
      rating: place.rating,
      user_ratings: place.userRatingCount,
      open: place.currentOpeningHours?.openNow,
      hours: buildHours(place),
      reviews: place.reviews ? place.reviews.map((/** @type {{ text: { text: string; }; rating: number; relativePublishTimeDescription: string; }} */ review) => removeFalsyFromObject({
        text: review.text.text,
        rating: review.rating,
        published: review.relativePublishTimeDescription
      })) : undefined,
      editorial: place.editorialSummary?.text,
      payment: place.paymentOptions
        ? Object.keys(place.paymentOptions)
          .filter((x) => place.paymentOptions[x])
          .map((x) => x.replace(/accepts|Cards/gi, ''))
        : undefined,
      fuel: place.fuelOptions ? place.fuelOptions.fuelPrices?.reduce((/** @type {any} */ acc, /** @type {{type: string, price: {units: number, nanos: number}}} */ x) => ({
        ...acc,
        [x.type]: `$${x.price.units}.${(x.price.nanos / 10000000) || '00'}`
      }), {}) : undefined,
      sub_destinations: place.subDestinations,
      takeout: place.takeout,
      delivery: place.delivery,
      dine_in: place.dineIn,
      curbside_pickup: place.curbsidePickup,
      reservable: place.reservable,
      serves_breakfast: place.servesBreakfast,
      serves_lunch: place.servesLunch,
      serves_dinner: place.servesDinner,
      serves_beer: place.servesBeer,
      serves_wine: place.servesWine,
      serves_brunch: place.servesBrunch,
      serves_vegetarian_food: place.servesVegetarianFood,
      outdoor_seating: place.outdoorSeating,
      live_music: place.liveMusic,
      menu_for_children: place.menuForChildren,
      serves_cocktails: place.servesCocktails,
      serves_dessert: place.servesDessert,
      serves_coffee: place.servesCoffee,
      good_for_children: place.goodForChildren,
      allows_dogs: place.allowsDogs,
      restroom: place.restroom,
      good_for_groups: place.goodForGroups,
      good_for_watching_sports: place.goodForWatchingSports
      
    }));
  }
  return places;
}

/**
 * 
 * @param {any} payload 
 * @param {{[x: string]: GoogleMapsWeekDays}} hours 
 * @returns {{[x: string]: GoogleMapsWeekDays} | undefined}
 */
function buildHours(payload, hours = {}) {
  if (!payload || (!payload.currentOpeningHours && !payload.currentSecondaryOpeningHours)) return;
  
  const processWeekdays = (/** @type {any[]} */ temp) => 
    temp?.reduce((/** @type {any} */ acc, /** @type {string} */ current) => ({
      ...acc,
      [current.split(/:\s+/)[0]]: current.split(/:\s+/)[1]
    }), {});
  
  if (payload.currentOpeningHours)
    hours.Regular = processWeekdays(payload.currentOpeningHours.weekdayDescriptions);

  if (payload.currentSecondaryOpeningHours) 
    payload.currentSecondaryOpeningHours.forEach((/** @type {{ secondaryHoursType: string; weekdayDescriptions: any[]; }} */ hour) => {
      hours[cap(hour.secondaryHoursType.toLowerCase())] = processWeekdays(hour.weekdayDescriptions);
    });

  return hours;
}
/**
 * @param {string} word 
 * @returns {string}
 */
const cap = (word) => word ? word.charAt(0).toUpperCase() + word.slice(1) : word;

