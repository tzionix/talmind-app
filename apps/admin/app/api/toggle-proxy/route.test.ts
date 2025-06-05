import { test } from 'node:test';
import assert from 'node:assert';
import { POST } from './route';

test('toggle-proxy POST handler exists', () => {
  assert.strictEqual(typeof POST, 'function');
});
