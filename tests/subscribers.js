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

const subscribersListPage1 = [
  {
    creation_date: '2020-04',
    id: 'some-id',
    metadata: {},
    secondary_id: 1,
    subscriber_type: 'regular',
    source: 'string',
    tags: ['tag1', 'tag2'],
    utm_campaign: 'utm_campaign',
    utm_medium: 'utm_campaign',
    utm_source: 'utm_campaign'
  }
];

const subscribersListPage1Response = {
  results: subscribersListPage1,
  count: 1
};

test('subscribers.list() - no page - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 1
    })
    .reply(200, subscribersListPage1Response);

  t.deepEqual(await buttondown.subscribers.list(), subscribersListPage1);
});

test('subscribers.list() - page 1 - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 1
    })
    .reply(200, subscribersListPage1Response);
  t.deepEqual(await buttondown.subscribers.list(1), subscribersListPage1);
});

test('subscribers.list() - page 2 - 200', async (t) => {
  const subscribersListPage2 = [
    {
      creation_date: '2020-04',
      id: 'page-2-id',
      metadata: {},
      secondary_id: 1,
      subscriber_type: 'regular',
      source: 'string',
      tags: ['tag1', 'tag2'],
      utm_campaign: 'utm_campaign',
      utm_medium: 'utm_campaign',
      utm_source: 'utm_campaign'
    }
  ];
  const subscribersListPage2Response = {
    results: subscribersListPage2,
    count: 1
  };
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 2
    })
    .reply(200, subscribersListPage2Response);
  t.deepEqual(await buttondown.subscribers.list(2), subscribersListPage2);
});

test('subscribers.list() - query params filtering - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 1,
      email: 'justin@buttondown.email'
    })
    .reply(200, subscribersListPage1Response);
  t.deepEqual(
    await buttondown.subscribers.list(1, {email: 'justin@buttondown.email'}),
    subscribersListPage1
  );
});

test('subscribers.list() - 401 - error', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 1
    })
    .reply(401, subscribersListPage1);

  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.list();
  });
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/subscribers');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
  t.deepEqual(error.query, {page: 1});
});

const subscriberCreate = {
  email: 'email'
};

test('subscribers.create() - 200', async (t) => {
  const subscriberCreateResponse = {
    creation_date: '2020-04',
    id: 'some-id',
    metadata: {},
    secondary_id: 1,
    subscriber_type: 'regular',
    source: 'string',
    tags: ['tag1', 'tag2'],
    utm_campaign: 'utm_campaign',
    utm_medium: 'utm_campaign',
    utm_source: 'utm_campaign'
  };
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/subscribers', subscriberCreate)
    .reply(200, subscriberCreateResponse);
  t.deepEqual(
    await buttondown.subscribers.create(subscriberCreate),
    subscriberCreateResponse
  );
});

test('subscribers.create() - missing email', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.create({});
  });
  t.is(error.message, 'buttondown.subscribers.create() - email is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('subscribers.create() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/subscribers', subscriberCreate)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.create(subscriberCreate);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/subscribers');
  t.is(error.method, 'POST');
  t.is(error.payload, subscriberCreate);
});

test('subscribers.get() - 200', async (t) => {
  const subscriberGetResponse = {
    creation_date: '2020-04',
    email: 'hugo+test@codewithhugo.com',
    id: 'some-id',
    metadata: {},
    secondary_id: 1,
    subscriber_type: 'regular',
    source: 'api',
    tags: ['tag1', 'tag2'],
    utm_campaign: 'utm_campaign',
    utm_medium: 'utm_campaign',
    utm_source: 'utm_campaign'
  };
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers/subscriber-id')
    .reply(200, subscriberGetResponse);
  t.deepEqual(
    await buttondown.subscribers.get('subscriber-id'),
    subscriberGetResponse
  );
});

