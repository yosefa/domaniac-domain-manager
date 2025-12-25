import React, { useState } from 'react';
import { Domain, NotificationLevel } from '../types';

interface DomainCardProps {
  domain: Domain;
  onDelete: (id: string) => void;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDaysRemaining = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining(domain.expiryDate);

  let statusLevel = NotificationLevel.SAFE;
  let statusColor = 'border-l-4 border-green-500';
  let badgeColor = 'bg-green-500/20 text-green-400';

  if (daysRemaining < 0) {
    statusLevel = NotificationLevel.EXPIRED;
    statusColor = 'border-l-4 border-red-600';
    badgeColor = 'bg-red-500/20 text-red-400';
  } else if (daysRemaining <= 30) {
    statusLevel = NotificationLevel.WARNING;
    statusColor = 'border-l-4 border-yellow-500';
    badgeColor = 'bg-yellow-500/20 text-yellow-400';
  } else if (daysRemaining <= 60) {
    statusColor = 'border-l-4 border-blue-400';
  }

  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group ${statusColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">{domain.name}</h3>
          <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{domain.registrar}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold ${badgeColor}`}>
          {daysRemaining < 0 ? 'EXPIRED' : `${daysRemaining} DAYS`}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Expires</span>
          <span className="text-gray-300 font-mono">{new Date(domain.expiryDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Cost</span>
          <span className="text-gray-300 font-medium">{domain.currency} {domain.price}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500">Auto-Renew</span>
          <span className={domain.autoRenew ? 'text-green-400' : 'text-gray-500'}>
            <i className={`fas fa-${domain.autoRenew ? 'check-circle' : 'times-circle'}`}></i>
          </span>
        </div>
      </div>

      {domain.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {domain.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 text-[10px]">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-2 border-t border-gray-700 mt-2">
        <button
          onClick={() => onEdit(domain)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm transition-colors"
        >
          <i className="fas fa-edit mr-2"></i> Edit
        </button>

        <button
          onClick={() => onDelete(domain.id)}
          className="w-10 bg-gray-700 hover:bg-red-900/50 hover:text-red-400 text-gray-400 py-2 rounded text-sm transition-colors flex items-center justify-center"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default DomainCard;