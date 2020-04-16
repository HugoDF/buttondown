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

test('subscribers.create() + subscribers.remove() + subscribers.list() email filtering', async (t) => {
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
