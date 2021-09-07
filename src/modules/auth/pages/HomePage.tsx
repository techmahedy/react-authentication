import React from 'react';
import { Link } from "react-router-dom";
import { logoutAction } from '../redux/logout/logout.actions';
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {

    const loginStateData = useSelector((state: any) => state.loginState);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutAction());
    }

    return (
        <>
            <div id="not-found">
                <div className="fof">
                    <h1>Welcome {loginStateData?.data?.data?.name}</h1> 
                    <button onClick={logout}>Logout</button>
                    <Link to="/products">All Product</Link>
                </div>
            </div>
        </>
    )
}

export default HomePage