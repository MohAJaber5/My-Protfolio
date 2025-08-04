
import React from "react";
const Footer = () => {
  return <footer className="w-full bg-transparent py-16 relative z-10">
      <div className="section-container">
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-xs">
                MJ
              </div>
              <span className="font-medium text-white">Mohammad Jaber</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2024 Mohammad Jaber. Built with React & TypeScript.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
