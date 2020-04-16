/**
 * Tests Client class for 5xx errors
 * We need to use the class instead of the singleton in order
 * to inject a Got client with no retries.
 * See https://github.com/nock/nock#common-issues
 */

import test from 'ava';
import nock from 'nock';
import got from 'got';
import pkg from '../package.json';
import {Client} from '../dist/main';

const gotNoRetries = got.extend({retry: 0});
const client = new Client(gotNoRetries);
client.setApiKey('super-secret-api-key');

nock.disableNetConnect();

const nockOptions = {
  reqheaders: {
    Authorization: 'Token super-secret-api-key',
    'User-Agent': `buttondown/${pkg.version};nodejs`
  }
};

test("client.request('GET', ...) - 500", async (t) => {
  const query = {page: 1};
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/drafts')
    .query(query)
    .reply(500, {});
  const error = await t.throwsAsync(async () => {
    await client.request('GET', 'drafts', {query});
  });
  t.is(error.message, 'Response code 500 (Internal Server Error)');
  t.is(error.url, 'https://api.buttondown.email/v1/drafts');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
  t.deepEqual(error.query, query);
});

test("client.request('POST', ...) - 502", async (t) => {
  const payload = {
    subject: 'draft-subject',
    body: 'draft-body'
  };
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/drafts', payload)
    .reply(502, {});

  const error = await t.throwsAsync(async () => {
    await client.request('POST', 'drafts', {payload});
  });
  t.is(error.message, 'Response code 502 (Bad Gateway)');
  t.is(error.url, 'https://api.buttondown.email/v1/drafts');
  t.is(error.method, 'POST');
  t.is(error.payload, payload);
  t.deepEqual(error.query, {});
});

test("client.request('GET', resource, { resourcePath: 'my-id' }) - 503", async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/drafts/my-id')
    .reply(503, {});

  const error = await t.throwsAsync(async () => {
    await client.request('GET', 'drafts', {resourcePath: 'my-id'});
  });
  t.is(error.message, 'Response code 503 (Service Unavailable)');
  t.is(error.url, 'https://api.buttondown.email/v1/drafts/my-id');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
  t.deepEqual(error.query, {});
});
