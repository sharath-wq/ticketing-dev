import '@/styles/globals.css';
import buildClient from '@/api/build-client';
import Header from '@/components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div className='px-24'>
            <Header currentUser={currentUser} />
            <Component {...pageProps} currentUser={currentUser} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data,
    };
};

export default AppComponent;
