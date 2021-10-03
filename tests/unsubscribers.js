/**
 * Unsubscribers failure/error scenarios
 *
 * Happy paths for List/Get tested
 * in E2E suite smoke.js.
 */

import test from 'ava';
import nock from 'nock';
import buttondown from '../dist/main.js';
buttondown.setApiKey('super-secret-api-key');

nock.disableNetConnect();

const nockOptions = {
  reqheaders: {
    Authorization: 'Token super-secret-api-key'
  }
};

test('unsubscribers.list() - 401 - error', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/unsubscribers')
    .query({
      page: 1
    })
    .reply(401, {});

  const error = await t.throwsAsync(async () => {
    await buttondown.unsubscribers.list();
  });
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/unsubscribers');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
  t.deepEqual(error.query, {page: 1});
});

test('unsubscribers.get() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.unsubscribers.get();
  });

  t.is(error.message, 'buttondown.unsubscribers.get() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('unsubscribers.get() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/unsubscribers/subscriber-id')
    .reply(404, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.unsubscribers.get('subscriber-id');
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(
    error.url,
    'https://api.buttondown.email/v1/unsubscribers/subscriber-id'
  );
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});
