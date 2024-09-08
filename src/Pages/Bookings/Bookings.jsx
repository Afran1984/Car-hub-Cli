// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";

// const Bookings = () => {
//     const {user} = useContext(AuthContext);
//     const [bookings, setBookings] = useState([]);

//     const url = `http://localhost:5000/bookings?email=${user?.email}`;
//     useEffect( () =>{
//         fetch(url)
//         .then(res => res.json())
//         .then(data => console.log(data))
//     }, [])
//     return (
//         <div>
//             <h2>Booking: {bookings.length}</h2>
//         </div>
//     );
// };

// export default Bookings;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingsRow from "./BookingsRow";
import Swal from 'sweetalert2'
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    
    useEffect(() => {
      if (user?.email) {
        axios.get(url, { withCredentials: true })
            .then(res => {
                setBookings(res.data); // Update the bookings state with the fetched data
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }
}, [url, user?.email]); // Added user?.email to the dependency array to avoid unnecessary fetches if the user changes

    const handleDelete = id => {
      const proceed = confirm('Are you delete Sure?');
      if(proceed){
        fetch(`http://localhost:5000/bookings/${id}`,{
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
          console.log(data);
          if(data.deletedCount > 0){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            const remining = bookings.filter(booking => booking._id !== id);
            setBookings(remining);
          }
        })
      }
    }
    const handleConfirm = id =>{
      fetch(`http://localhost:5000/bookings/${id}`,{
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'confirm'})
      })
      .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount > 0){
        // Update Status
        const remining = bookings.filter(booking => booking._id !== id);
        const updated = bookings.filter(booking => booking._id ===id);
        updated.status = 'confirm'
        const newBooking = [updated, ...remining];
        setBookings(newBooking);
      }
    })

    }

    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
        </th>
        <th>Image</th>
        <th></th>
        <th>Gmail</th>
        <th>Price</th>
        <th>Date</th>
        <th>Service</th>
        <th>Contact</th>
        <th>Stutas</th>
      </tr>
    </thead>
    <tbody>
      {
        bookings.map(booking =><BookingsRow 
        
            key={booking._id}
            booking={booking}
            handleDelete = {handleDelete}
            handleConfirm={handleConfirm}
        >
            
        </BookingsRow> )
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Bookings;
