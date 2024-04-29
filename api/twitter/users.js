/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { ResponseError } = require('../resources/Errors');
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { handler } = require('../resources/handlers');

const user_fields = ['created_at,description,entities,id,location,most_recent_tweet_id,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,verified_type,withheld'];
const tweet_fields = ['note_tweet,attachments,author_id,context_annotations,conversation_id,created_at,edit_controls,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld'];
const expansions = ['attachments.poll_ids,attachments.media_keys,author_id,edit_history_tweet_ids,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id'];
const media_fields = ['duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics,alt_text,variants'];
const place_fields = ['contained_within,country,country_code,full_name,geo,id,name,place_type'];
const poll_fields = ['duration_minutes,end_datetime,id,options,voting_status'];

/**
 * @module users
 */

module.exports = {

  request,
  // _findUser,
  findMyID,

  /**
   * @summary
   * ### [Get Current User's Information]{@link https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-me}
   * 
   * @example
   * await api.twitter.users.me()
   * 
   * @function me
   * @memberof module:users#
   * @param {Object} [options]
   * @param {TwitterTweetFields[]} [options.tweet_fields]
   * @param {TwitterUserFields[]} [options.user_fields]
   * @param {boolean} [options.pinned_tweet_id]
   * @returns {Promise<TwitterUser | undefined>}
   */
  me: async (options) => {

    const attempt = await handler(request('users/me', options));
    if (attempt.errors?.length)
      throw new ResponseError(attempt, null, 'twitter_error');

    return attempt.data;
  },
    
  /**
    * @summary
    * ### [Lookup User]{@link https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username}
    *
    * @example
    * await api.twitter.users.find('lostmyinfo');
    *
    * await api.twitter.users.find('lostmyinfo', {
    *   user_fields: ['name', 'id', 'created_at']
    * });
    * 
    * @function find
    * @memberof module:users#
    * @param {string} resource - username or user id
    * @param {Object} [options]
    * @param {TwitterTweetFields[]} [options.tweet_fields]
    * @param {TwitterUserFields[]} [options.user_fields]
    * @param {boolean} [options.pinned_tweet_id]
    * @returns {Promise<TwitterSingleUserLookupResponse | undefined>}
    */
  find: async (resource, options) => {
    const endpoint = /^\d+$/.test(resource)
      ? 'users/' + resource
      : `users/by/username/${resource}`;
    // console.log('endpoint:', endpoint);
    let attempt;
    attempt = await handler(request(endpoint, options));
    if (!attempt.errors) return attempt.data ?? attempt;
    if (attempt.errors[0].title === 'Not Found Error' && /^\d+$/.test(resource)) {
      attempt = await handler(request(`users/by/username/${resource}`, options));
    }

    if (attempt.errors?.length) 
      throw new ResponseError(attempt, null, 'twitter_error');

    return attempt;
  },

  /**
    * @summary
    * ### [Find User By Username]{@link https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username}
    *
    * @example
    * await api.twitter.users.by_username('lostmyinfo');
    *
    * await api.twitter.users.by_username('lostmyinfo', {
    *   user_fields: ['name', 'id', 'created_at']
    * });
    * 
    * @function by_username
    * @memberof module:users#
    * @param {string} username - username
    * @param {Object} [options]
    * @param {TwitterTweetFields[]} [options.tweet_fields]
    * @param {TwitterUserFields[]} [options.user_fields]
    * @param {boolean} [options.pinned_tweet_id]
    * @returns {Promise<TwitterSingleUserLookupResponse | undefined>}
    */
  by_username: async (username, options) => {
    const attempt = await handler(request(`users/by/username/${username}`, options));
    if (attempt.errors?.length)
      throw new ResponseError(attempt, null, 'twitter_error');

    return attempt;
  },

  /**
    * @summary
    * ### [Find User By Username]{@link https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username}
    *
    * @example
    * await api.twitter.users.by_id('1234567890');
    *
    * await api.twitter.users.by_id('1234567890', {
    *   user_fields: ['name', 'id', 'created_at']
    * });
    * 
    * @function by_id
    * @memberof module:users#
    * @param {string} id - user id
    * @param {Object} [options]
    * @param {TwitterTweetFields[]} [options.tweet_fields]
    * @param {TwitterUserFields[]} [options.user_fields]
    * @param {boolean} [options.pinned_tweet_id]
    * @returns {Promise<TwitterSingleUserLookupResponse | undefined>}
    */
  by_id: async (id, options) => {
    const attempt = await handler(request('users/' + id, options));
    if (attempt.errors?.length)
      throw new ResponseError(attempt, null, 'twitter_error');

    return attempt;
  },

  /**
  * @summary
  * ### [Search Users That Match A Search Query]{@link https://developer.twitter.com/en/docs/twitter-api/users/search/api-reference/get-users-search}
  *
  * @example
  * await api.twitter.users.search('query here');
  *
  * await api.twitter.users.search('query here', {
  *   user_fields: ['name', 'id', 'created_at'],
  *   max_results: 3
  * });
  * 
  * @function search
  * @memberof module:users#
  * @param {string} query
  * @param {Object} [options]
  * @param {TwitterTweetFields[]} [options.tweet_fields]
  * @param {TwitterUserFields[]} [options.user_fields]
  * @param {number} [options.max_results]
  * @param {string} [options.next_token] - This parameter is used to get the next 'page' of results. The value used with the parameter is pulled directly from the response provided by the API, and should not be modified.
  * @param {boolean} [options.pinned_tweet_id]
  * @returns {Promise<TwitterUser | undefined>}
  */
  /*
  search: async (query, options) => {
    const attempt = await handler(request('search', { query, ...options }));
    
    if (attempt.errors?.length)
      throw new ResponseError(attempt, null, 'twitter_error');

    return attempt;
  },
  */

  /**
   * @summary
   * ### [Find Tweets By User]{@link https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets}
   *
   * @example
   * await api.twitter.users.tweets('1234567890');
   *
   * await api.twitter.users.tweets('1234567890', {
   *   user_fields: ['name', 'id', 'created_at']
   * });
   * 
   * @function tweets
   * @memberof module:users#
   * @param {string} resource - user id
   * @param {Object} [options]
   * @param {TwitterTweetFields[]} [options.tweet_fields]
   * @param {TwitterUserFields[]} [options.user_fields]
   * @param {TwitterMediaFields[]} [options.media_fields]
   * @param {TwitterPlaceFields[]} [options.place_fields]
   * @param {TwitterPollFields[]} [options.poll_fields]
   * @param {TwitterExpansions[]} [options.expansions]
   * @param {string[]} [options.exclude]
   * @param {number} [options.max_results]
   * @param {string} [options.next_token]
   * @param {string} [options.pagination_token]
   * @param {string} [options.since_id]
   * @param {string} [options.until_id]
   * @param {string} [options.start_time]
   * @param {string} [options.end_time]
   * @returns {Promise<TwitterTweetLookupResponse>}
   */
  tweets: async (resource, options) => {
    
    let attempt;
    if (/^\d+$/.test(resource)) {
      attempt = await handler(request(`users/${resource}/tweets`, options));
      if (!attempt.errors) return attempt;
    }
    if (!/^\d+$/.test(resource) || attempt?.errors?.[0]?.title === 'Not Found Error') {
      if (/^\d+$/.test(resource))
        throw new ResponseError(attempt, null, 'twitter_error');

      const user_id = (await handler(request(`users/by/username/${resource}`)))?.data?.id;
      // console.log('user_id:', user_id);
      if (user_id)
        attempt = await handler(request(`users/${user_id}/tweets`, options));
    }

    if (attempt.errors?.length) 
      throw new ResponseError(attempt, null, 'twitter_error');

    return attempt;
  }
    
  
};

