import React from 'react';

const SearchInput = ({search, inputSearch, searchVideos, handleKeypress, }) => {

  return(
    <div className="container">
      <div className="row">
        <div className="col-8">
          <input className="form-control" placeholder="Default input" value={search}
            onChange={inputSearch} onKeyDown={handleKeypress}/>
        </div>
        <div className="col-4">
          <button className="btn btn-primary" onClick={searchVideos}>Buscar</button>
        </div>
      </div>
    </div>
  )
}

export default SearchInput;
