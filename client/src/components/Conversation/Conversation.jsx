import React, { useState, useEffect } from 'react';
import { getUser } from '../../utils/APIRoutes';
import axios from 'axios';

function Conversation({ data, currentUserId }) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const userId = data.members.find(
            (id) => id !== currentUserId)
        const getUserData = async () => {
            try {
                const { data } = await axios.get(getUser(userId));
                console.log("USer:", data)
                setUserData(data);
            } catch (error) {
                console.log(error)
            }
        }
        getUserData();
    }, [])
    return (
        <div className="follower conversation">
            <div>
                <div className="online-dot">concac</div>
                <div className="online">{userData?.email}</div>
                <img src={userData?.profilePicture} alt="" className="" />
            </div>
        </div>
    );
}

export default Conversation;