import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const CheckOut = () => {
    const service = useLoaderData();
    const{title, _id, price, img} = service;
    const {user} = useContext(AuthContext);

    const handleBookService = (event) => {
        event.preventDefault(); // Prevents the default form submission action
        const form = event.target; // This correctly gets the form element
        // const name = form.name.value;
        const price = form.price.value;
        const contact = form.contact.value;
        const email = user?.email;
        const date = form.date.value;
        const deldate = form.delivery.value;
    
        const order = {
            // customerName: name,
            email,
            img,
            price: price,
            contact,
            date,
            deldate,
            service: title,
            service_id: _id,
        };
    
        console.log(order);

        // fetch('http://localhost:5000/bookings', {
        //     method: 'POST',
        //     headers:{
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(booking)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        // })

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
        
    };
    

    return (
        <div>
            <h2 className="text-3xl">Service: {title}</h2>

<form onSubmit={handleBookService} className="card-body">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="form-control">
    <label className="label">
        <span className="label-text">Name</span>
    </label>
    <input type="text" defaultValue={user?.displayName} placeholder="Enter your Name" name="name" className="input input-bordered" required />
    </div>
    <div className="form-control">
    <label className="label">
        <span className="label-text">Price</span>
    </label>
    <input type="text" defaultValue={'$'+price} name="price" className="input input-bordered" required />
    </div>
    <div className="form-control">
    <label className="label">
        <span className="label-text">Contact Number</span>
    </label>
    <input type="text" placeholder="Enter your Contact Number" name="contact" className="input input-bordered" required />
    </div>
    <div className="form-control">
    <label className="label">
        <span className="label-text">Email</span>
    </label>
    <input type="gmail" defaultValue={user?.email} placeholder="afran@gmail.com" name="email" className="input input-bordered" required />
    </div>
    <div className="form-control">
    <label className="label">
        <span className="label-text">Date</span>
    </label>
    <input type="date" name="date" className="input input-bordered" required />
    </div>
    <div className="form-control">
    <label className="label">
        <span className="label-text">date for delivery</span>
    </label>
    <input type="date" name="delivery" className="input input-bordered" required />
    </div>
    </div>
    <div className="form-control mt-6">
    <button className="btn btn-outline btn-success">Submit</button>

    </div>
</form>
        </div>
    );
};

export default CheckOut;