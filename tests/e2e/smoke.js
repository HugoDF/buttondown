import test from 'ava';

const buttondown = require('../../dist/main');

buttondown.setApiKey(process.env.TEST_BUTTONDOWN_API_KEY);

test('drafts.list()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');
  const drafts = await buttondown.drafts.list();
  t.true(Array.isArray(drafts));
  // Could check length but drafts tend to change pretty often...
});

test('emails.list() & emails.get()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');
  const emails = await buttondown.emails.list();
  t.true(Array.isArray(emails));
  t.true(emails.length > 0);

  const id = emails[0].id;
  const email = await buttondown.emails.get(id);
  t.snapshot(Object.keys(email));
});

test.failing('newsletters.list & newsletters.get()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.fail('No API key, skipping integration test');
  const newsletters = await buttondown.newsletters.list();
  t.true(Array.isArray(newsletters));
  t.true(newsletters.length > 0);

  const id = newsletters[0].id;
  const newsletter = await buttondown.newsletters.get(id);
  t.snapshot(Object.keys(newsletter));
});

test('ping()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');
  t.snapshot(await buttondown.ping());
});

test('subscribers.list() & subscribers.get()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');
  const subscribers = await buttondown.subscribers.list();
  t.true(Array.isArray(subscribers));
  t.true(subscribers.length > 0);

  const id = subscribers[0].id;
  const subscriber = await buttondown.subscribers.get(id);
  t.snapshot(Object.keys(subscriber));
});

test('subscribers.create()/.get()/.list(page, filterByEmail)/.remove()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');

  // Create new subscriber
  const createdSubscriber = await buttondown.subscribers.create({
    email: 'hugo+test@codewithhugo.com'
  });

  // Check new subscriber appears in get() and filtered list()
  const [subscriber, filteredSubscribers] = await Promise.all([
    buttondown.subscribers.get(createdSubscriber.id),
    buttondown.subscribers.list(1, {
      email: 'hugo+test@codewithhugo.com'
    })
  ]);

  t.deepEqual(createdSubscriber, subscriber);
  t.deepEqual([createdSubscriber], filteredSubscribers);

  // Delete new subscriber
  await buttondown.subscribers.remove(createdSubscriber.id, {
    email: 'hugo+test@codewithhugo.com'
  });

  // Check deleted subscriber has stopped appearing
  const error = await t.throwsAsync(async () => {
    await buttondown.subscribers.get(createdSubscriber.id);
  });

  t.is(error.message, 'Response code 404 (Not Found)');

  t.deepEqual(
    await buttondown.subscribers.list(1, {
      email: 'hugo+test@codewithhugo.com'
    }),
    []
  );
});

test('tags.list() & tags.get()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');
  const tags = await buttondown.tags.list();
  t.true(Array.isArray(tags));
  t.true(tags.length > 0);

  const id = tags[0].id;
  const tag = await buttondown.tags.get(id);
  t.snapshot(Object.keys(tag));
});

test('tags.create()/.get()/.remove()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');

  // Create new tag
  const createdTag = await buttondown.tags.create({
    name: 'test-tag'
  });

  // Check new tag appears in get()
  const [tag] = await Promise.all([buttondown.tags.get(createdTag.id)]);

  t.deepEqual(createdTag, tag);

  // Delete new subscriber
  await buttondown.tags.remove(createdTag.id, {
    name: 'test-tag'
  });

  // Check deleted subscriber has stopped appearing
  const error = await t.throwsAsync(async () => {
    await buttondown.tags.get(createdTag.id);
  });

  t.is(error.message, 'Response code 404 (Not Found)');

  const tags = await buttondown.tags.list(1);
  const testTags = tags.filter((tag) => tag.name === 'test-tag');
  for (const tag of testTags) {
    // eslint-disable-next-line no-await-in-loop
    await buttondown.tags.remove(tag.id, {name: tag.name});
  }

  t.deepEqual(
    (await buttondown.tags.list(1)).filter((tag) => tag.name === 'test-tag'),
    []
  );
});
