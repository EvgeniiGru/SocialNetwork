import React from "react"
import classes from "./SearchFrends.module.css";
import { NavLink } from "react-router-dom";


const AllUsers = (props) => {
    let users = props.users.map(user => {
        return (
            <NavLink key={user.id} to={"/profile/id" + user.id} className={classes.itemPeople + " form_style"}>
                <img src={user.avatar} alt={user.name} className={classes.avatar} />
                <ul className={classes.info}>
                    <li className={classes.itemsInfo}>Name: {user.name}</li>
                    <li className={classes.itemsInfo}>Age: {user.information.age}</li>
                    <li className={classes.itemsInfo}>Sex: {user.information.sex}</li>
                    <li className={classes.itemsInfo}>Country: {user.information.country}</li>
                    <li className={classes.itemsInfo}>City: {user.information.city}</li>
                </ul>
                {user.follower ? <button className={classes.addFrend + " button_yellow_style"} onClick={() => props.unFollowFn(user.id)} >UNFOLLOW</button> :
                    <button className={classes.addFrend + " button_black_style"} onClick={() => props.followFn(user.id)} >FOLLOW</button>
                }
            </NavLink>
        )
    });
    let pageButton = props.maxPage.map(p => {

        return <button key={p} className={p === props.pageNow ? classes.btMore + " button_yellow_style" : classes.btMore + " button_black_style"} onClick={() => props.onChangePage(p)}>{p}</button>
    })

    return (
        <div className={classes.all}>
            <ul className={classes.body + " form_style"}>
                {users}
            </ul>
            <ul className={classes.filterMenu + " form_style"}>
                <li className={classes.itemFilter}>
                    <button className={classes.nameFilter + " button_black_style"}  >Name</button>

                </li>
                <li className={classes.itemFilter}>
                    <button className={classes.nameFilter + " button_yellow_style"}>Age</button>
                    <input type="text" className={classes.itemsFilterPoint} />
                </li>
                <li className={classes.itemFilter}>
                    <button className={classes.nameFilter + " button_yellow_style"}>Sex</button>
                    <input type="text" className={classes.itemsFilterPoint} />
                </li>
                <li className={classes.itemFilter}>
                    <button className={classes.nameFilter + " button_yellow_style"}>Country</button>
                    <input type="text" className={classes.itemsFilterPoint} />
                </li>
                <li className={classes.itemFilter}>
                    <button className={classes.nameFilter + " button_yellow_style"}>City</button>
                    <input type="text" className={classes.itemsFilterPoint} />
                </li>
            </ul>
            <div className={classes.btMoreMenu}>
                {pageButton}
            </div>
            <div className={classes.btUpMenu}>
            </div>
        </div>
    )
}



export default AllUsers;