/**
 * @param {string} path 
 * @param {Object} [options] 
 * @param {boolean} [options.pinned_tweet_id]
 * @param {TwitterUserFields[]} [options.user_fields]
 * @param {TwitterTweetFields[]} [options.tweet_fields]
 * @param {TwitterMediaFields[]} [options.media_fields]
 * @param {TwitterPlaceFields[]} [options.place_fields]
 * @param {TwitterPollFields[]} [options.poll_fields]
 * @param {TwitterExpansions[]} [options.expansions]
 * @param {string[]} [options.exclude]
 * @param {string} [options.query]
 * @param {number} [options.max_results]
 * @param {string} [options.next_token]
 * @param {string} [options.pagination_token]
 * @param {string} [options.since_id]
 * @param {string} [options.until_id]
 * @param {string} [options.start_time]
 * @param {string} [options.end_time]
 * @param {import('../resources/handlers').Method} [method]
 * @returns {{method: import('../resources/handlers').Method; endpoint: string; parameters: string; handler: string; auth_type: string | undefined;}}
 */
function request(path, options, method) {
  const tweets = path.includes('tweets');
  
  const {
    expansions: exp = options?.expansions?.join(','),
    user_fields: UFields = options?.user_fields?.join(','),
    tweet_fields: TFields = options?.tweet_fields?.join(','),
    media_fields: MFields = options?.media_fields?.join(','),
    place_fields: PLFields = options?.place_fields?.join(','),
    poll_fields: POFields = options?.poll_fields?.join(','),
    exclude = options?.exclude?.join(',')
  } = options || {};

  // console.log('path:', path);
  const parameters = buildQueryString(path === 'search' ? '' : path, removeFalsyFromObject({
    expansions: tweets
      ? exp ? exp : expansions
      : options?.pinned_tweet_id ? 'pinned_tweet_id' : undefined,
    'user.fields': UFields ?? user_fields.join(','),
    'tweet.fields': TFields ?? tweet_fields.join(','),
    'media.fields': tweets ? (MFields ?? media_fields) : undefined,
    'place.fields': tweets ? (PLFields ?? place_fields) : undefined,
    'poll.fields': tweets ? (POFields ?? poll_fields) : undefined,
    exclude,
    pagination_token: options?.pagination_token,
    since_id: options?.since_id,
    until_id: options?.until_id,
    start_time: options?.start_time,
    end_time: options?.end_time,
    query: options?.query,
    max_results: options?.max_results,
    next_token: options?.next_token
  }));

  return removeFalsyFromObject({
    method: method ?? 'GET',
    endpoint: path === 'search' ? 'users/search' : parameters,
    parameters,
    handler: 'twitter'
    // auth_type: path === 'search' ? 'user' : undefined
  });
}


async function findMyID() {
  const attempt = await handler(request('users/me'));
  if (attempt.errors?.length)
    throw new ResponseError(attempt, null, 'twitter_error');

  return attempt.data?.id;
}

/*
async function _findUser(resource, options) {
  const endpoint = /^\d+$/.test(resource)
    ? resource
    : `by/username/${resource}`;
  console.log('endpoint:', endpoint);
  let attempt;
  attempt = await handler(request(endpoint, options));
  if (!attempt.errors) return attempt.data ?? attempt;
  if (attempt.errors[0].title === 'Not Found Error' && /^\d+$/.test(resource)) {
    attempt = await handler(request(`by/username/${resource}`, options));
  }

  if (attempt.errors?.length) 
    throw new ResponseError(attempt, null, 'twitter_error');

  return attempt;
}
*/