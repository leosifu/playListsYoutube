import axios from 'axios';

const apiType = {
  search: 'search',
  playlist: 'playlist'
}

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/';


export async function youtubeApiCall(type, params) {

  const res = await axios.get(`${YOUTUBE_API}${apiType[type]}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}${params}`)
  const data = res.data;

  return data;
}

export default youtubeApiCall;
