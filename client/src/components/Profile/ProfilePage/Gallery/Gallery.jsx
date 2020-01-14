import React from 'react';
import "../Gallery/Gallery.css";
import { NavLink } from 'react-router-dom';

const Gallery = (props) => {
  
  let GalleryImgs = props.galleryMap.map(img =>
    (<div className="gallery_photos_photo" key={img.id}>
      <img src={img.src}
        className="gallery_photos_photo_image" />
    </div>));
    
  return (<div className="gallery">
    <div className="gallery_text"><NavLink to={"/gallery?id=" + props.userId}>{'My gallerey '} {props.lengthGallery}</NavLink></div>
    <div className="gallery_photos">
      {GalleryImgs}
    </div>
  </div>)
}

export default Gallery;