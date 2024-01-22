import { useState } from 'react';
import useRequest from '@/hooks/use-request';
import Router from 'next/router';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price,
        },
        onSuccess: () => Router.push('/'),
    });

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        doRequest();
    };

    return (
        <div className='w-full mt-32 flex justify-center items-center flex-col gap-10'>
            <h1 className='text-4xl text-bold text-black'>Create Ticket</h1>
            <form onSubmit={handleSubmit} className=''>
                <div className='w-full flex flex-col gap-2'>
                    <label className='text-2xl font-medium'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-black border px-4 py-2 rounded-sm outline-none'
                        type='text'
                    />
                </div>
                <div className='w-full flex flex-col gap-2 mt-3'>
                    <label className='text-2xl font-medium'>Price</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        onBlur={onBlur}
                        className='border-black border px-4 py-2 rounded-sm outline-none'
                        type='text'
                    />
                </div>
                {errors}
                <button type='submit' className='mt-5 w-full bg-blue-600 py-2.5  text-white'>
                    Create Ticket
                </button>
            </form>
        </div>
    );
};

export default NewTicket;
