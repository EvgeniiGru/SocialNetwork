import React from 'react';
import { connect } from 'react-redux';
import Menu from './ProfilePage/Menu/Menu';
import { getProfile, createObjectChangeWall, createAddMessageWall, 
    setAvatarServer, addMessagesServer, addLike } from '../../redux/ProfilePageReduce';
import Gallery from './ProfilePage/Gallery/Gallery';
import MyPost from './ProfilePage/Post/myPost/myPosts';
import { withRouter } from 'react-router-dom'
import '../Profile/Profile.css'
import { compose } from 'redux';
import { withAuthentication } from '../Hoc/withAUHoc';

class ProfileUser extends React.Component {
    
    componentDidMount() {
        this.props.getProfile(this.props.match.params.userId);
    }
    
    render() {
        return (
            <div className="content">
                <Menu profile={this.props.profile} 
                avatar = {this.props.avatar}
                setAvatar = {this.props.setAvatarServer}/>
                <Gallery galleryMap={this.props.gallery}
                    lengthGallery={this.props.lengthGallery}
                    userId = {this.props.match.params.userId}
                />
                <MyPost profile={this.props.profile}
                    addLike = {this.props.addLike}
                    wallMap={this.props.wallMap}
                    printText={this.props.printText}
                    createObjectChangeWall={this.props.createObjectChangeWall}
                    addMessages={ this.props.addMessagesServer} />
            </div>
        )
    }

}

let mapState = (state) => {
    return {
        ...state.profilePage
    }
}

export default compose(
    connect(mapState, {
        addLike,
        addMessagesServer,
        setAvatarServer,
        getProfile,
        createObjectChangeWall,
        createAddMessageWall
    }),
    withRouter,
    withAuthentication
  )
  (ProfileUser);