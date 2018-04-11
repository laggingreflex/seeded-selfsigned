const forge = require('node-forge');
const selfsigned = require('selfsigned');

const sha = _ => forge.md.sha1.create().update(_).digest().toHex();

module.exports = ({ seed }, ...selfsignedArgs) => {

  seed = sha(seed);
  forge.random.seedFileSync = needed => seed.repeat(Math.ceil(needed / seed.length)).substr(0, needed);
  forge.random.seedFile = (needed, callback) => callback(null, forge.random.seedFileSync(needed));

  return selfsigned.generate(...selfsignedArgs);
};
