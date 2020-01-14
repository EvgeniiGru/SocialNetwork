import React from 'react';
import classes from '../listMessages/listMessage.module.css';
import { NavLink } from 'react-router-dom';

const ListMesseges = (props) => {
  
  // let Dialog = props.dialogs.dialogMap.map(itemDialog => {
  //   return (
  //     <li className={classes.item_message}>
  //       <img className={classes.img} src="" alt="" />
  //       <NavLink to="/message" className={classes.message}></NavLink>
  //       <button className={classes.button}>X</button>
  //     </li>
  //   )
  // }
  // );

  return (<div className={classes.content}>

    <input className={classes.search_item}></input>

    <ul className={classes.list_messeges}>
     
    </ul>

  </div>)
};

export default ListMesseges;