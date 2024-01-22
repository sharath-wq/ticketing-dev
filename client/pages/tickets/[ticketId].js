import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/router';

const TicketShow = ({ ticket }) => {
    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) => {
            console.log(order);
            router.push(`/orders/${order.id}`);
        },
    });

    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-md shadow-lg'>
            <h1 className='text-3xl font-bold mb-4'>{ticket.title}</h1>
            <p className='text-gray-600 mb-4'>Price: ${ticket.price.toFixed(2)}</p>
            {errors && <div className='text-red-500 mb-4'>{errors}</div>}
            <button
                onClick={() => doRequest()}
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
            >
                Buy Now
            </button>
        </div>
    );
};

TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);
    return { ticket: data };
};

export default TicketShow;
