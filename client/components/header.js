import Link from 'next/link';

export default ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sing Up', href: '/auth/signup' },
        !currentUser && { label: 'Sing In', href: '/auth/signin' },
        currentUser && { label: 'Sing Out', href: '/auth/signout' },
    ]
        .filter((linkConfig) => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href}>
                    <Link href={href}>{label}</Link>
                </li>
            );
        });

    return (
        <nav className='bg-green-50 px-5 flex justify-between py-4'>
            <Link className='font-bold text-xl' href='/'>
                Ticketing
            </Link>

            <div className='flex justify-end'>
                <ul className='flex items-center gap-5'>{links}</ul>
            </div>
        </nav>
    );
};
