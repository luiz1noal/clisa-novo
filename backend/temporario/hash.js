const bcrypt = require('bcrypt');

const senha = process.argv[2]; // pega o argumento passado no terminal
const saltRounds = 10;

if (!senha) {
  console.log('Passe a senha como argumento: node hash.js suaSenhaAqui');
  process.exit(1);
}

bcrypt.hash(senha, saltRounds).then(hash => {
  console.log(hash);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
