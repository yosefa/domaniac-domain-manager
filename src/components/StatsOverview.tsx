import React from 'react';
import { Stats } from '../types';

interface StatsOverviewProps {
  stats: Stats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-globe fa-4x text-blue-500"></i>
        </div>
        <p className="text-gray-400 text-sm font-medium">Total Domains</p>
        <h3 className="text-3xl font-bold text-white mt-2">{stats.totalDomains}</h3>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-coins fa-4x text-green-500"></i>
        </div>
        <p className="text-gray-400 text-sm font-medium">Est. Annual Cost</p>
        <h3 className="text-3xl font-bold text-white mt-2">${stats.totalCost.toFixed(2)}</h3>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-clock fa-4x text-yellow-500"></i>
        </div>
        <p className="text-gray-400 text-sm font-medium">Expiring Soon (30 days)</p>
        <h3 className="text-3xl font-bold text-yellow-400 mt-2">{stats.expiringSoon}</h3>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-exclamation-triangle fa-4x text-red-500"></i>
        </div>
        <p className="text-gray-400 text-sm font-medium">Expired</p>
        <h3 className="text-3xl font-bold text-red-400 mt-2">{stats.expired}</h3>
      </div>
    </div>
  );
};

export default StatsOverview;