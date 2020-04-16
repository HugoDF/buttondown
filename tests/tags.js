/**
 * Tags failure/error scenarios
 *
 * Happy paths for List/Get/Remove tested
 * by [E2E suite](./e2e) smoke and tags tests.
 */
import test from 'ava';
import nock from 'nock';
import buttondown from '../dist/main';
buttondown.setApiKey('super-secret-api-key');

nock.disableNetConnect();

const nockOptions = {
  reqheaders: {
    Authorization: 'Token super-secret-api-key'
  }
};

test('tags.create() - missing name', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.create({});
  });
  t.is(error.message, 'buttondown.tags.create() - name is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('tags.create() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/tags', { name: 'tag' })
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.create({ name: 'tag' });
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/tags');
  t.is(error.method, 'POST');
  t.deepEqual(error.payload, {
    name: 'tag'
  });
});

test('tags.get() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.get();
  });

  t.is(error.message, 'buttondown.tags.get() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('tags.get() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/tags/tag-id')
    .reply(404, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.get('tag-id');
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/tags/tag-id');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});

test('tags.put() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.put();
  });

  t.is(error.message, 'buttondown.tags.put() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('tags.put() - missing name', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.put('tag-id', {});
  });
  t.is(error.message, 'buttondown.tags.put() - name is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('tags.patch() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.patch();
  });

  t.is(error.message, 'buttondown.tags.patch() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('tags.patch() - empty payload', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.patch('tag-id', {});
  });
  t.is(
    error.message,
    "buttondown.tags.patch() - can't patch tag to {}"
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('tags.delete() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.remove(null, {name: 'tag-name'});
  });
  t.is(error.message, 'buttondown.tags.remove() - id is required');
});

test('tags.delete() - missing name in query', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.remove('tag-id', {});
  });
  t.is(error.message, 'buttondown.tags.remove() - name is required');
});

test('tags.delete() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .delete('/v1/tags/tag-id')
    .query({
      name: 'tag-name'
    })
    .reply(404, {});

  const error = await t.throwsAsync(async () => {
    await buttondown.tags.remove('tag-id', {
      name: 'tag-name'
    });
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/tags/tag-id');
  t.is(error.method, 'DELETE');
  t.deepEqual(error.query, {name: 'tag-name'});
  t.is(error.payload, undefined);
});
