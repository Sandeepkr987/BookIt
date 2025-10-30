import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigate from '../components/Navbar';
import Navbar from '../components/Navbar';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state; 

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    promoCode: '',
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (!agree) return alert('Please agree to the terms first.');

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', {
        experienceId: bookingData.id,
        experienceTitle: bookingData.title,
        date: bookingData.date,
        time: bookingData.time,
        quantity: bookingData.quantity,
        subtotal: bookingData.subtotal,
        tax: bookingData.tax,
        total: bookingData.total,
        fullName: form.fullName,
        email: form.email,
        promoCode: form.promoCode,
      });

      const refId =
      'HXD' +
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      '&' +
      Math.random().toString(36).substring(2, 4).toUpperCase();
      alert('✅ Booking Confirmed!');
      navigate('/results', {
      state: { booking: { ...res.data.booking, refId } },
    });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to confirm booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-8">
      <div className="flex-1 bg-white border rounded-xl p-2">
        <h2 className="font-semibold text-lg mb-2">Checkout</h2>

        <div className="grid grid-cols-2 gap-4 mb-2">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-lg px-2 py-1"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg px-2 py-1"
          />
        </div>

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="promoCode"
            value={form.promoCode}
            onChange={handleChange}
            placeholder="Promo Code"
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <button className="bg-black text-white px-4 py-2 rounded-lg">Apply</button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <span>I agree to the terms and safety policy</span>
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-white border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Experience</h3>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Experience:</span>
            <span>{bookingData.title}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{bookingData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{bookingData.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Qty:</span>
            <span>{bookingData.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{bookingData.subtotal}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Taxes:</span>
            <span>₹{bookingData.tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total:</span>
            <span>₹{bookingData.total}</span>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading || !agree}
          className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
            loading || !agree
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-300'
          }`}
        >
          {loading ? 'Processing...' : 'Pay and Confirm'}
        </button>
      </div>
    </div>
  );
}

