import test from 'ava';

import buttondown from '../../dist/main';
buttondown.setApiKey(process.env.TEST_BUTTONDOWN_API_KEY);

test('subscribers.create()/.get()/.list(page, filterByEmail)/.remove()', async (t) => {
  if (!process.env.TEST_BUTTONDOWN_API_KEY)
    return t.pass('No API key, skipping integration test');

  const [existingSubscriber] = await buttondown.subscribers.list(1, {
    email: 'hugo+test@codewithhugo.com'
  });
  if (existingSubscriber) {
    await buttondown.subscribers.remove(existingSubscriber.id, {
      email: 'hugo+test@codewithhugo.com'
    });
  }

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
