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

const newslettersListPage1 = [
  {
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  }
];

test('newsletters.list() - no page - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/newsletters')
    .query({
      page: 1
    })
    .reply(200, newslettersListPage1);

  t.deepEqual(await buttondown.newsletters.list(), newslettersListPage1);
});

test('newsletters.list() - page 1 - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/newsletters')
    .query({
      page: 1
    })
    .reply(200, newslettersListPage1);
  t.deepEqual(await buttondown.newsletters.list(1), newslettersListPage1);
});

test('newsletters.list() - page 2 - 200', async (t) => {
  const newslettersListPage2 = [
    {
      username: 'username-page-2',
      name: 'name',
      description: 'description',
      creation_date: '2020-04',
      api_key: 'aaaa-bbbb-cccc-dddd'
    }
  ];
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/newsletters')
    .query({
      page: 2
    })
    .reply(200, newslettersListPage2);
  t.deepEqual(await buttondown.newsletters.list(2), newslettersListPage2);
});

test('newsletters.list() - 401 - error', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/newsletters')
    .query({
      page: 1
    })
    .reply(401, newslettersListPage1);

  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.list();
  });
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/newsletters');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
  t.deepEqual(error.query, {page: 1});
});

const newsletterCreate = {
  username: 'username',
  name: 'name',
  description: 'description'
};

test('newsletters.create() - 200', async (t) => {
  const emailCreateResponse = {
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  };
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/newsletters', newsletterCreate)
    .reply(200, emailCreateResponse);
  t.deepEqual(
    await buttondown.newsletters.create(newsletterCreate),
    emailCreateResponse
  );
});

test('newsletters.create() - missing username', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.create({
      name: 'name',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.newsletters.create() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('newsletters.create() - missing description', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.create({
      username: 'username',
      name: 'name'
    });
  });
  t.is(
    error.message,
    'buttondown.newsletters.create() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('newsletters.create() - missing name', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.create({
      username: 'username',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.newsletters.create() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('newsletters.create() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/newsletters', newsletterCreate)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.create(newsletterCreate);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/newsletters');
  t.is(error.method, 'POST');
  t.is(error.payload, newsletterCreate);
});

test('newsletters.get() - 200', async (t) => {
  const newsletterGetResponse = {
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  };
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/newsletters/newsletter-id')
    .reply(200, newsletterGetResponse);
  t.deepEqual(
    await buttondown.newsletters.get('newsletter-id'),
    newsletterGetResponse
  );
});

test('newsletters.get() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/newsletters/newsletter-id')
    .reply(404, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.get('newsletter-id');
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/newsletters/newsletter-id');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});

const newsletterPut = {
  ...newsletterCreate
}

test('newsletters.put() - 200', async (t) => {
  const emailPutResponse = {
    username: 'username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  };
  nock('https://api.buttondown.email', nockOptions)
    .put('/v1/newsletters/newsletter-id', newsletterPut)
    .reply(200, emailPutResponse);
  t.deepEqual(
    await buttondown.newsletters.put('newsletter-id', newsletterPut),
    emailPutResponse
  );
});

test('newsletters.put() - missing username', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.put('newsletter-id', {
      name: 'name',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.newsletters.put() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('newsletters.put() - missing description', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.put('newsletter-id', {
      username: 'username',
      name: 'name'
    });
  });
  t.is(
    error.message,
    'buttondown.newsletters.put() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('newsletters.put() - missing name', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.put('newsletter-id', {
      username: 'username',
      description: 'description'
    });
  });
  t.is(
    error.message,
    'buttondown.newsletters.put() - username, name and description are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('newsletters.put() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .put('/v1/newsletters/newsletter-id', newsletterPut)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.put('newsletter-id', newsletterPut);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/newsletters/newsletter-id');
  t.is(error.method, 'PUT');
  t.is(error.payload, newsletterPut);
});

const newsletterPatch = {
  username: 'new-username'
};

test('newsletters.patch() - 200', async (t) => {
  const emailPutResponse = {
    username: 'new-username',
    name: 'name',
    description: 'description',
    creation_date: '2020-04',
    api_key: 'aaaa-bbbb-cccc-dddd'
  };
  nock('https://api.buttondown.email', nockOptions)
    .patch('/v1/newsletters/newsletter-id', newsletterPatch)
    .reply(200, emailPutResponse);
  t.deepEqual(
    await buttondown.newsletters.patch('newsletter-id', newsletterPatch),
    emailPutResponse
  );
});

test('newsletters.patch() - empty payload', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.patch('newsletter-id', {});
  });
  t.is(
    error.message,
    "buttondown.newsletters.patch() - can't patch newsletter to {}"
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('newsletters.patch() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .patch('/v1/newsletters/newsletter-id', newsletterPatch)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.newsletters.patch('newsletter-id', newsletterPatch);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/newsletters/newsletter-id');
  t.is(error.method, 'PATCH');
  t.is(error.payload, newsletterPatch);
});
