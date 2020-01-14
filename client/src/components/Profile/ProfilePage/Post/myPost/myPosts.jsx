import React from 'react';
import "../myPost/myPost.css";
import classes from './Wall.module.css'
import TextareaAutosize from 'react-textarea-autosize';

const MyPost = (props) => {
  let smsWall = props.wallMap.map(
    sms => {
      return (<div key={sms.id} className={classes.item}>

        <div className={classes.line_time}>
          <div className={classes.name}> <a>{sms.name}</a> </div>
          <div className={classes.time}>{sms.time}</div>
          <div className={classes.del}>
            <button className="button_black_style">X</button>
          </div>
        </div>

        <div className={classes.line_message}>
          <div className={classes.avatar}>
            <img className={classes.avatar_img} src={sms.avatar} alt={sms.name} />
          </div>
          <div className={classes.message}>
            <TextareaAutosize
              className={classes.message_text}
              minRows={1}
              onChange={props.createObjectChangeWall}
              value={sms.text} />
          </div>
        </div>

        <div className={classes.line_like}>
          <span onClick={() => props.addLike(sms)}>{sms.countLike.length}Like ♡</span>
        </div>


      </div>)
    }
  )

  return (
    <div className="posts">
      <div className="post">
        <div className="post_text">
          My post
    </div>
        <div className="post_input">
          <div className="post_input_blockItems">
            <TextareaAutosize
              className="post_input_blockButton-item"
              minRows={1}
              onChange={props.createObjectChangeWall}
              value={props.printText} />
          </div>
          <div className="post_input_blockButton">
            <button className="post_input_blockButton_bt button_black_style" onClick={() => props.addMessages(props.printText, props.profile)} >➤</button>
          </div>
        </div>
      </div>
      <div className={classes.wall}>
        {smsWall}
      </div>
    </div>)
}

export default MyPost;