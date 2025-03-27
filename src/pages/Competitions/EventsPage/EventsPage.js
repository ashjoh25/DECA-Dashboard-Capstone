import './EventsPage.css';
import Header from '../../../components/Header/Header';
import Menu from '../../../components/Menu/Menu';
import CreateEventBtn from './CreateEventBtn/CreateEventBtn';
import EventCard from './EventCard/EventCard';

import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserRoleContext } from '../../../context/UserRoleContext';
import axios from 'axios';
<<<<<<< HEAD

export default function EventsPage() {

    // hard-coded user_id for now
    let user_id = 456;

=======
import { useAuth0 } from '@auth0/auth0-react';


export default function EventsPage() {
    const { user, isAuthenticated } = useAuth0();
    const [user_id, setUserId] = useState(null);
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
    const [events, setEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [pendingEvents, setPendingEvents] = useState([]);
    const [defaultEvents, setDefaultEvents] = useState([]);
<<<<<<< HEAD



    const location = useLocation();
    const userRole = useContext(UserRoleContext);
    const searchParams = new URLSearchParams(location.search);
    const comp_id = searchParams.get('comp_id'); // Get comp_id from URL
    let title = "";

    if (comp_id == 1){
        title = "Regionals";
    } else if (comp_id == 2){
        title = "States";
    } else if (comp_id == 3) {
        title = "Nationals"
    }

    console.log(comp_id);

    useEffect(() => {
        const fetchEventsData = async () => {
            if (!comp_id || !user_id) return;
=======
    const [deniedEvents, setDeniedEvents] = useState([]);
    const location = useLocation();
    const userRole = useContext(UserRoleContext);
    const searchParams = new URLSearchParams(location.search);
    
    // Extract comp_id from state
    const comp_id = location.state?.comp_id || null;
    let title = "";

    if (comp_id == 1) {
        title = "Regionals";
    } else if (comp_id == 2) {
        title = "States";
    } else if (comp_id == 3) {
        title = "Nationals";
    }

    useEffect(() => {
        // Fetch the user ID based on email
        const fetchUserId = async () => {
            if (user?.email) {  // Check if user and user.email are available
                try {
                    const response = await axios.get('http://localhost:8081/user/get-user-id', {
                        params: { email: user.email }  // Pass the email as a query parameter
                    });
                    if (response.data?.user_id) {
                        setUserId(response.data.user_id);  // Set the user_id dynamically
                        console.log(user_id)
                    } else {
                        console.error('User ID not found');
                    }
                } catch (error) {
                    console.error('Error fetching user ID:', error);
                }
            } else {
                console.error('User email is not available');
            }
        };
    
        fetchUserId();
    }, [user]);  // Dependency array ensures the effect runs when "user" changes
    

    useEffect(() => {
        const fetchEventsData = async () => {
            if (!comp_id || !user_id) return;  // Ensure user_id is available before fetching events
            console.log("Getting events w comp_id ", comp_id, " and user_id ", user_id)
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
    
            try {
                const allEventsResponse = await axios.get(`http://localhost:8081/events/display/${comp_id}`);
                const allEvents = allEventsResponse.data;
    
                const approvedEventsResponse = await axios.get(`http://localhost:8081/events/myevents`, {
                    params: { user_id, comp_id }
                });
                const approvedEvents = approvedEventsResponse.data;
    
                const pendingEventsResponse = await axios.get(`http://localhost:8081/events/pending-events`, {
                    params: { user_id, comp_id }
                });
                const pendingEvents = pendingEventsResponse.data;
    
<<<<<<< HEAD
                // Filter events based on their categories
                const approvedEventIds = approvedEvents.map(event => event.event_id);
                const pendingEventIds = pendingEvents.map(event => event.event_id);
                const defaultEventIds = allEvents
                    .filter(event => !approvedEventIds.includes(event.event_id) && !pendingEventIds.includes(event.event_id))
                    .map(event => event.event_id);
    
                // Filter events
                const approvedEventsList = allEvents.filter(event => approvedEventIds.includes(event.event_id));
                const pendingEventsList = allEvents.filter(event => pendingEventIds.includes(event.event_id));
                const defaultEventsList = allEvents.filter(event => defaultEventIds.includes(event.event_id));
    
                // Update state
                setEvents(allEvents); // For displaying all events, if needed
                setMyEvents(approvedEventsList); // Approved events
                setPendingEvents(pendingEventsList); // Pending events
                setDefaultEvents(defaultEventsList); // Default events
    
                console.log("Approved events:", approvedEventsList);
                console.log("Pending events:", pendingEventsList);
                console.log("Default events:", defaultEventsList);
=======
                const deniedEventsResponse = await axios.get(`http://localhost:8081/events/denied-events`, {
                    params: { user_id, comp_id }
                });
                const deniedEvents = deniedEventsResponse.data; // List of denied event IDs
                console.log(deniedEvents);
    
                // Filter events based on their categories
                const approvedEventIds = approvedEvents.map(event => event.event_id);
                const pendingEventIds = pendingEvents.map(event => event.event_id);
                const deniedEventIds = deniedEvents.map(event => event.event_id);
    
                // Default events: Events that are not in approved, pending, or denied lists
                const defaultEventsList = allEvents.filter(event =>
                    !approvedEventIds.includes(event.event_id) &&
                    !pendingEventIds.includes(event.event_id) &&
                    !deniedEventIds.includes(event.event_id) // Exclude denied events
                );
    
                // Update state
                setEvents(allEvents); // For displaying all events, if needed
                setMyEvents(approvedEvents); // Approved events
                setPendingEvents(pendingEvents); // Pending events
                setDefaultEvents(defaultEventsList); // Default events (without denied ones)
                setDeniedEvents(deniedEvents);
    
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
    
        fetchEventsData();
    }, [comp_id, user_id]);
    
<<<<<<< HEAD
    
    
    
    
    

    
    const handleDeleteEvent = async (id) => {
        try {
          // send the id of the resource to delete to the backend
          await axios.delete(`http://localhost:8081/events/delete/${id}`);
          setEvents(events.filter((event) => event.event_id !== id)); // Update local state
        } catch (error) {
          console.error('Error deleting event:', error);
          alert('Failed to delete event.');
        }
    };


    if (userRole === "admin"){
=======

    const handleDeleteEvent = async (id) => {
        try {
            // send the id of the resource to delete to the backend
            await axios.delete(`http://localhost:8081/events/delete/${id}`);
            setEvents(events.filter((event) => event.event_id !== id)); // Update local state
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event.');
        }
    };

    if (userRole === "admin") {
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
        return (
            <>
                <Header />
                <Menu />
                <div className="add-event-container">
<<<<<<< HEAD
                <div id="main">
                <a href="competitions">
                    <button id="ahh">
                    <img id="eventimage" src="blue.png" alt=""></img>
                    </button>
                </a>
                </div>
                    
                
                    <h1 style={{color: "#00529B"}}>{title}</h1>
                    

                    <div className="btns-h-align">
                        <a href="roommates">
                            <button id="submit-btn" style={{fontSize: "18px"}}>View Roommates</button>
                        </a>
=======
                    <div id="main">
                        <a href="competitions">
                            <button id="ahh">
                                <img id="eventimage" src="blue.png" alt=""></img>
                            </button>
                        </a>
                    </div>

                    <h1 id="eventheader" style={{ color: "#00529B" }}>{title}</h1>

                    <div className="btns-h-align">
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                        <CreateEventBtn events={events} setEvents={setEvents} comp_id={comp_id} />
                    </div>

                    <div>
<<<<<<< HEAD
                        <h1 style={{ color: "#F5585E", zIndex: "999" }}>All Events:</h1>
=======
                        <h1 id="allevents">All Events:</h1>
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                        <div className="events-container">
                            {events?.map((event, index) => (
                                <EventCard
                                    key={event.event_id}
                                    event_id={event.event_id} // This ensures event_id is available in props
                                    comp_id={comp_id}
                                    title={event.event_name}
                                    descrip={event.event_descrip}
                                    req_1={event.req_1}
                                    req_2={event.req_2}
                                    req_3={event.req_3}
                                    req_4={event.req_4}
                                    req_5={event.req_5}
                                    userRole={userRole}
                                    setEvents={setEvents}
                                    onDelete={() => handleDeleteEvent(event.event_id)}
                                />
                            ))}
<<<<<<< HEAD

=======
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                        </div>
                    </div>
                </div>
            </>
<<<<<<< HEAD
        )

    } else {

=======
        );
    } else {
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
        return (
            <>
                <Header />
                <Menu />
                <div style={{ color: "#00529B", alignItems: "center" }} className="add-event-container">
<<<<<<< HEAD
               
                <div id="main">
                <a href="competitions">
                    <button id="ahh">
                    <img id="eventimage" src="blue.png"alt=""></img>
                    </button>
                </a>
                </div>

                    <h1 style={{ color: "#00529B" }}>{title}</h1>


                    {/* <a href="roommates">
                        <button style={{ backgroundColor: "#00529B", color:"white", fontSize: "18px" }}>
                            View Roommates
                        </button>
                    </a> */}

=======
                    <div id="main">
                        <a href="competitions">
                            <button id="ahh">
                                <img id="eventimage" src="blue.png" alt=""></img>
                            </button>
                        </a>
                    </div>

                    <h1 style={{ color: "#00529B" }}>{title}</h1>

>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                    <div>
                        <h1 style={{ color: "#F5585E", zIndex: "999" }}>All Events:</h1>
                        <div className="events-container">
                            {pendingEvents?.map((event, index) => (
                                <EventCard
                                    key={event.event_id}
                                    status={"pending"}
                                    event_id={event.event_id}
<<<<<<< HEAD
=======
                                    user_id={user_id}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                                    title={event.event_name}
                                    descrip={event.event_descrip}
                                    req_1={event.req_1}
                                    req_2={event.req_2}
                                    req_3={event.req_3}
                                    req_4={event.req_4}
                                    req_5={event.req_5}
                                    userRole={userRole}
<<<<<<< HEAD
=======
                                    setEvents={setEvents}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                                    onDelete={() => handleDeleteEvent(event.event_id)}
                                />
                            ))}

                            {defaultEvents?.map((event, index) => (
                                <EventCard
                                    key={event.event_id}
                                    status={"default"}
                                    event_id={event.event_id}
<<<<<<< HEAD
=======
                                    user_id={user_id}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                                    title={event.event_name}
                                    descrip={event.event_descrip}
                                    req_1={event.req_1}
                                    req_2={event.req_2}
                                    req_3={event.req_3}
                                    req_4={event.req_4}
                                    req_5={event.req_5}
                                    userRole={userRole}
<<<<<<< HEAD
=======
                                    setEvents={setEvents}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                                    onDelete={() => handleDeleteEvent(event.event_id)}
                                />
                            ))}
                        </div>
                    </div>

<<<<<<< HEAD

                    
=======
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
                    <div >
                        <h1 style={{ color: "#F5585E", alignItems: "center", marginTop: "30px" }}>My Events:</h1>
                        <div className="events-container">
                            {myEvents?.map((event, index) => (
                                <EventCard
                                    key={event.event_id}
                                    status={"approved"}
                                    event_id={event.event_id}
                                    user_id={user_id}
                                    title={event.event_name}
                                    descrip={event.event_descrip}
                                    req_1={event.req_1}
                                    req_2={event.req_2}
                                    req_3={event.req_3}
                                    req_4={event.req_4}
                                    req_5={event.req_5}
                                    userRole={userRole}
<<<<<<< HEAD
                                    onDelete={() => handleDeleteEvent(event.event_id)}
                                />
                            ))}

                        </div>
                    </div>
                </div>

            </>
        )

    }
}
=======
                                    setEvents={setEvents}
                                    onDelete={() => handleDeleteEvent(event.event_id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
