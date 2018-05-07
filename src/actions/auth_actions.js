import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo'; 
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL } from './types';

export const facebookLogin = () => {
    return async (dispatch) => {
    const token = await AsyncStorage.getItem('fb_token');   

       if (token) {
            //go to main screen
            dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
        } else {
            //do facebook login - jika token kosong
            doFacebookLogin(dispatch);
        }       
    };
};

const doFacebookLogin = async (dispatch) => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '180178445893788',
        {
            permissions: ['public_profile']
        } 
    );

    if (type === 'cancel') {
        return dispatch({
            type: FB_LOGIN_FAIL
        });
    }

    await AsyncStorage.setItem('fb_token', token);

    dispatch({
        type: FB_LOGIN_SUCCESS,
        payload: token
    });
};