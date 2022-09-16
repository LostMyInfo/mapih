//***************************************/
//      Discord Oauth2 implement for Autocode
//  https://discord.com/developers/docs/topics/oauth2#oauth2
//***************************************/
const https = require(`../utils/https`);

module.exports = {
  //
  getCredentials: async (token) => {
    try {
      if (
        (res = await https.get({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/users/@me`),
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
          },
          body: ``,
        }))
      ) {
        return JSON.parse(res.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  },
  //
  getClientCredentials: async (client_id, client_secret, scope) => {
    try {
      if (
        (res = await https.get({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/users/@me`),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&scope=${scope}`,
        }))
      ) {
        return JSON.parse(res.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  },
  //
  getToken: async (client_id, client_secret, oauth2_redirect, code) => {
    try {
      redirect = encodeURIComponent(oauth2_redirect);
      if (
        (oauth_ = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/oauth2/token`),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect}&code=${code}`,
        }))
      ) {
        return JSON.parse(oauth_.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  }, //eo getToken
  //
  //refreshToken
  refreshToken: async (client_id, client_secret, refresh_token) => {
    try {
      if (
        (oauth_ = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/oauth2/token`),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}`,
        }))
      ) {
        return JSON.parse(oauth_.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  }, //eo refreshToken
  //
  //revokeToken
  revokeToken: async (client_id, client_secret, token) => {
    try {
      if (
        (oauth_ = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/oauth2/token/revoke`),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `client_id=${client_id}&client_secret=${client_secret}&token=${token}`,
        }))
      ) {
        return JSON.parse(oauth_.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  }, //eo revokeToken
};
