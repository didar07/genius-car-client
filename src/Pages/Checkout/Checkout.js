import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData()
    const { user } = useContext(AuthContext)
    console.log(_id)
    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        // if (phone.length > 10) {
        //     alert('Phone number should be 10 characters or longer')
        // }
        // else {

        // }

        fetch('https://genius-car-server-plum.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order placed successfully')
                    form.reset();

                }
            })
            .catch(er => console.error(er));

    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-center font-bold text-orange-500 text-4xl">You are order about to: {title}</h2>
                <h2 className="mt-3 text-center font-semibold text-orange-500 text-3xl">price: ${price}</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full" required />
                    <input name='email' type="text" defaultValue={user?.email} readOnly placeholder="Your Email" className="input input-bordered w-full" />
                </div>
                <textarea name='message' className="textarea textarea-bordered mt-3 mb-3 w-full h-24" placeholder="your message"></textarea>
                <input type="submit" className='btn' value="place ypur order" />
            </form>
        </div>
    );
};

export default Checkout;