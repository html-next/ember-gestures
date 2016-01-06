import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /index, ensures we hooked everything up appropriately', function(assert) {
  visit('/');

  andThen(function() {
    let manualLink = find('li a:contains(A manual link)');
    let expectedStyleManualLink = manualLink[0].attributes.style.value;
    assert.equal(expectedStyleManualLink, 'touch-action: manipulation; -ms-touch-action: manipulation;');

    let generatedLink = find('li a:contains(A generated link)');
    let expectedGeneratedLink = generatedLink[0].attributes.style.value;
    assert.equal(expectedGeneratedLink, 'touch-action: manipulation; -ms-touch-action: manipulation;');

    assert.equal(currentURL(), '/');
  });
});
