import { test } from 'node:test';
import assert from 'node:assert';

import { useProxies } from './useProxies';

// Basic smoke test to ensure the hook is defined

test('useProxies is a function', () => {
  assert.strictEqual(typeof useProxies, 'function');
});
