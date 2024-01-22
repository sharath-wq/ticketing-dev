import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
    const ticketList = tickets.map((ticket) => {
        return (
            <tr key={ticket.id} className='border-b'>
                <td className='py-2 px-4'>{ticket.title}</td>
                <td className='py-2 px-4'>${ticket.price.toFixed(2)}</td>
                <td className='py-2 px-4'>
                    <Link href={`/tickets/${ticket.id}`}>view</Link>
                </td>
            </tr>
        );
    });
    return (
        <div className='container mx-auto mt-8'>
            <h1 className='text-3xl font-bold mb-4'>Tickets</h1>
            <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                    <tr>
                        <th className='py-3 px-4 bg-gray-100 border-b'>Title</th>
                        <th className='py-3 px-4 bg-gray-100 border-b'>Price</th>
                        <th className='py-3 px-4 bg-gray-100 border-b'>Link</th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
};

export default LandingPage;
