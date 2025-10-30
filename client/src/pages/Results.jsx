import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking; 

  //Generate refId
  const refId =
    booking?.refId ||
    'REF' +
      Math.random().toString(36).substring(2, 8).toUpperCase() +
      Math.floor(Math.random() * 100);

  return (
    <div className='w-screen h-screen bg-gray-200'>
      <Navbar/>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-green-400 mb-4">
        <CheckCircle size={72} />
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Booking Confirmed
      </h1>
      <p className="text-gray-500 mb-6">Ref ID: {refId}</p>

      <button
        onClick={() => navigate('/')}
        className="border border-yellow-50 rounded text-blue-500 underline"
      >
      Back to Home
      </button>

      </div>
    </div>
  );
};

export default Results;
