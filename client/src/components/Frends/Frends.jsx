import React from 'react'
import classes from './Frends.module.css'

const Frends = (props) => {
    
    let users = '';
    let pageButton = '';
    let checkBox = '';

    if (props.checkBoxValue === 'myFrends') {
        checkBox = () => {
            return (
                <div className={classes.radio}>
                    <p><input name="frend" type='radio' value='myFrends' onChange={(body) => props.ChangeCheckBoxValue(body)} checked />My Frend</p>
                    <p><input name="frend" type='radio' value='mayBeFrends' onChange={(body) => props.ChangeCheckBoxValue(body)} />May be frend </p>
                    <p><input name="frend" type='radio' value='frendsRequests' onChange={(body) => props.ChangeCheckBoxValue(body)}/>Frends Requests</p>               
                </div>
            )
        }
        users = props.frends.map(user => {
            return (
                <li key={user.id} className={classes.itemPeople + " form_style"}>
                    <img src={user.avatar} alt={user.name} className={classes.avatar} />
                    <ul className={classes.info}>
                        <li className={classes.itemsInfo}>Name: {user.name}</li>
                        <li className={classes.itemsInfo}>Age: {user.information.age}</li>
                        <li className={classes.itemsInfo}>Sex: {user.information.sex}</li>
                        <li className={classes.itemsInfo}>Country: {user.information.country}</li>
                        <li className={classes.itemsInfo}>City: {user.information.city}</li>
                    </ul>
                    <div className={classes.addFrend}>
                        <button className={classes.messageFrendBt + " button_black_style"} onClick={() => props.follower(user.id)} >Send Message</button>
                        <button className={classes.endFrendBt + " button_red_style"} onClick={(e) => props.delFrends(user.id)} >End frend</button>
                    </div>
                </li>
            )
        })
        pageButton = props.maxPageFrend.map(p => {
            return <button key={p} className={p === props.pageNow ? classes.btMore + " button_yellow_style" : classes.btMore + " button_black_style"} onClick={() => props.onChangePage(p)}>{p}</button>
        })
    } else if( props.checkBoxValue === 'mayBeFrends') {
        checkBox = () => {
            return (
                <div className={classes.radio}>
                    <p><input name="frend" type='radio' value='myFrends' onChange={(body) => props.ChangeCheckBoxValue(body)} />My Frend</p>
                    <p><input name="frend" type='radio' value='mayBeFrends' onChange={(body) => props.ChangeCheckBoxValue(body)} checked/>May be frend </p>
                    <p><input name="frend" type='radio' value='frendsRequests' onChange={(body) => props.ChangeCheckBoxValue(body)} />Frends Requests</p>               
                </div>
            )
        }
        users = props.mayBeFrends.map(user => {
            return (
                <li key={user.id} className={classes.itemPeople + " form_style"}>
                    <img src={user.avatar} alt={user.name} className={classes.avatar} />
                    <ul className={classes.info}>
                        <li className={classes.itemsInfo}>Name: {user.name}</li>
                        <li className={classes.itemsInfo}>Age: {user.information.age}</li>
                        <li className={classes.itemsInfo}>Sex: {user.information.sex}</li>
                        <li className={classes.itemsInfo}>Country: {user.information.country}</li>
                        <li className={classes.itemsInfo}>City: {user.information.city}</li>
                    </ul>
                    <div className={classes.addFrend}>
                        <button className={classes.delOrAddFrendBt + " button_black_style"} onClick={() => props.addFrends(user.id)} >Follow</button>
                        <button className={classes.delOrAddFrendBt + " button_red_style"} onClick={() => props.wayBeFrendDelet(user.id)} >Unfollow</button>
                    </div>
                </li>
            )
        })
        pageButton = props.maxPageMayBeFrends.map(p => {
            return <button key={p} className={p === props.pageNow ? classes.btMore + " button_yellow_style" : classes.btMore + " button_black_style"} onClick={() => props.onChangePage(p)}>{p}</button>
        })
    } else {
        checkBox = () => {
            return (
                <div className={classes.radio}>
                    <p><input name="frend" type='radio' value='myFrends' onChange={(body) => props.ChangeCheckBoxValue(body)}/>My Frend</p>
                    <p><input name="frend" type='radio' value='mayBeFrends' onChange={(body) => props.ChangeCheckBoxValue(body)} />May be frend </p>
                    <p><input name="frend" type='radio' value='frendsRequests' onChange={(body) => props.ChangeCheckBoxValue(body)} checked />Frends Requests</p>               
                </div>
            )
        }
        users = props.frendsRequests.map(user => {
            return (
                <li key={user.id} className={classes.itemPeople + " form_style"}>
                    <img src={user.avatar} alt={user.name} className={classes.avatar} />
                    <ul className={classes.info}>
                        <li className={classes.itemsInfo}>Name: {user.name}</li>
                        <li className={classes.itemsInfo}>Age: {user.information.age}</li>
                        <li className={classes.itemsInfo}>Sex: {user.information.sex}</li>
                        <li className={classes.itemsInfo}>Country: {user.information.country}</li>
                        <li className={classes.itemsInfo}>City: {user.information.city}</li>
                    </ul>
                    <div className={classes.addFrend}>
             <button className={classes.delRequestsFrendBt + " button_red_style"} onClick={() => props.unfollowFrends(user.id)} >Unfollow</button>
                    </div>
                </li>
            )
        })
        pageButton = props.maxPageMayBeFrends.map(p => {
            return <button key={p} className={p === props.pageNow ? classes.btMore + " button_yellow_style" : classes.btMore + " button_black_style"} onClick={() => props.onChangePage(p)}>{p}</button>
        })
    }

    return (
        <div className={classes.all}>
            {checkBox()}
            <ul className={classes.body + " form_style"}>
                {users}
            </ul>
            <div className={classes.btMoreMenu}>
                {pageButton}
            </div>
        </div>
    )
}

export default Frends