import React from 'react';
import classes from '../ItemMessages/itemMessages.module.css'
import { NavLink } from 'react-router-dom';

const ItemMessages = (props) => {
    let CheckMessageTextFn = (body) => {
        props.onCheckMessageTextFn(body);
    }
    let AddMessageTextFn = () => {
        props.onAddMessageTextFn();
    }

    let Massege = props.messagesMap.map(itemMessage =>{
        return(
        <li className={classes.item_message}>
        <div className={classes.itemHead}>
            <img src="" alt=""
            className={classes.img} />
            <NavLink to="" className={classes.name_user}></NavLink>
            <span className={classes.time}>{itemMessage.time}</span>
        </div>
        <textarea className={classes.sms}>{itemMessage.text}</textarea>
    </li>
    )})

    return (<div className={classes.content}>
        <div className={classes.head}>
            <button className={classes.btup + " button_black_style"}>⇐</button>
            <NavLink to="" className={classes.name}></NavLink>
        </div>
        <ul className={classes.list_messeges}>
            {Massege}
        </ul>
        <div className={classes.footer}>
            <textarea className={classes.my_messages} 
            value={props.printDialogText}
            onChange={CheckMessageTextFn}></textarea>
            <button className={classes.send + " button_black_style"}
            onClick={AddMessageTextFn}>Send</button>
        </div>
    </div>)
}

export default ItemMessages;