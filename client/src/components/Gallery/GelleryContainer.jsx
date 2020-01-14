import { connect } from 'react-redux'
import Gallery from './Gellery'
import { getImgNow ,getGallery} from '../../redux/GalleryReduce'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { withAuthentication } from '../Hoc/withAUHoc'
import { compose } from 'redux'


class GalleryMapClass extends React.Component{

  componentDidMount(){
    this.props.getGallery(this.props.location.search)
  }

  render(){
    return <Gallery {...this.props}/>
  }
}

const mapState = (state) => {
  return({
   ...state.imgGallery
  })
}

export default compose(
  connect(mapState,{getImgNow,getGallery}),
  withRouter,
  withAuthentication
)
(GalleryMapClass);