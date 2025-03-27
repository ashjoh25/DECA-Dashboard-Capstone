import { useEffect, useState } from "react";
import axios from "axios";
import "./RequestedUserCard.css";

<<<<<<< HEAD
export default function RequestedUserCard({ user_id }) {
=======
export default function RequestedUserCard(props) {
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Fetch user info when component mounts or when `user_id` changes
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8081/user/user-info', {
<<<<<<< HEAD
                    params: { user_id: user_id }
=======
                    params: { user_id: props.user_id }
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                });
                setUser(response.data);
            } catch (err) {
                console.error("Error fetching user info:", err);
                setError("User not found");
            }
        };

<<<<<<< HEAD
        if (user_id) {
            fetchUserInfo();
        }
    }, [user_id]);  // Re-run when `user_id` changes

    const handleStatusUpdate = async (status) => {
        try {
            // Make Axios request to update the status
            await axios.post(`http://localhost:8081/todolist/update-request-status/${user_id}`, {
                request_status: status
            });

            // Refetch the user info to update the status in the UI
            const response = await axios.get('http://localhost:8081/user/user-info', {
                params: { user_id: user_id }
            });

            // Update the user state with the latest data
            setUser(response.data);
        } catch (error) {
            console.error("Error updating status:", error);
            setError("Failed to update status");
=======
        if (props.user_id) {
            fetchUserInfo();
        }
    }, [props.user_id]);  // Re-run when `user_id` changes

    const handleApproveEvent = async () => {
        try {
            console.log("event_id ", props.event_id);
            console.log("user_id ", props.user_id);

            // Make a request to approve the event
            const response = await axios.post(`http://localhost:8081/todolist/approve-event/${props.event_id}/${props.user_id}`);

            // Handle success (e.g., update the UI with the new status)
            console.log('Event request approved');
            
            // Update the requesters list after approving the event
            props.setRequesters(prevRequesters => 
                prevRequesters.filter(user => user.user_id !== props.user_id) // Remove the approved user from requesters
            );
        } catch (error) {
            console.error('Error approving event:', error);
        }
    };

    // Function to handle denying the event
    const handleDenyEvent = async () => {
        try {
            console.log("event_id ", props.event_id);
            console.log("user_id ", props.user_id);

            // Make a request to deny the event
            const response = await axios.post(`http://localhost:8081/todolist/deny-event/${props.event_id}/${props.user_id}`);

            // Handle success (e.g., update the UI with the new status)
            console.log('Event request denied');
            
            // Update the requesters list after denying the event
            props.setRequesters(prevRequesters => 
                prevRequesters.filter(user => user.user_id !== props.user_id) // Remove the denied user from requesters
            );
        } catch (error) {
            console.error('Error denying event:', error);
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
        }
    };

    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className="card-container">
            <strong>
                <p className="card-title">
                    {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                </p>
            </strong>
            <p>{user ? `${user.email}` : "Loading..."}</p>
            <div>
                <button
                    className="approve-button"
<<<<<<< HEAD
                    onClick={() => handleStatusUpdate("approved")}
=======
                    onClick={handleApproveEvent} // Call approve function
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                >
                    Approve
                </button>
                <button
                    className="deny-button"
<<<<<<< HEAD
                    onClick={() => handleStatusUpdate("denied")}
=======
                    onClick={handleDenyEvent} // Call deny function
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                >
                    Deny
                </button>
            </div>
        </div>
    );
}
