import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            return response.data;
        } catch (error) {
            setErrors(
                <div
                    className='mb-4 flex flex-col items-start rounded-lg bg-red-100 p-4 text-sm text-red-800 gap-1'
                    role='alert'
                >
                    <span className='font-medium text-3xl'>Oops!</span>
                    <ul className=''>
                        {error.response.data.errors.map((err) => (
                            <li key={err.field}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};
