import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Domain } from '../types';

interface DomainFormProps {
  initialData?: Domain;
  onSubmit: (data: Omit<Domain, 'id'>) => void;
  onCancel: () => void;
}

interface FormState {
  name: string;
  registrar: string;
  expiryDate: Date | null;
  price: number;
  currency: string;
  autoRenew: boolean;
  notes: string;
  tags: string;
}

const DomainForm: React.FC<DomainFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    registrar: '',
    expiryDate: new Date(),
    price: 0,
    currency: 'USD',
    autoRenew: false,
    notes: '',
    tags: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        registrar: initialData.registrar,
        expiryDate: new Date(initialData.expiryDate),
        price: initialData.price,
        currency: initialData.currency,
        autoRenew: initialData.autoRenew,
        notes: initialData.notes || '',
        tags: initialData.tags.join(', ')
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      expiryDate: date
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.expiryDate) return;

    onSubmit({
      ...formData,
      expiryDate: formData.expiryDate.toISOString(),
      price: Number(formData.price),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Domain Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="example.com"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Registrar</label>
          <input
            type="text"
            name="registrar"
            required
            value={formData.registrar}
            onChange={handleChange}
            placeholder="GoDaddy, Namecheap..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Expiry Date</label>
          <div className="relative">
             <DatePicker
              selected={formData.expiryDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              wrapperClassName="w-full"
              placeholderText="Select expiration date"
              showPopperArrow={false}
              required
            />
            <div className="absolute right-3 top-2.5 pointer-events-none text-gray-400">
               <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Price</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="IDR">IDR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="personal, business, project x"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center gap-3 py-2">
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="autoRenew"
            id="autoRenew"
            checked={formData.autoRenew}
            onChange={handleChange}
            className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-indigo-600"
            style={{ right: formData.autoRenew ? '0' : 'unset', left: formData.autoRenew ? 'unset' : '0' }}
          />
          <label htmlFor="autoRenew" className={`block overflow-hidden h-6 rounded-full cursor-pointer ${formData.autoRenew ? 'bg-indigo-600' : 'bg-gray-700'}`}></label>
        </div>
        <label htmlFor="autoRenew" className="text-sm font-medium text-gray-300">Auto Renew Enabled</label>
      </div>

      <div className="pt-4 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors font-medium shadow-lg shadow-indigo-500/30"
        >
          {initialData ? 'Update Domain' : 'Add Domain'}
        </button>
      </div>
    </form>
  );
};

export default DomainForm;