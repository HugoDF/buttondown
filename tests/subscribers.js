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

const subscribersListPage1 = [
  {
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  }
];

test('subscribers.list() - no page - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 1
    })
    .reply(200, subscribersListPage1);

  t.deepEqual(await buttondown.subscribers.list(), subscribersListPage1);
});

test('subscribers.list() - page 1 - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 1
    })
    .reply(200, subscribersListPage1);
  t.deepEqual(await buttondown.subscribers.list(1), subscribersListPage1);
});

test('subscribers.list() - page 2 - 200', async (t) => {
  const subscribersListPage2 = [
    {
      username: 'username-page-2',
      name: 'name',
      description: 'description',
      creation_date: '2020-04',
      api_key: 'aaaa-bbbb-cccc-dddd'
    }
  ];
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/subscribers')
    .query({
      page: 2
    })
    .reply(200, subscribersListPage2);
  t.deepEqual(await buttondown.subscribers.list(2), subscribersListPage2);
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
  username: 'username',
  name: 'name',
  description: 'description'
};

test('subscribers.create() - 200', async (t) => {
  const emailCreateResponse = {
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  };
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/subscribers', subscriberCreate)
    .reply(200, emailCreateResponse);
  t.deepEqual(
    await buttondown.subscribers.create(subscriberCreate),
    emailCreateResponse
  );
});

test('subscribers.create() - missing username', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.create({
      name: 'name',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.subscribers.create() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('subscribers.create() - missing description', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.create({
      username: 'username',
      name: 'name'
    });
  });
  t.is(
    error.message,
    'buttondown.subscribers.create() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('subscribers.create() - missing name', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.create({
      username: 'username',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.subscribers.create() - username, name and description are required'
  );
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
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
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
  const emailPutResponse = {
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  };
  nock('https://api.buttondown.email', nockOptions)
    .put('/v1/subscribers/subscriber-id', subscriberPut)
    .reply(200, emailPutResponse);
  t.deepEqual(
    await buttondown.subscribers.put('subscriber-id', subscriberPut),
    emailPutResponse
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

test('subscribers.put() - missing username', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.put('subscriber-id', {
      name: 'name',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.subscribers.put() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('subscribers.put() - missing description', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.put('subscriber-id', {
      username: 'username',
      name: 'name'
    });
  });
  t.is(
    error.message,
    'buttondown.subscribers.put() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('subscribers.put() - missing name', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.put('subscriber-id', {
      username: 'username',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.subscribers.put() - username, name and description are required'
  );
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
  username: 'new-username'
};

test('subscribers.patch() - 200', async (t) => {
  const emailPutResponse = {
    username: 'new-username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  };
  nock('https://api.buttondown.email', nockOptions)
    .patch('/v1/subscribers/subscriber-id', subscriberPatch)
    .reply(200, emailPutResponse);
  t.deepEqual(
    await buttondown.subscribers.patch('subscriber-id', subscriberPatch),
    emailPutResponse
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
