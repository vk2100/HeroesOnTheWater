
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';
import 'ionic-sdk/release/css/ionic.css';

import { Meteor } from 'meteor/meteor';

import webTemplate from './web.html';
import mobileTemplate from './mobile.html';
import { name as PartiesList } from '../../party_components/partiesList/partiesList';
import { name as PartyDetails } from '../../party_components/partyDetails/partyDetails';
import { name as Navigation } from '../navigation/navigation';
import { name as Auth } from '../auth/auth';

class Splash {}

const name = 'splash';
const template = Meteor.isCordova ? mobileTemplate : webTemplate;

// create a module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  ngSanitize,
  uiRouter,
  PartiesList,
  PartyDetails,
  Navigation,
  Auth,
  'accounts.ui',
  'ionic'
]).component(name, {
  template,
  controllerAs: name,
  controller: Splash
})
  .config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  //$urlRouterProvider.otherwise('/parties');

  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

  $mdIconProvider
    .iconSet('social',
      iconPath + 'svg-sprite-social.svg')
    .iconSet('action',
      iconPath + 'svg-sprite-action.svg')
    .iconSet('communication',
      iconPath + 'svg-sprite-communication.svg')
    .iconSet('content',
      iconPath + 'svg-sprite-content.svg')
    .iconSet('toggle',
      iconPath + 'svg-sprite-toggle.svg')
    .iconSet('navigation',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('image',
      iconPath + 'svg-sprite-image.svg');
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('splash');
      }
    }
  );
}