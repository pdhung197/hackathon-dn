export const logger = (() => {
  const info = (tag: string, message: string) =>
    console.log('\x1b[34m', tag, '\x1b[0m', '|\t', 'INFO', '|\t', message);

  const success = (tag: string, message: string) =>
    console.log('\x1b[32m', tag, '\x1b[0m', '|\t', 'SUCCESS', '|\t', message);

  const error = (tag: string, message: string) =>
    console.log('\x1b[31m', tag, '\x1b[0m', '|\t', 'FAILED', '|\t', message);

  return {info, error, success};
})();
