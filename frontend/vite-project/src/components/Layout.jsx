import React from 'react';
import Chatbot from './Chatbot';

function Layout({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      
      {/* Page Content */}
      <main className="relative z-10">
        {children}
        <Chatbot/>
      </main>
    </div>
  );
}

export default Layout;
