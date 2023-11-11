import React, { useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import './Header.css';
import { AuthContext, FirebaseContext } from '../../Strore/FirebaseContext';
import firebaseApp from '../../Firebase/config';
import Login from '../Login/Login'; // Remove the duplicated import statement

const auth = getAuth(firebaseApp);

function Header() {
    const { user } = useContext(AuthContext);
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    return (
        <div className="headerParentDiv">
            <div className="headerChildDiv">
                <div className="brandName">
                    <OlxLogo></OlxLogo>
                </div>
                <div className="placeSearch">
                    <Search></Search>
                    <input type="text" />
                    <Arrow></Arrow>
                </div>
                <div className="productSearch">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Find car, mobile phone and more..."
                        />
                    </div>
                    <div className="searchAction">
                        <Search color="#ffffff"></Search>
                    </div>
                </div>
                <div className="language">
                    <span> ENGLISH </span>
                    <Arrow></Arrow>
                </div>
                <div className="loginPage">
                    <span>
                        {user ? `Welcome ${user.displayName}` : <Link to="/login">Login</Link>}
                    </span>
                    <hr />
                </div>
                {user && <span onClick={() => {
                    signOut(auth);
                    navigate('/login');
                }}>Logout</span>}

                {user ? <div className="sellMenu"  onClick={()=>{
                  navigate('/create')
                }}>
                    <SellButton></SellButton>
                    <div className="sellMenuContent">
                        <SellButtonPlus></SellButtonPlus>
                        <span>SELL</span>
                    </div>
                </div> : <div className="sellMenu"  onClick={()=>{
                  navigate('/login')
                }}>
                    <SellButton></SellButton>
                    <div className="sellMenuContent">
                        <SellButtonPlus></SellButtonPlus>
                        <span>SELL</span>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Header;


