import {useState, useEffect, } from 'react';

import clientAxios from '../../config/axios';

import {Button, } from '@material-ui/core';

import Room from './Room';

const MainPage = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const {data} = await clientAxios().get(`/api/playList`);
      setRooms(data)
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  const createNewRoom = async () => {
    try {
      const {data} = await clientAxios().post(`/api/playList`);
      console.log(data);
      getRooms();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>

      <div>
        <Button
          variant='outlined'
          onClick={createNewRoom}
        >
          Nueva sala
        </Button>
      </div>
      {
        rooms.map(room =>
          <Room room={room} />
        )
      }
    </>
  )
}

export default MainPage;
