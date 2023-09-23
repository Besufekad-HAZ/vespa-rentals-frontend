import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations } from '../../redux/reservationActions';

const Reservations = () => {
  const reservations = useSelector((state) => state.reservation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div>
      <h1>Reservations</h1>
      {reservations.loading && <p>Loading...</p>}
      {reservations.error && (
        <>
          <p>Error:</p>
          <p>{reservations.error}</p>
        </>
      )}
      {!reservations.loading && !reservations.error && (
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>City</th>
              <th>Motorcycle</th>
            </tr>
          </thead>
          <tbody>
            {reservations.reservations &&
              reservations.reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.start_date}</td>
                  <td>{reservation.end_date}</td>
                  <td>{reservation.city}</td>
                  <td>{reservation.motorcycle.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reservations;
