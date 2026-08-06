import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">© {new Date().getFullYear()} ParkEasy.</span>
          <span className="text-slate-500 text-sm">All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
