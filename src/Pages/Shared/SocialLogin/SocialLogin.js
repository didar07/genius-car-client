import React, { useContext } from 'react';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                console.log(user)
                setAuthToken(user)
            })
            .catch(err => console.error(err))
    }
    return (
        <div>
            <p className='text-center'>social login</p>
            <p className='text-center'><button onClick={handleGoogleSignIn} className='btn btn-ghost'>google</button></p>
        </div>
    );
};

export default SocialLogin;