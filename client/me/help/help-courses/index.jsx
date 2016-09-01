/**
 * External dependencies
 */
import { connect } from 'react-redux';
import i18n, { localize } from 'i18n-calypso';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import Courses from './courses';
import {
	getUserPurchases,
	isFetchingUserPurchases,
	hasLoadedUserPurchasesFromServer
} from 'state/purchases/selectors';
import { getCurrentUserId } from 'state/current-user/selectors';
import { PLAN_BUSINESS } from 'lib/plans/constants';

function getCourses() {
	return [
		{
			title: i18n.translate( 'How to Make a Business Site on WordPress.com' ),
			description: i18n.translate(
				'A 60-minute overview course with two of our Happiness Engineers. In this live group session, ' +
				'we will provide an overview of WordPress.com, discuss features of the WordPress.com Business ' +
				'plan, provide a basic setup overview to help you get started with your site, and show you ' +
				'where to find additional resources and help in the future.'
			),
			schedule: [
				{
					date: i18n.moment( new Date( 'Tue, 6 Sep 2016 15:00:00 +0000' ) ),
					registrationUrl: 'https://zoom.us/webinar/register/7b4295069e316cb28c34be5db4a05ad8'
				},
				{
					date: i18n.moment( new Date( 'Mon, 12 Sep 2016 21:00:00 +0000' ) ),
					registrationUrl: 'https://zoom.us/webinar/register/08c4eff0906b1da4d746f627e8486654'
				},
				{
					date: i18n.moment( new Date( 'Fri, 23 Sep 2016 18:00:00 +0000' ) ),
					registrationUrl: 'https://zoom.us/webinar/register/732df6652d490ab0dc2040ba88984b7b'
				},
			],
			videos: [
				{
					date: i18n.moment( new Date( 'Thu, 25 Aug 2016 01:00:00 +0000' ) ),
					title: i18n.translate( 'How to Make a Business Site on WordPress.com' ),
					description: i18n.translate(
						'A 60-minute overview course with two of our Happiness Engineers. In this live group session, ' +
						'we will provide an overview of WordPress.com, discuss features of the WordPress.com Business ' +
						'plan, provide a basic setup overview to help you get started with your site, and show you ' +
						'where to find additional resources and help in the future.'
					),
					youtubeId: 'f44-4TgnWTs'
				}
			]
		}
	];
}

function mapStateToProps( state ) {
	const userId = getCurrentUserId( state );
	const purchases = getUserPurchases( state, userId );
	const isBusinessPlanUser = purchases && !! find( purchases, purchase => purchase.productSlug === PLAN_BUSINESS );
	const isLoading = isFetchingUserPurchases( state ) || ! hasLoadedUserPurchasesFromServer( state );
	const courses = getCourses();

	//TODO: Add tracks pings

	return {
		isLoading,
		isBusinessPlanUser,
		userId,
		courses
	};
}

export default connect( mapStateToProps )( localize( Courses ) );