import './Resources.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import ResourceCards from './ResourceCard/ResourceCard';

import { useState, useEffect, useContext } from 'react';
import { UserRoleContext } from '../../context/UserRoleContext';
import axios from 'axios';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const userRole = useContext(UserRoleContext);
  console.log(userRole);

  // Fetch resources from axios
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:8081/resources/display');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    
    fetchResources();
  }, []);

  return (
    <div className="resources-page">
      <Header />
      <Menu />
<<<<<<< HEAD
      <h1 className="comp">Resources</h1>
=======
      <h1 className="resources-header">Resources</h1>
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
      <ResourceCards resources={resources} setResources={setResources} userRole={userRole} />
    </div>
  );
};

export default ResourcesPage;
