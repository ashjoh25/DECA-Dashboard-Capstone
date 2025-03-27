<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useContext } from "react";  // Import useContext
import './FundraiserCard.css';
import EditFundraiserBtn from '../EditFundraiserBtn/EditFundraiserBtn'
import { UserRoleContext } from "../../../context/UserRoleContext";

export default function FundraiserCard(props) {

    const userRole = useContext(UserRoleContext);
    console.log("User role:", userRole);
    console.log("Event status:", props.status);

    // admin view
    if (userRole === "admin") {
        return (
            <div className="fundraiser-card">
                <h3>{props.fund_name}</h3>
                <p>{props.fund_description}</p>
                <p>{props.fund_date}</p>
                <p>{props.fund_location}</p>
                <div className="align-center">
                <EditFundraiserBtn 
                            fund_id={props.fund_id} 
                            setFundraisers={props.setFundraisers} 
                            fund_name={props.fund_name} 
                            fund_description={props.fund_description} 
                            fund_location={props.fund_location}
                            fund_date={props.fund_date}
                        />
                        <button className="delete-btn" onClick={props.onDelete}>
                            Delete
                        </button>
                </div>
            </div>
        )
    // general participant view
    } else if (userRole === "participant") {
        return (
            <div className = "fundraiser-card">
                <h3>{props.fund_name}</h3>
                <p>{props.fund_description}</p>
                <p>{props.fund_location}</p>
                <p>{props.fund_date}</p>
            </div>
        )
    }

    return null;
}
=======
import React, { useState, useEffect } from 'react';
import './FundraiserCard.css';

import axios from '../../../services/axiosConfig';

// Single Fundraiser Component

const Fundraiser = ({ fund_name, fund_location, fund_date, fund_description, userRole, onDelete }) => {
  console.log({ fund_name, fund_location, fund_date, fund_description, userRole }); // Add this to check data

  return (
    <div className="fundraiser-box">
      <p className="fundraiser-title">{fund_name}</p>
      <p className="fundraiser-text">{fund_location}</p>
      <p className="fundraiser-text">{fund_date}</p>
      <p className="fundraiser-text">{fund_description}</p>
      {userRole === 'admin' && (
        <button className="fundraiser-button" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

// Fundraisers List Component
const Fundraisers = ({ fundraisers, userRole }) => {
  const [fundraiserList, setFundraiserList] = useState([]);

  // Synchronize fundraiserList state with fundraisers prop
  useEffect(() => {
    setFundraiserList(fundraisers);
  }, [fundraisers]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newFundraiser, setNewFundraiser] = useState({ fund_name: '', fund_description: '', fund_date: '', fund_location: '' });


  const handleAddFundraiser = async () => {
    if (!newFundraiser.fund_name || !newFundraiser.fund_description || !newFundraiser.fund_date || !newFundraiser.fund_location) {
      alert('Please provide a title, description, location, and date.');
      return;
    }
  
    try {
      const FundraiserData = {
        fund_name: newFundraiser.fund_name,
        fund_description: newFundraiser.fund_description,
        fund_date: newFundraiser.fund_date,
        fund_location: newFundraiser.fund_location
      };
  
      console.log('Sending payload:', FundraiserData); // Log the payload
  
      const response = await axios.post('http://localhost:8081/fundraisers/add', FundraiserData);
  
      console.log('Fundraiser added:', response.data);
      setFundraiserList([...fundraiserList, response.data]);
      setIsPopupOpen(false);
      setNewFundraiser({ fund_name: '', fund_description: '', fund_date: '', fund_location: ''});
    } catch (error) {
      if (error.response) {
        console.error('Error adding fundraiser:', error.response.data);
        alert(`Failed to add fundraiser: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error('Error adding fundraiser:', error);
        alert('Failed to add fundraiser.');
      }
    }
  };
  

  const handleDeleteFundraiser = async (id) => {
    try {
      // send the id of the fundraiser to delete to the backend
      await axios.delete(`http://localhost:8081/fundraisers/delete/${id}`);
      setFundraiserList(fundraiserList.filter((fundraiser) => fundraiser.fundraiser_id !== id));
    } catch (error) {
      console.error('Error deleting fundraiser:', error);
      alert('Failed to delete fundraiser.');
    }
  };
  

  return (
    <>
      <div className="fundraisers-container">
        {fundraiserList.map((fundraisers, index) => (
          <Fundraiser
            key={fundraisers.fundraiser_id}
            fund_name={fundraisers.fund_name}
            fund_description={fundraisers.fund_description}
            fund_date={fundraisers.fund_date}
            fund_location={fundraisers.fund_location}
            userRole={userRole}
            onDelete={() => handleDeleteFundraiser(fundraisers.fundraiser_id)}
          />
        ))}
      </div>
      {userRole === 'admin' && (
        <>
          <div className="center-button-container">
            <button className="center-button" onClick={() => setIsPopupOpen(true)}>
              Add New Fundraiser
            </button>
          </div>
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <h2>Add New Fundraiser</h2>
                <label>
                  Name:
                  <input
                    type="text"
                    value={newFundraiser.title}
                    onChange={(e) => setNewFundraiser({ ...newFundraiser, fund_name: e.target.value })}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={newFundraiser.fund_description}
                    onChange={(e) =>
                      setNewFundraiser({ ...newFundraiser, fund_description: e.target.value })
                    }
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    value={newFundraiser.fund_date}
                    onChange={(e) =>
                      setNewFundraiser({ ...newFundraiser, fund_date: e.target.value })
                    }
                  />
                </label>
                <label>
                  Location: 
                  <input
                  type="text"
                  value={newFundraiser.fund_location}
                  onChange={(e) =>
                  setNewFundraiser({ ...newFundraiser, fund_location: e.target.value})
                }
                />
                </label>
                <div className="popup-buttons">
                  <button onClick={handleAddFundraiser}>Add Fundraiser</button>
                  <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Fundraisers;
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
