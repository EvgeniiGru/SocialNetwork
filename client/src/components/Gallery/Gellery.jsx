import React from 'react';
import gallery from "../Gallery/Gallery.module.css"
import ReactFileReader from 'react-file-reader';

const Gallery = (props) => {
 
  let GallerysPicture =
    props.gallery.length === 0 ?
      <p className={gallery.imgBlock}>У Вас пока нет изображений</p> :
      props.gallery.map(img => (
        <div key={img.id} className={gallery.imgBlock}>
          <img src={img.src}
           alt = {img.id}
            className={gallery.img} />
        </div>)
      );

  return (<div className={gallery.content}>

    <div className={gallery.line_download}>
      <div className={gallery.adress}>
        <input className={gallery.adress_item} type="text" />
      </div>
      <div className={gallery.download}>
      <ReactFileReader base64={true} handleFiles={props.getImgNow.bind(props)} >
        <button className={gallery.download_bt + ' button_black_style'}>...</button>
      </ReactFileReader>
      </div>

      
    </div>
    <div className={gallery.line_picture}>
      {GallerysPicture}
    </div>
  </div>)
}

export default Gallery;