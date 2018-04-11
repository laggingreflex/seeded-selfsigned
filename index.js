const { promisify } = require('util');
const forge = require('node-forge');
const selfsigned = require('selfsigned');
const dprng = require('deterministic-pseudorandombytes');
const monkeypatch = require('monkeypatch');

const sha = txt => forge.md.sha256.create().update(txt).digest().getBytes();
// const sha = txt => forge.md.sha1.create().update(txt).digest().toHex('base64');
// const sha = txt => forge.md.md5.create().update(txt).digest().toHex('base64');

module.exports = async (seed, opts) => {

  const prng = new dprng({ seed });

  // monkeypatch(forge.random, 'getBytes', prng.randomBytes);
  monkeypatch(forge.random, 'getBytesSync', (_, len) => prng.randomBytes(len).toString());

  // const random = forge.random
  // forge.random = new Proxy(random, {})

  // const prng = {
  //   random: sha(seed),
  //   getBytes(len, cb) {
  //     return random.getBytes(...arguments)
  //     // console.log(`random.getBytes:`, random.getBytes);
  //     if (cb)
  //       cb(this.getBytesSync(len));
  //   },
  //   getBytesSync(length) {
  //     this.random = sha(this.random);
  //     while (this.random.length < length) {
  //       this.random += sha(this.random);
  //     }
  //     // console.log(`this.random:`, this.random);
  //     // console.log(`this.random`);
  //     return this.random;
  //   }

  // }

  // forge.random = prng;

  // const keyPair = await promisify(forge.pki.rsa.generateKeyPair)({  });
  const pem = selfsigned.generate({}, {
    // keyPair: {
    //   privateKey: forge.pki.privateKeyToPem(keyPair.privateKey),
    //   publicKey: forge.pki.publicKeyToPem(keyPair.publicKey),
    // }
  });
  return pem;


  // console.log(`keys:`, (keys.privateKey));
  // console.log(`keys:`, sha(keys.privateKey.n.data.concat(keys.privateKey.d.data).concat(keys.privateKey.p.data)));

  const cert = forge.pki.createCertificate();
  cert.publicKey = keyPair.publicKey;
  var attrs = [{ name: 'commonName', value: 'example.org' }, { name: 'countryName', value: 'US' }, { shortName: 'ST', value: 'Virginia' }, { name: 'localityName', value: 'Blacksburg' }, { name: 'organizationName', value: 'Test' }, { shortName: 'OU', value: 'Test' }];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.setExtensions([{ name: 'basicConstraints', cA: true }, { name: 'keyUsage', keyCertSign: true, digitalSignature: true, nonRepudiation: true, keyEncipherment: true, dataEncipherment: true }, { name: 'extKeyUsage', serverAuth: true, clientAuth: true, codeSigning: true, emailProtection: true, timeStamping: true }, { name: 'nsCertType', client: true, server: true, email: true, objSign: true, sslCA: true, emailCA: true, objCA: true }, { name: 'subjectAltName', altNames: [{ type: 6, value: 'http://example.org/webid#me' }, { type: 7, ip: '127.0.0.1' }] }, { name: 'subjectKeyIdentifier' }]);
  // console.log(`keys.privateKey:`, keys.privateKey);
  cert.sign(keyPair.privateKey);

  // console.log(`cert:`, cert);
  // console.log(`cert:`, cert.validity);
  // return cert.signature

  // convert a Forge certificate to PEM
  // const pem = forge.pki.certificateToPem(cert);
  // console.log(`pem:`, pem);

  return {
    private: forge.pki.privateKeyToPem(keyPair.privateKey),
    key: forge.pki.privateKeyToPem(keyPair.privateKey),
    public: forge.pki.publicKeyToPem(keyPair.publicKey),
    cert: forge.pki.certificateToPem(cert),
    ca: forge.pki.certificateToPem(cert),
    // fingerprint: fingerprint,
  };



  // return pem;

  // // convert a Forge certificate from PEM
  // var cert = forge.pki.certificateFromPem(pem);

  // // // convert an ASN.1 X.509x3 object to a Forge certificate
  // // var cert = forge.pki.certificateFromAsn1(obj);

  // // // convert a Forge certificate to an ASN.1 X.509v3 object
  // // var asn1Cert = forge.pki.certificateToAsn1(cert);

  // // // console.log(`keyPair.publicKey:`, keyPair.publicKey);
  // // // // console.log(`keyPair.publicKey.toString:`, keyPair.publicKey.toString('base64'));
  // // // console.log(`forge.pki.publicKeyToPem:`, forge.pki.publicKeyToPem);
  // // const pem = forge.pki.publicKeyToPem(keyPair);
  // // // // const pem = forge.pki.publicKeyToPem(keyPair.publicKey.toString('base64'));
};
