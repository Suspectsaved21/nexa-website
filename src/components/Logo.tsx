
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity">
      <div className="flex items-center justify-center w-8 h-8 rounded bg-[#9b77ee]">
        <span className="text-white font-extrabold">N</span>
      </div>
      <span className="text-nexa-600">exa</span>
    </Link>
  );
};
