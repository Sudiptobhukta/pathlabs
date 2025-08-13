import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navabar({username,companyName}) {
   const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage or sessionStorage
    localStorage.removeItem("token");
    
    localStorage.removeItem("user");
   
    navigate("/");
  };
  return (
    
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, <span className="text-blue-600">{ username? username :'John' }</span>
            </h2>
            <p className="text-sm text-gray-500">{companyName}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/settings")}
              className="text-gray-600 hover:text-blue-600 transition"
              title="Settings"
            >
              ⚙️
            </button>
            
            <button
              onClick={handleLogout}
              // onClick={() => setShowChatbot(!showChatbot)}
              className="text-gray-600 hover:text-blue-600 transition"
              title="LogOut"
            >
              ❌
            </button>
          </div>
        </div>
      
  
  )
}

export default Navabar
