import crypto from 'crypto';

/**
 * Generate random key.
 * @return {String}
 */
export function generateKey() {
  const key = crypto.randomBytes(20).toString('hex');
  return key;
}
