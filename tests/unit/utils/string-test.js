import { test } from 'ember-qunit';
import toCamel from 'ember-gestures/utils/string/dasherized-to-camel';
import capitalize from 'ember-gestures/utils/string/capitalize-word';
import uncapitalize from 'ember-gestures/utils/string/uncapitalize-word';
import stripWhiteSpace from 'ember-gestures/utils/string/strip-whitespace';
import capitalizeWords from 'ember-gestures/utils/string/capitalize-words';
import dashToWords from 'ember-gestures/utils/string/dasherized-to-words';

test('toCamel: properly camelizes basic string', function(assert) {
  assert.equal(toCamel('FooBar'), 'fooBar');
});

test('toCamel: properly capitalizes sequences of words', function(assert) {
  assert.equal(toCamel('Foo bar Baz Quux'), 'fooBarBazQuux');
});

test('capitalize: capitalizes the first character of a string', function(assert) {
  assert.equal(capitalize('foobar'), 'Foobar');
});

test('uncapitalize: uncapitalizes the first character of a string', function(assert) {
  assert.equal(uncapitalize('Foobar'), 'foobar');
});

test('uncapitalize: is a noop when first character needs no work done', function(assert) {
  assert.equal(uncapitalize('foobar'), 'foobar');
});

test('stripWhitespace: removes whitespace from string', function(assert) {
  assert.equal(stripWhiteSpace('foo bar'), 'foobar');
});

test('capitalizeWords: capitalizes each string in given sequence', function(assert) {
  assert.equal(capitalizeWords('foo bar baz quux'), 'Foo Bar Baz Quux');
});

test('dashToWords: takes dasherized string and splits to sequence', function(assert) {
  assert.equal(dashToWords('foo-bar-baz'), 'foo bar baz');
});
