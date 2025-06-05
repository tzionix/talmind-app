import { test } from 'node:test';
import assert from 'node:assert';
import { POST } from './route';

test('get-proxies POST handler exists', () => {
  assert.strictEqual(typeof POST, 'function');
});
