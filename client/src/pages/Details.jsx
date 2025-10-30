import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Details() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [experience, setExperience] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const TAX_RATE = 0.18 


  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`http://localhost:5000/api/experience/${id}`)
        const data = await res.json()
        setExperience(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [id])

    const timeSlots = [
    '06:00 AM',
    '08:00 AM',
    '10:00 AM',
    '03:00 PM',
    '05:00 PM'
  ]
  const handleConfirmBooking = () => {
  if (!selectedDate || !selectedTime) return;
  navigate('/checkout', {
    state: {
      id: experience.id,
      title: experience.title,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      tax,
      total
    }
  });
};
  //calc
  const subtotal = experience ? experience.price * quantity : 0
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax
  const increase = () => setQuantity(q => q + 1)
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))
  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading details...</div>
  }

  if (!experience) {
    return (
      <div className="text-center py-20 text-gray-600">
        Experience not found.<br />
        <Link to="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    )
  }

  const canBook = selectedDate && selectedTime
  return (
    <div className="container mx-auto px-6 py-8">
      <Navbar/>
      <Link to="/" className="text-blue-600 underline text-sm">Back to Home</Link>
      <hr/>
      <div className="mt-4 bg-white rounded-2xl shadow-md border p-6">
        <div className="flex flex-col lg:flex-row gap-8">      
          <img
            src={experience.thumbnail}
            alt={experience.title}
            className="w-full lg:w-1/2 rounded-xl2 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-1">{experience.title}</h1><span><p className="text-sm text-gray-600 mb-2">{experience.location}</p></span>
            <div className="flex flex-wrap gap-2 mb-2">
              {experience.tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-semibold mb-2">Choose a Date:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {experience.availability.map(a => (
                <button
                  key={a.date}
                  onClick={() => setSelectedDate(a.date)}
                  className={`border rounded-lg px-4 py-2 text-sm ${
                    selectedDate === a.date
                      ? 'bg-yellow-300 border-amber-50'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  <div>{a.date}</div>
                  <div className="text-xs text-gray-500">{a.slots} slots left</div>
                </button>
              ))}
            </div>
            {
              <>
                <h2 className="font-semibold mb-2">Choose a Time Slot:</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`border rounded-lg px-4 py-2 text-sm ${
                        selectedTime === time
                          ? 'bg-yellow-300 border-amber-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            }

            {selectedDate && selectedTime && (
              <>
                <h2 className="font-semibold mb-2">About:</h2>
                <p className="bg-gray-200 text-gray-700 text-m mb-2">{experience.description}</p>
              </>
            )}

            {/* Quantity + Price Summary */}
            {selectedDate && selectedTime && (
              <div className="border-t pt-4">
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  

                  {/* Price */}
                  <div className="flex-1 sm:text-right text-sm">
                    <div className="mb-1">Subtotal: ₹{subtotal.toFixed(2)}</div>
                    <div className="mb-1">Taxes (12%): ₹{tax.toFixed(2)}</div>
                    <span>
                    <p className="font-semibold text-sm flex items-center gap-3">Quantity</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={decrease}
                        className="w-4 h-4 border rounded-full flex items-center justify-center font-bold hover:bg-gray-100"
                      >−</button>
                      <span className="w-6 text-center">{quantity}</span>
                      <button
                        onClick={increase}
                        className="w-4 h-4 border rounded-full flex items-center justify-center font-bold hover:bg-gray-100"
                      >+</button>
                    </div>
                  </span>
                  <div className="font-semibold text-lg text-gray-800">Total: ₹{total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    disabled={!canBook}
                    onClick={handleConfirmBooking}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      canBook
                        ? 'bg-brand hover:bg-yellow-300'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                  Pay and Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
