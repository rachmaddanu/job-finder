import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';


import {
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likedJobs || INITIAL_STATE;
        case LIKE_JOB:
            const newArray = _.uniqBy([
                ...state, action.payload
            ], 'jobkey');
            const message = newArray.length === state.length
                                ? 'Job already liked'
                                : 'Job has been saved';

            alert(message);
            return newArray;
        case CLEAR_LIKED_JOBS:
            alert('Review Cleared');
            return INITIAL_STATE;

        default:
            return state;
    }
};