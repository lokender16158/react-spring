export const BASE_API = "http://localhost:8080/api";

export const FETCH_ALL_API = "/getApps";
export const getAllApisUri = () => BASE_API + FETCH_ALL_API;

export const FETCH_SINGLE_API = "/getApp";
export const getSingleAppUri = (appId) => BASE_API + FETCH_ALL_API + "?appId=" + appId;

export const DELETE_APP_API = "/deleteApp";
export const getDeleteAppUri = (appId) => BASE_API + DELETE_APP_API + "?appId=" + appId;

export const UPDATE_API = "/updateApp";
export const getUpdateAppUri = (appId) => BASE_API + UPDATE_API;

export const APP_API = "/addApp";
export const getAddAppUri = (appId) => BASE_API + APP_API;
