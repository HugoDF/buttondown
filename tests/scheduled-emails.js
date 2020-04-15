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

const scheduledEmailsListPage1 = [
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

test('scheduledEmails.list() - no page - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/scheduled-emails')
    .query({
      page: 1
    })
    .reply(200, scheduledEmailsListPage1);

  t.deepEqual(
    await buttondown.scheduledEmails.list(),
    scheduledEmailsListPage1
  );
});

test('scheduledEmails.list() - page 1 - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/scheduled-emails')
    .query({
      page: 1
    })
    .reply(200, scheduledEmailsListPage1);
  t.deepEqual(
    await buttondown.scheduledEmails.list(1),
    scheduledEmailsListPage1
  );
});

test('scheduledEmails.list() - page 2 - 200', async (t) => {
  const scheduledEmailsListPage2 = [
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
    .get('/v1/scheduled-emails')
    .query({
      page: 2
    })
    .reply(200, scheduledEmailsListPage2);
  t.deepEqual(
    await buttondown.scheduledEmails.list(2),
    scheduledEmailsListPage2
  );
});

test('scheduledEmails.list() - 401 - error', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/scheduled-emails')
    .query({
      page: 1
    })
    .reply(401, scheduledEmailsListPage1);

  const error = await t.throwsAsync(async () => {
    await buttondown.scheduledEmails.list();
  });
  t.is(error.message, 'Response code 401 (Unauthorized)');
  t.is(error.url, 'https://api.buttondown.email/v1/scheduled-emails');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
  t.deepEqual(error.query, {page: 1});
});

const scheduledEmailCreatePayload = {
  subject: 'email-subject',
  body: 'email-body',
  publish_date: '2020-04-11'
};

const scheduledEmailCreateResponse = {
  id: 'email-id-new',
  subject: 'email-subject',
  body: 'email-body',
  publish_date: '2020-04-11',
  creation_date: '2020-04',
  modification_date: '2020-04'
};

test('scheduledEmails.create() - 200', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/scheduled-emails', scheduledEmailCreatePayload)
    .reply(200, scheduledEmailCreateResponse);
  t.deepEqual(
    await buttondown.scheduledEmails.create(scheduledEmailCreatePayload),
    scheduledEmailCreateResponse
  );
});

test('scheduledEmails.create() - missing subject', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.scheduledEmails.create({
      body: 'email-body',
      publish_date: '2020-04-11'
    });
  });
  t.is(
    error.message,
    'buttondown.scheduled-emails.create() - body, subject and publish_date are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('scheduledEmails.create() - missing body', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.scheduledEmails.create({
      subject: 'email-subject',
      publish_date: '2020-04-11'
    });
  });
  t.is(
    error.message,
    'buttondown.scheduled-emails.create() - body, subject and publish_date are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('scheduledEmails.create() - missing publish_date', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.scheduledEmails.create({
      body: 'email-body',
      publish_date: '2020-04-11'
    });
  });
  t.is(
    error.message,
    'buttondown.scheduled-emails.create() - body, subject and publish_date are required'
  );
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
  t.is(error.query, undefined);
});

test('scheduledEmails.create() - 400', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .post('/v1/scheduled-emails', scheduledEmailCreatePayload)
    .reply(400, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.scheduledEmails.create(scheduledEmailCreatePayload);
  });
  t.is(error.message, 'Response code 400 (Bad Request)');
  t.is(error.url, 'https://api.buttondown.email/v1/scheduled-emails');
  t.is(error.method, 'POST');
  t.is(error.payload, scheduledEmailCreatePayload);
});

test('scheduledEmails.get() - 200', async (t) => {
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
    .get('/v1/scheduled-emails/email-id')
    .reply(200, emailGetResponse);
  t.deepEqual(
    await buttondown.scheduledEmails.get('email-id'),
    emailGetResponse
  );
});

test('scheduledEmails.get() - missing id', async (t) => {
  const error = await t.throwsAsync(async () => {
    await buttondown.scheduledEmails.get()
  });

  t.is(error.message, 'buttondown.scheduled-emails.get() - id is required')
  t.is(error.url, undefined);
  t.is(error.method, undefined);
  t.is(error.payload, undefined);
});

test('scheduledEmails.get() - 404', async (t) => {
  nock('https://api.buttondown.email', nockOptions)
    .get('/v1/scheduled-emails/email-id')
    .reply(404, {});
  const error = await t.throwsAsync(async () => {
    await buttondown.scheduledEmails.get('email-id');
  });
  t.is(error.message, 'Response code 404 (Not Found)');
  t.is(error.url, 'https://api.buttondown.email/v1/scheduled-emails/email-id');
  t.is(error.method, 'GET');
  t.is(error.payload, undefined);
});
