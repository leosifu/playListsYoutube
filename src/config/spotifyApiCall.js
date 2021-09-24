import axios from 'axios';
import querystring from 'querystring';

const apiType = {
  search: 'search',
  playlist: 'playlist'
}

const SPOTIFY_API = 'https://accounts.spotify.com/api/';

export const spotifyLogin = async (token) => {
  try {
    console.log(token);

    const {
      REACT_APP_SPOTIFY_ID,
      REACT_APP_REDIRECT_URL,
      REACT_APP_SPOTIFY_SECRET
    } = process.env;

    const data = {
      grant_type: "authorization_code",
      redirect_uri: REACT_APP_REDIRECT_URL,
      code: token,
      client_id: REACT_APP_SPOTIFY_ID,
      client_secret: REACT_APP_SPOTIFY_SECRET
    }
    const response = await axios.post(`https://accounts.spotify.com/api/token`, querystring.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    console.log(response);
    return response;

  } catch (e) {
    console.log(e);
  }
}

export async function spotifyApiCall(type, params) {

  const res = await axios.get(`${SPOTIFY_API}${apiType[type]}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}${params}`)
  const data = res.data;

  return data;
}
