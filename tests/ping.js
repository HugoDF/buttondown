import test from 'ava';
import nock from 'nock';
import buttondown from '../dist/main.js';
buttondown.setApiKey('super-secret-api-key');

const pingResponse = {};
nock.disableNetConnect();

const nockOptions = {
  reqheaders: {
    Authorization: 'Token super-secret-api-key'
  }
};

test('ping() - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/ping')
    .reply(200, pingResponse);

  t.deepEqual(await buttondown.ping(), pingResponse);
});

test('ping() - 401 - error', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/ping')
    .reply(401, pingResponse);

  const error = await t.throwsAsync(async () => {
    await buttondown.ping();
  });
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/ping');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});
