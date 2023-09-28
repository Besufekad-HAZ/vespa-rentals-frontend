import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addReservation } from '../../redux/reservationActions';
import { getUserFromLocalStorage } from '../../helpers/LocalStorage';
import { fetchMotorcycle } from '../../redux/reducers/motorcycleSlice';

const data = getUserFromLocalStorage();

function AddReservation() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.reservation.status);
  const [reservation, setReservation] = useState({
    start_date: '',
    end_date: '',
    city: '',
    user_id: data.user.data.id,
    motorcycle_id: '',
  });
  const motorcycle = useSelector((state) => state.motorcycle);
  const { user } = useSelector((state) => state.user);
  const { token } = user.user;

  useEffect(() => {
    dispatch(fetchMotorcycle(token));
  }, [dispatch, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(addReservation(reservation));
      setTimeout(() => {
        setReservation({
          start_date: '',
          end_date: '',
          city: '',
          user_id: data.user.data.id,
          motorcycle_id: '',
        });
      }, 3000);
    } catch (error) {
      toast.success('Failed to add reservation. Please try again later.');
    }
  };

  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Philadelphia',
  ];

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="start_date">
        Start Date:
        <input
          type="date"
          name="start_date"
          id="start_date"
          value={reservation.start_date}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="end_date">
        End Date:
        <input
          type="date"
          name="end_date"
          id="end_date"
          value={reservation.end_date}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="city">
        City:
        <select
          name="city"
          id="city"
          value={reservation.city}
          onChange={handleChange}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="motorcycle_id">
        Motorcycle:
        <select
          name="motorcycle_id"
          id="motorcycle_id"
          value={reservation.motorcycle_id}
          onChange={handleChange}
        >
          <option value="">Select a motorcycle</option>
          {Array.isArray(motorcycle.motorcycle) &&
            motorcycle.motorcycle.map((motor) => (
              <option key={motor.id} value={motor.id}>
                {motor.name}
              </option>
            ))}
        </select>
      </label>
      <button type="submit" disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving...' : 'Add Reservation'}
      </button>
    </form>
  );
}

export default AddReservation;
