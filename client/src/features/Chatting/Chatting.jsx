import React, { useState } from 'react';
import { BsToggleOn } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { IoMdSend, IoIosArrowDown } from "react-icons/io";
import { FaTimes, FaFacebookMessenger } from "react-icons/fa";
import img from '../../assets/images/avatar.jpg';
import image from '../../assets/images/nguyen.jpg';
import images from '../../assets/images/Pum.jpg';
import './Chatting.scss';
import Header from '../../pages/Horenso/Meeting/components/Header';

function Chatting() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
        <div className="ctn">
            <Header />
            <div className="container">
                <div className="sidebar">
                    <div className="sidebar__title">
                        <FaFacebookMessenger className="title-icon"/>
                        <p>CHATTING ROOM</p>
                    </div>
                    <div className="sidebar__content">
                        <div className="sidebar__content__avatar">
                            <img src={image} alt="avatar" />
                        </div>
                        <div className="sidebar__content__name">
                            <FiSettings />
                            <p>Jimmy Dang</p>
                        </div>
                        <div className="sidebar__content__role">
                            <p>Lead UX-UI Designer</p>
                            <div>
                                <p>active</p>
                                <BsToggleOn className="sbIcon"/> 
                            </div>
                        </div>
                    </div>
                    <div className="sidebar__status">
                        <div className="sidebar__status__online">
                            <label className="word">Online</label>
                            <div className="online">3</div>
                            <div className = "sidebar-icon" onClick = {handleClick}>
                                {click ? <FaTimes /> : <IoIosArrowDown />}
                            </div>
                        </div>
                        <div className="sidebar__status__people">
                            <div className="onlineCharacter">
                                <div className="character">
                                    <img src={img} alt="avatar" />
                                    <label>Thắng</label>
                                    <label className="sidebar__status__people sidebar__status__people--message">4</label>
                                </div>
                                <div className="character">
                                    <img src={img} alt="avatar" />
                                    <label>Khoa</label>
                                    <label className="sidebar__status__people sidebar__status__people--message">2</label>
                                </div>
                                <div className="character">
                                    <img src={img} alt="avatar" />
                                    <label>Minh</label>
                                    <label></label>
                                </div>
                            </div>
                            <div className="offlineCharacter">
                                <div className="character character--offline">
                                    <img src={img} alt="avatar" />
                                    <label>Nhut</label>
                                    <label></label>
                                </div>
                                <div className="character character--offline">
                                    <img src={img} alt="avatar" />
                                    <label>Nhut</label>
                                    <label></label>
                                </div>
                                <div className="character character--offline">
                                    <img src={img} alt="avatar" />
                                    <label>Nhut</label>
                                    <label></label>
                                </div>
                            </div>
                            
                        </div> 
                    </div>
                </div>
                <div className="chatBody">
                <div className="chatBody__chatting">
                    <div className="chatBody__chatting__teammate">
                        <img 
                            src = {images} 
                            alt = "user-avatar"
                            height="60px"
                            width="60px"
                            style={{borderRadius: "50%"}}
                        />
                        <div className="ctn-chatting">
                            <b>Pum</b>
                            <ul>
                                <li>
                                    <p>Hello Guys</p>
                                </li>
                                <li>
                                    <p>I love Hữu Thắng</p>
                                </li>
                                <li>
                                    <p>Tôi là thằng đbrr</p>
                                </li>
                                <li>
                                    <p>Ăn rác</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="chatBody__chatting__user">
                    <section>
                        <p>Loz Pum mat dai 🤬🤬</p>  
                    </section>
                    </div>
                </div>
                    <div className="chatBody__textMessages">
                        <input type="text" name="message" placeholder="Send a message ..."/>
                        <div>
                            <IoMdSend className="icon" />
                        </div>
                    </div>
                </div>
                {/* <div className="rightSidebar">
                    <div className="rightSidebar__info">
                        <div className="rightSidebar__info__avatar">
                            <img src={images} alt="avatar" />
                        </div>
                        <div className="rightSidebar__info__email">
                            <AiOutlineMail className="icon-rightSB"/> 
                            <p>pumk@gmail.com</p>
                        </div>
                        <div className="rightSidebar__info__name">
                            <BsPeopleCircle className="icon-rightSB"/> 
                            <p>Duong Dang Khoa</p>
                        </div>
                    </div>
                    <div className="rightSidebar__flowChart">
                    </div>
                </div> */}
            </div>
        </div>
    )
} 
export default Chatting