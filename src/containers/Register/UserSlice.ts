import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {registerUser, IUser} from "./RegisterApi";
import {logInUser} from "../Login/LoginApi";
import jwt_decode from "jwt-decode";
import {resetAppState} from "../Dashboard/AppSlice";
import {resetNodeList} from "../NodeList/NodeListSlice";
import {fetchUserEmail} from "../../app/Api";

const loadValidToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const jwt: {id: number; iat: number; exp: number} = jwt_decode(token);
            if (jwt.exp > Date.now() / 1000) {
                return token;
            }
        } catch (e) {
            localStorage.clear();
        }

        return null;
    } else return null;
};

interface IUserState {
    isLoading: boolean;
    registerSuccessValue: boolean;
    registerErrorValue: string | null;
    loginSuccessValue: boolean;
    loginErrorValue: string | null;
    token: string | null;
    email: string | null;
}

const initialState: IUserState = {
    isLoading: false,
    registerSuccessValue: false,
    registerErrorValue: null,
    loginSuccessValue: false,
    loginErrorValue: null,
    token: loadValidToken(),
    email: null,
};

const userSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        resetUserState: (): IUserState => ({
            ...initialState,
            token: null,
        }),
        registerStart(state: IUserState): void {
            state.isLoading = true;
        },
        registerSuccess(state: IUserState): void {
            state.isLoading = false;
            state.registerErrorValue = null;
            state.registerSuccessValue = true;
        },
        registerError(state: IUserState, action: PayloadAction<string>): void {
            state.isLoading = false;
            state.registerErrorValue = action.payload;
        },

        loginStart(state: IUserState): void {
            state.isLoading = true;
        },
        loginSuccess(state: IUserState, action: PayloadAction<string>): void {
            state.isLoading = false;
            state.loginSuccessValue = true;
            state.loginErrorValue = null;
            state.token = action.payload;
        },
        loginError(state: IUserState, action: PayloadAction<string>): void {
            state.isLoading = false;
            state.loginErrorValue = action.payload;
        },
        saveEmail(state: IUserState, action: PayloadAction<string>): void {
            state.email = action.payload;
        },
    },
});

export const {
    resetUserState,
    registerStart,
    registerSuccess,
    registerError,
    loginStart,
    loginSuccess,
    loginError,
    saveEmail,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

export const logOutUser = (): AppThunk => (dispatch): void => {
    localStorage.clear();
    dispatch(resetUserState());
    dispatch(resetAppState());
    dispatch(resetNodeList());
};

export const submitUserRegistration = (data: IUser): AppThunk => async (dispatch): Promise<void> => {
    try {
        dispatch(registerStart());
        const {email, password} = data;
        const response = await registerUser(email, password);
        if (response.status === 201) dispatch(registerSuccess());
        else {
            const responseText = JSON.parse(response.request.responseText);
            dispatch(registerError(responseText.error));
        }
    } catch (err) {
        dispatch(registerError(err.toString()));
    }
};

export const submitUserLogin = (data: IUser): AppThunk => async (dispatch): Promise<void> => {
    try {
        dispatch(loginStart());
        const {email, password} = data;
        const response: any = await logInUser(email, password);
        if (response.status === 200) {
            dispatch(loginSuccess(response.data.token));
            localStorage.setItem("token", response.data.token);
        } else {
            const responseText = JSON.parse(response.request.responseText);
            dispatch(loginError(responseText.error));
        }
    } catch (err) {
        dispatch(loginError(err.toString()));
    }
};

export const getUserEmail = (): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await fetchUserEmail(token);
        if (response.data) {
            dispatch(saveEmail(response.data.email));
        }
    } catch (err) {
        throw err;
    }
};
