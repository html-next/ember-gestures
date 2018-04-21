import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fast-action', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
      assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{fast-action}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#fast-action}}
        template block text
      {{/fast-action}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
