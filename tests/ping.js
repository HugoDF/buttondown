import test from 'ava';
import nock from 'nock';
import buttondown from '../dist/main';
buttondown.setApiKey('super-secret-api-key');

const pingResponse = {};
nock.disableNetConnect();

test('ping() - 200', async (t) => {
  nock('https://api.buttondown.email').get('/v1/ping').reply(200, pingResponse);

  t.deepEqual(await buttondown.ping(), pingResponse);
});

test('ping() - 401 - error', async (t) => {
  nock('https://api.buttondown.email').get('/v1/ping').reply(401, pingResponse);

  const error = await t.throwsAsync(buttondown.ping);
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/ping');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});

// @todo: tests for 5xx, do them by injecting a Got client with no retries,
// see https://github.com/nock/nock#common-issues
