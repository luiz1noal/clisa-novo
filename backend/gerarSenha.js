const bcrypt = require('bcrypt');

async function gerarHash() {
  const senhaPlana = "123456";
  const hash = await bcrypt.hash(senhaPlana, 10);
  console.log("Hash gerado:", hash);
}

gerarHash();
