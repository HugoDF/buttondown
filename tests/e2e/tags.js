import test from 'ava';

import buttondown from '../../dist/main';
buttondown.setApiKey(process.env.TEST_BUTTONDOWN_API_KEY);

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
