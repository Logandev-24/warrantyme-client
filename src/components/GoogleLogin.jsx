import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = ({ onSuccess, onFailure }) => {

    const ClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={ClientID}>
      <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
