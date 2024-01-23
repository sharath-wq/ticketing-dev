import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
    return (
        <div className='flex gap-5'>
            {tickets.map((ticket) => (
                <div class='w-1/6 mt-5 rounded-lg border border-gray-200 bg-white t p-6 shadow '>
                    <a href='#'>
                        <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>{ticket.title}</h5>
                    </a>
                    <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>{ticket.price}</p>
                    <Link
                        href={`/tickets/${ticket.id}`}
                        class='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                    >
                        Buy Now
                    </Link>
                </div>
            ))}
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
};

export default LandingPage;
