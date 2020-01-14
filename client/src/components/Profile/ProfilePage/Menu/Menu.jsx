import React from 'react';
import './../Menu/Menu.css';
import ReactFileReader from 'react-file-reader';

const Menu = (props) => {
  let ProfilePage = props.profile.map(prof => {
    return (<>
      <div key={prof.id} className="profile_avatar">
        <div className="profile_avatar_block">
          <img className="profile_avatar_block_img"
            src={props.avatar}
            alt={prof.name} />
        </div>
      <ReactFileReader base64={true} handleFiles={props.setAvatar.bind(props)} >
        <button className="button_black_style profile_avatar_bt">Edit ✎ </button>
      </ReactFileReader>     
      </div>
      <div className="infoProfile">
        <h2>{prof.name}</h2>
        <hr width="90%" />
        <p>Age:{prof.information.age} years</p>
        <p>Sex:{prof.information.sex}</p>
        <p>Coutry:{prof.information.country}</p>
        <p>City:{prof.information.city}</p>
      </div>
      </>)
  });

  return (<div className="profile">
    {ProfilePage}
  </div>)

}

export default Menu;