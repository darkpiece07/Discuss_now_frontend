import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCircle, FaUserCheck } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo1 from ".././images/logo1.png";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../firebase'
import { signOut } from "firebase/auth";
import ".././css/NavBar.css";
import { VscBellDot } from "react-icons/vsc";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

export default function NavBar() {

    const navigate = useNavigate()
    const logout = async () => {
        await signOut(auth);
        navigate('/login')
    }

    const user = useSelector(state => state.profile)
    // console.log(user);

    const link1 = '/user/' + user.userId;

    return (
        <div>
            <div className="nav_main">
                <div className="nav_left">
                    <Link to="/">
                        <img src={logo1} alt="Discuss Now" height="65px" />
                    </Link>
                </div>
                <div className="nav_middle">
                    <div className="nav_mid_child nav_twitter">
                        <Link to="/" rel="noreferrer" >
                            <h5>Home</h5>
                        </Link>
                    </div>
                    <div className="nav_mid_child nav_facebook">
                        <a style={{"color" : "black"}} href="https://www.linkedin.com/company/now-or-never-community/" target='_blank'>About</a>
                    </div>
                    <div className="nav_mid_child nav_insta">
                        <Link to="/addpost" rel="noreferrer" >
                            <Button variant="danger" >Add a Post</Button>
                        </Link>
                    </div>
                </div>

                <div className="nav_notify">
                    <VscBellDot style={{ color: "black" }} />
                    <span style={{ color: "black" }}>Notifications</span>
                </div>

                <div className="nav_right">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark">
                            <FaUserCircle size={28} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item href="#/action-1">
                                <Link to={link1} style={{ textDecoration: "none", color: "white" }}>
                                    <FaUserCheck />
                                    &nbsp;&nbsp;View Profile
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Divider />
                            <Dropdown.Item to="#/action-4">
                                <Link to="/login" style={{ textDecoration: "none", color: "white" }} onClick={logout}>
                                    <FiLogOut />
                                    &nbsp;&nbsp;Logout
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
