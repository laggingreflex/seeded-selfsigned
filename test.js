const assert = require('assert');
const lib = require('.');

async function main() {

  const a = await lib('seed');  const b = await lib('seed');
  // const [a, b] = await Promise.all([lib('seed'), lib('seed')]);
  assert.equal(a, b);

}

main().then(() => console.log('pass')).catch(error => {
  console.error(error);
  process.exit(1);
});
