export const DISMISS_ALERT = 'DISMISS_ALERT';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const dismiss = alert => {
    return {
        type: DISMISS_ALERT,
        alert
    };
};

