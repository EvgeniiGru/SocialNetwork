import React from 'react';
import classes from '../Authentication/Authentication.module.css'

const Authentication = (props) => {
    return (
        <div className = {classes.body}>
        <div className={classes.form + " form_style"}>
            <div className={classes.block_mail}>
                <label htmlFor="" className={classes.text_mail} >Mail</label>
                <input type="text" className={classes.mail} value = {props.data.mail} onChange={props.data.ChangeMail} />
            </div>
            <div className={classes.block_reg}>
                <label htmlFor="" className={classes.text_reg}>Password</label>
                <input type="password" className={classes.reg} value = {props.data.password} onChange={props.data.ChangePassword}/>
            </div>
            <div className={classes.bt_panel}>
                <button className={classes.ok +" button_black_style"} onClick = {()=> props.authenticationUser(props.data.mail, props.data.password)}>OK</button>
                {props.data.isLog?
                    <button className={classes.regist+" button_black_style"} onClick={()=> props.data.ChangeReg()}>Login</button>:
                    <button className={classes.regist+" button_black_style"} onClick={()=> props.data.ChangeLog()}>Regist</button>
                }
            </div>
        </div>
        </div>
    )
}

export default Authentication;