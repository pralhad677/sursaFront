import React from 'react';
import './Dashboard.css';

interface DashboardProps {
  user: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Welcome, {user}</h2>
      <p className="dashboard-message">This is your dashboard.</p>
    </div>
  );
};

export default Dashboard;
