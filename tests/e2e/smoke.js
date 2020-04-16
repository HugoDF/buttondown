import test from 'ava';
import buttondown from '../../dist/main';

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

test('unsubscribers.list() & unsubscribers.get()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');
  const unsubscribers = await buttondown.unsubscribers.list();
  t.true(Array.isArray(unsubscribers));
  t.true(unsubscribers.length > 0);

  const id = unsubscribers[0].id;
  const unsubscriber = await buttondown.unsubscribers.get(id);
  t.snapshot(Object.keys(unsubscriber));
});
