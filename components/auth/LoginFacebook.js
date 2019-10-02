import Link from 'next/link';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { loginWithFacebook, authenticate, isAuth } from '../../actions/auth';
import { FB_APP_ID } from '../../config';

const LoginFacebook = () => {
    const responseFacebook = response => {
        // console.log(response); // {access_token, email, id, userID, name, signed_request}

        loginWithFacebook(response).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // console.log('repsonse on fb login', data);
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    };

    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`${FB_APP_ID}`}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="btn btn-primary"
                icon="fa-facebook"
            />
        </div>
    );
};

export default LoginFacebook;
