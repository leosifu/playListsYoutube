import React from 'react';

import Navbar from '../Navbar';

const Content = ({body}) => {
    return (
      <>
        <Navbar />
        <div className="content">
          {body}
        </div>
      </>
    );
}

export default Content;
