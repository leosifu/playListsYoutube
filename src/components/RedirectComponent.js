import {useEffect, } from 'react';

import { Redirect } from "react-router-dom";

import {useLocation} from "react-router-dom";

import {spotifyLogin, } from '../config/spotifyApiCall';

const RedirectComponent = () => {

  const location = useLocation();
  const {search} = location;

  useEffect(() => {
    const getImportantPart = search.substring(1);
    console.log(getImportantPart);
    const decodedUrl = JSON.parse('{"' + decodeURI(getImportantPart).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    console.log(decodedUrl);
    console.log(search);
    getToken(decodedUrl.code);
  }, [search]);

  const getToken = async (token) => {
    const response = await spotifyLogin(token);
  }


  return (
    <Redirect to="/room/1" />
  )
}

export default RedirectComponent;
