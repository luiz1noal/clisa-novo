const bcrypt = require('bcrypt');

<<<<<<< HEAD
async function gerarHash() {
  const senhaPlana = "123456";
=======
async function gerarSenha() {
  const senhaPlana = '123456';
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
  const hash = await bcrypt.hash(senhaPlana, 10);
  console.log("Hash gerado:", hash);
}

<<<<<<< HEAD
gerarHash();
=======
gerarSenha();
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
