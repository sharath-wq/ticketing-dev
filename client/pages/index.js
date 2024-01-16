import buildClient from '@/api/build-client';

const LandingPage = ({ currentUser }) => {
    return currentUser ? (
        <h1 className='text-2xl text-green-600'>You are signed in</h1>
    ) : (
        <h1 className='text-2xl text-red-600'>You are not singed in</h1>
    );
};

LandingPage.getInitialProps = async (context) => {
    // if type of window id undefined we are on server else we are on client
    console.log('LANDING PAGE');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;
