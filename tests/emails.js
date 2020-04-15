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

const emailsListPage1 = [
  {
    id: 'email-id',
    subject: 'email-subject',
    body: 'email-body',
    creation_date: '2020-04',
    modification_date: '2020-04',
    email_type: '',
    secondary_id: 1,
    publish_date: '2020-04'
  }
];

test('emails.list() - no page - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/emails')
    .query({
      page: 1
    })
    .reply(200, emailsListPage1);

  t.deepEqual(await buttondown.emails.list(), emailsListPage1);
});

test('emails.list() - page 1 - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/emails')
    .query({
      page: 1
    })
    .reply(200, emailsListPage1);
  t.deepEqual(await buttondown.emails.list(1), emailsListPage1);
});

test('emails.list() - page 2 - 200', async (t) => {
  const emailsListPage2 = [
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
    .get('/v1/emails')
    .query({
      page: 2
    })
    .reply(200, emailsListPage2);
  t.deepEqual(await buttondown.emails.list(2), emailsListPage2);
});

test('emails.list() - 401 - error', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/emails')
    .query({
      page: 1
    })
    .reply(401, emailsListPage1);

  const error = await t.throwsAsync(async () => {
    await buttondown.emails.list();
  });
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/emails');
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

test('emails.create() - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/emails', emailCreatePayload)
    .reply(200, emailCreateResponse);
  t.deepEqual(
    await buttondown.emails.create(emailCreatePayload),
    emailCreateResponse
  );
});

test('emails.create() - missing subject', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.emails.create({
      body: 'email-body'
    });
  });
  t.is(
    error.message,
    'buttondown.emails.create() - body and subject are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('emails.create() - missing body', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.emails.create({
      subject: 'email-subject'
    });
  });
  t.is(
    error.message,
    'buttondown.emails.create() - body and subject are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('emails.create() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/emails', emailCreatePayload)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.emails.create(emailCreatePayload);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/emails');
  t.is(error.method, 'POST');
  t.is(error.payload, emailCreatePayload);
});

test('emails.get() - 200', async (t) => {
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
    .get('/v1/emails/email-id')
    .reply(200, emailGetResponse);
  t.deepEqual(await buttondown.emails.get('email-id'), emailGetResponse);
});

test('emails.get() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.emails.get();
  });

  t.is(error.message, 'buttondown.emails.get() - id is required');
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('emails.get() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/emails/email-id')
    .reply(404, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.emails.get('email-id');
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/emails/email-id');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});
