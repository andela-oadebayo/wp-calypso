/**
 * Internal dependencies
 */
import { USER_RECEIVE } from 'state/action-types';

function mockApiFetch( userId ) {
	return new Promise( ( resolve, reject ) => {
		resolve( {
			ID: userId,
			name: 'your name',
			avatar_URL: ''
		} );
	} );
}

/**
 * Returns an action object to be used in signalling that a user object has
 * been received.
 *
 * @param  {Object} user User received
 * @return {Object}      Action object
 */
export function receiveUser( user ) {
	return {
		type: USER_RECEIVE,
		user
	};
}

export function fetchUser( userId ) {
	return function( dispatch ) {
		const fetch = mockApiFetch( userId );
		return fetch.then( response => {
			dispatch(
				receiveUser( response )
			);
		} );
	};
}
