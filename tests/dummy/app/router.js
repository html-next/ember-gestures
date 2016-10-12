import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

const appRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

appRouter.map(function() {
  this.route('taps');
});

export default appRouter;
