import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

const { merge, run, assign } = Ember;
const attrMerge = assign || merge;

export default function startApp(attrs) {
  let application;

  let attributes = attrMerge({}, config.APP);
  attributes = attrMerge(attributes, attrs); // use defaults, but you can override;

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
