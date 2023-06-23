import crypto from 'crypto';

export function generateKey() {
  const key = crypto.randomBytes(20).toString('hex');
  return key;
}
