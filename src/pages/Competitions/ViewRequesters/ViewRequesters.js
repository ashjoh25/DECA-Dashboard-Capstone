import './ViewRequesters.css';
import Header from '../../../components/Header/Header'
import Menu from '../../../components/Menu/Menu'
import ParticipantCard from '../../../components/ParticipantCard/ParticipantCard';
import RequestedUserCard from './RequestedUserCard/RequestedUserCard';
import ApprovedUserCard from './ApprovedUserCard/ApprovedUserCard'
import { useState, useEffect, useContext } from 'react';
<<<<<<< HEAD

export default function ViewRequesters() {

    // event_id hard-coded for now
    let event_id = 63;
=======
import { useParams } from 'react-router-dom';  // Import useParams here
import { useLocation } from 'react-router-dom';


export default function ViewRequesters() {

    const location = useLocation();
    const { event_id, title } = location.state || {};
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14

    const [requesters, setRequesters] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);

    useEffect(() => {
<<<<<<< HEAD
        fetch(`http://localhost:8081/todolist/user-event/${event_id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
                if (Array.isArray(data)) {
                    const pending = data.filter(user => user.request_status === 'pending');
                    const approved = data.filter(user => user.request_status === 'approved');
    
                    console.log("Pending users:", pending);
                    console.log("Approved users:", approved);
    
                    setRequesters(pending);
                    setApprovedUsers(approved);
                } else {
                    console.error("Data is not an array:", data);
                }
            })
            .catch(error => console.error("Error fetching users:", error));
    }, []);
=======
        if (event_id) {
            fetch(`http://localhost:8081/todolist/get-user-event/${event_id}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Fetched data:", data);
                    if (Array.isArray(data)) {
                        const pending = data.filter(user => user.request_status === 'pending');
                        const approved = data.filter(user => user.request_status === 'approved');
        
                        console.log("Pending users:", pending);
                        console.log("Approved users:", approved);
        
                        setRequesters(pending);
                        setApprovedUsers(approved);
                    } else {
                        console.error("Data is not an array:", data);
                    }
                })
                .catch(error => console.error("Error fetching users:", error));
        }
    }, [event_id]);  // Dependency array includes event_id to refetch when event_id changes
    
    
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
    

    return (
        <>
            <Header />
            <Menu />
<<<<<<< HEAD
            <h1 className="comp" style={{ marginBottom: "20px" }}>Event Approval</h1>
            <div style={{ display: "flex", gap: "0px" }}>
                <div className="fundapprovals">
                    <h1>Requesters</h1>
                    {requesters.length > 0 ? (
                        requesters.map(user => (
                            <RequestedUserCard key={user.user_id} user_id={user.user_id} user={user} />
=======
            <h1 className="event-approval-header" style={{ marginBottom: "20px" }}>Event Approval</h1>
            <div style={{ display: "flex", gap: "0px" }}>
                <div className="col">
                    <h1>Requesters</h1>
                    <div className="requesters">
                    {requesters.length > 0 ? (
                        requesters.map((user, index) => (
                            <RequestedUserCard 
                                key={`requester_${user.user_id}_${event_id}_${index}`} 
                                user_id={user.user_id} 
                                event_id={event_id}
                                user={user} 
                                setRequesters={setRequesters} // Pass setRequesters as a prop
                            />

>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                        ))
                    ) : (
                        <p>No requesters found</p>
                    )}
<<<<<<< HEAD
                </div>

                <div className="fundapprovals">
                    <h1>Approved</h1>
                    {approvedUsers.length > 0 ? (
                        approvedUsers.map(user => (
                            <ApprovedUserCard key={user.user_id} user_id={user.user_id} event_id={event_id} />
=======
                    </div>
                </div>

                <div className="col">
                    <h1>Approved</h1>
                    <div className="approved-users">
                    {approvedUsers.length > 0 ? (
                        approvedUsers.map((user, index) => (
                            <ApprovedUserCard 
                                key={`approved_${user.user_id}_${event_id}_${index}`} 
                                title={title}
                                user_id={user.user_id} 
                                event_id={event_id} 
                                user={user}
                            />
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                        ))
                    ) : (
                        <p>No approved users found</p>
                    )}
<<<<<<< HEAD
                </div>
            </div>
=======
                    </div>
                </div>

            </div>

>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
        </>
    )
}
