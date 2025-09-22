import React from 'react';

const StatCard = ({ icon: Icon, count, description, fromColor, toColor }) => {
  return (
    <div className="p-6 flex items-center gap-4 hover:bg-white/10 transition-colors duration-300">
      <div className={`h-12 w-12 rounded-xl text-white flex items-center justify-center shadow-lg bg-gradient-to-br from-${fromColor}-600 to-${toColor}-600 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-3xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">{count}</div>
        <div className="text-sm text-white/80 mt-1 font-medium">{description}</div>
      </div>
    </div>
  );
};

export default StatCard;
