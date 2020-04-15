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

const imagesListPage1 = [
  {
    id: 'email-id',
    creation_date: '2020-04',
    image: 'image-content'
  }
];

test.failing('images.list() - no page - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/images')
    .query({
      page: 1
    })
    .reply(200, imagesListPage1);

  t.deepEqual(await buttondown.images.list(), imagesListPage1);
});

test.failing('images.list() - page 1 - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/images')
    .query({
      page: 1
    })
    .reply(200, imagesListPage1);
  t.deepEqual(await buttondown.images.list(1), imagesListPage1);
});

test.failing('images.list() - page 2 - 200', async (t) => {
  const imagesListPage2 = [
    {
      id: 'email-id-page-2',
      subject: 'email-subject',
      body: 'email-body',
      creation_date: '2020-04',
      modification_date: '2020-04',
      email_type: '',
      secondary_id: 1,
      publish_date: '2020-04'
    }
  ];
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/images')
    .query({
      page: 2
    })
    .reply(200, imagesListPage2);
  t.deepEqual(await buttondown.images.list(2), imagesListPage2);
});

test.failing('images.list() - 401 - error', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/images')
    .query({
      page: 1
    })
    .reply(401, imagesListPage1);

  const error = await t.throwsAsync(async () => {
    await buttondown.images.list();
  });
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/images');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
  t.deepEqual(error.query, {page: 1});
});

const emailCreatePayload = {
  included_tags: {},
  excluded_tags: {},
  subject: 'email-subject',
  body: 'email-body'
};

const emailCreateResponse = {
  id: 'email-id-new',
  subject: 'email-subject',
  body: 'email-body',
  creation_date: '2020-04',
  modification_date: '2020-04'
};

test.failing('images.create() - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/images', emailCreatePayload)
    .reply(200, emailCreateResponse);
  t.deepEqual(
    await buttondown.images.create(emailCreatePayload),
    emailCreateResponse
  );
});

test.failing('images.create() - missing image field', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.images.create({});
  });
  t.is(
    error.message,
    'buttondown.email.create() - body and subject are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test.failing('images.create() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/images', emailCreatePayload)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.images.create(emailCreatePayload);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/images');
  t.is(error.method, 'POST');
  t.is(error.payload, emailCreatePayload);
});

test.failing('images.get() - 200', async (t) => {
  const emailGetResponse = {
    id: 'email-id-page-2',
    subject: 'email-subject',
    body: 'email-body',
    creation_date: '2020-04',
    modification_date: '2020-04',
    email_type: '',
    secondary_id: 1,
    publish_date: '2020-04'
  };
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/images/email-id')
    .reply(200, emailGetResponse);
  t.deepEqual(await buttondown.images.get('email-id'), emailGetResponse);
});

test('images.get() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.images.get()
  });

  t.is(error.message, 'buttondown.images.get() - id is required')
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test.failing('images.get() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/images/email-id')
    .reply(404, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.images.get('email-id');
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/images/email-id');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});
