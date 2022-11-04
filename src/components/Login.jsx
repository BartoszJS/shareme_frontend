import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client.js';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response));
    const { clientId, name, imageUrl } = response;
    const doc = {
      _id: clientId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <GoogleOAuthProvider clientId='1089588734091-9efri9aus1jn2jaulj036ncpe4nj9skk.apps.googleusercontent.com'>
      <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            type='video/mp4'
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5 '>
              <img src={logo} width='130px' alt='logo' />
            </div>

            <div className='shadow-2xl'>
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    className='bg-mainColor'
                    type='button'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  ></button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy='single_host_origin'
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
