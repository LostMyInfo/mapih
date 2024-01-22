// @ts-check

/**
 * ### @summary [Google Maps Place]{@link https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places}
 * @typedef {Object} GoogleMapsPlace
 * @property {string} id
 * @property {string} name
 * @property {string[]} types
 * @property {string} primary_type
 * @property {string} address
 * @property {string} [phone_number]
 * @property {boolean} [open]
 * @property {string} maps_link
 * @property {string} [website]
 * @property {{[x: string]: GoogleMapsWeekDays}} [hours] 
 * @property {GoogleMapsWeekDays[]} [secondary_hours]
 * @property {string} [status]
 * @property {string} [price]
 * @property {number} [rating]
 * @property {number} [user_ratings] 
 * @property {GoogleMapsReview[]} [reviews]
 * @property {string} [editorial]
 * @property {string[]} [payment]
 * @property {GoogleMapsParking & { valet: boolean}} [parking]
 * @property {GoogleMapsSubDestination[]} [sub_destinations]
 * @property {GoogleMapsFuelPrices[]} fuel
 * @property {GoogleMapsFuelPrices[]} editorial
 */
 
/**
 * @typedef {Object} GoogleMapsParking
 * @property {GoogleMapsFreeParking} [free]
 * @property {GoogleMapsPaidParking} [paid]
 */
  
/**
 * @typedef {Object} GoogleMapsFreeParking
 * @property {boolean} [lot]
 * @property {boolean} [street]
 * @property {boolean} [garage]
 */
 
/**
 * @typedef {Object} GoogleMapsPaidParking
 * @property {boolean} [lot]
 * @property {boolean} [street]
 * @property {boolean} [garage]
 */

/**
 * @typedef {Object} GoogleMapsWeekDays
 * @property {string} [Monday]
 * @property {string} [Tuesday]
 * @property {string} [Wednesday]
 * @property {string} [Thursday]
 * @property {string} [Friday]
 * @property {string} [Saturday]
 * @property {string} [Sunday]
 */

/**
 * @typedef {Object} GoogleMapsReview
 * @property {string} text
 * @property {number} rating
 * @property {string} published
 */

/**
 * @typedef {Object} GoogleMapsFuelPrices
 * @property {string} type
 * @property {string} price
 */

/**
 * @typedef {Object} GoogleGeocodingResult
 * @property {GeocodingAddressComponent[]} address_components
 * @property {string} formatted_address
 * @property {GeocodingGeometry} geometry
 * @property {string} place_id
 * @property {string[]} types
 */

/**
 * @typedef {Object} GeocodingAddressComponent
 * @property {string[]} types
 * @property {string} long_name
 * @property {string} short_name
 */

/**
 * @typedef {Object} GeocodingGeometry
 * @property {GeocodingBounds} [bounds]
 * @property {{lat: number, lng: number}} location
 * @property {string} location_type
 * @property {GeocodingBounds} viewport
 */

/**
 * @typedef {Object} GeocodingBounds
 * @property {{lat: number, lng: number}} northeast
 * @property {{lat: number, lng: number}} southwest
 */