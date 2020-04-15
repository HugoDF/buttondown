import test from 'ava';

const buttondown = require('../../dist/main');

buttondown.setApiKey(process.env.TEST_BUTTONDOWN_API_KEY);

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
})