test('subscribers.get() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.get();
  });

  t.is(error.message, 'buttondown.subscribers.get() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('subscribers.get() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers/subscriber-id')
    .reply(404, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.get('subscriber-id');
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/subscribers/subscriber-id');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});

const subscriberPut = {
  ...subscriberCreate
};

test('subscribers.put() - 200', async (t) => {
  const subscriberPutResponse = {
    creation_date: '2020-04',
    id: 'some-id',
    metadata: {},
    secondary_id: 1,
    subscriber_type: 'regular',
    source: 'string',
    tags: ['tag1', 'tag2'],
    utm_campaign: 'utm_campaign',
    utm_medium: 'utm_campaign',
    utm_source: 'utm_campaign'
  };
  nock('https://api.buttondown.email', nockOptions)
    .put('/v1/subscribers/subscriber-id', subscriberPut)
    .reply(200, subscriberPutResponse);
  t.deepEqual(
    await buttondown.subscribers.put('subscriber-id', subscriberPut),
    subscriberPutResponse
  );
});

test('subscribers.put() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.put();
  });

  t.is(error.message, 'buttondown.subscribers.put() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('subscribers.put() - missing email', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.put('subscriber-id', {});
  });
  t.is(error.message, 'buttondown.subscribers.put() - email is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('subscribers.put() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .put('/v1/subscribers/subscriber-id', subscriberPut)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.put('subscriber-id', subscriberPut);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/subscribers/subscriber-id');
  t.is(error.method, 'PUT');
  t.is(error.payload, subscriberPut);
});

const subscriberPatch = {
  email: 'email'
};

test('subscribers.patch() - 200', async (t) => {
  const subscriberPatchResponse = {
    creation_date: '2020-04',
    id: 'some-id',
    metadata: {},
    secondary_id: 1,
    subscriber_type: 'regular',
    source: 'string',
    tags: ['tag1', 'tag2'],
    utm_campaign: 'utm_campaign',
    utm_medium: 'utm_campaign',
    utm_source: 'utm_campaign'
  };
  nock('https://api.buttondown.email', nockOptions)
    .patch('/v1/subscribers/subscriber-id', subscriberPatch)
    .reply(200, subscriberPatchResponse);
  t.deepEqual(
    await buttondown.subscribers.patch('subscriber-id', subscriberPatch),
    subscriberPatchResponse
  );
});

test('subscribers.patch() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.patch();
  });

  t.is(error.message, 'buttondown.subscribers.patch() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('subscribers.patch() - empty payload', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.patch('subscriber-id', {});
  });
  t.is(
    error.message,
    "buttondown.subscribers.patch() - can't patch subscriber to {}"
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('subscribers.patch() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .patch('/v1/subscribers/subscriber-id', subscriberPatch)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.patch('subscriber-id', subscriberPatch);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/subscribers/subscriber-id');
  t.is(error.method, 'PATCH');
  t.is(error.payload, subscriberPatch);
});

const subscriberDeleteQuery = {
  email: 'hugo+test@codewithhugo.com'
};

test('subscribers.delete() - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .delete('/v1/subscribers/subscriber-id')
    .query(subscriberDeleteQuery)
    .reply(200, {});

  await buttondown.subscribers.remove('subscriber-id', subscriberDeleteQuery);
  t.pass();
});

test('subscribers.delete() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.remove(null, subscriberDeleteQuery);
  });
  t.is(error.message, 'buttondown.subscribers.remove() - id is required');
});

test('subscribers.delete() - missing email in query', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.remove('subscriber-id', {});
  });
  t.is(error.message, 'buttondown.subscribers.remove() - email is required');
});

test('subscribers.delete() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .delete('/v1/subscribers/subscriber-id')
    .query(subscriberDeleteQuery)
    .reply(404, {});

  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.remove('subscriber-id', subscriberDeleteQuery);
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/subscribers/subscriber-id');
  t.is(error.method, 'DELETE');
  t.deepEqual(error.query, subscriberDeleteQuery);
  t.is(error.payload, undefined);
});
