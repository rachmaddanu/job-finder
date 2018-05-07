import axios from 'axios';
import { Location } from 'expo';
import qs from 'qs';

import {
    FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    co: 'ID',
    latlong: '1',
    radius: '30'
};

//TODO
//Terima Region
//Fetcg indeed API berdasarkan API
//Return action dengan payload data dari fetch API

const buildJobsUrl = (location, keyword) => {
    const region = location.region === 'Daerah Khusus Ibukota Jakarta' ? 'jakarta' : location.region;
    const params = qs.stringify({ 
        ...JOB_QUERY_PARAMS, 
        l: `${location.city}, ${region}`,
        q: keyword 
    });
    return JOB_ROOT_URL + params;
};

export const fetchJobs = (region, keyword, callback) => {
    return async (dispatch) => {
        try {
            const location = (await Location.reverseGeocodeAsync(region))[0];
            const url = buildJobsUrl(location, keyword);
            const response = await axios.get(url);

            dispatch({
                type: FETCH_JOBS,
                payload: response.data
            });

            callback();
        } catch (error) {
            console.log(error);
        }
    };
};

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    };
};

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    };
};