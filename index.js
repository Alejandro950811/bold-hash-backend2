const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generar-firma", (req, res) => {
  const { orderId, amount, currency } = req.body;
  const secretKey = process.env.BOLD_SECRET_KEY;
  if (!orderId || !amount || !currency || !secretKey) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
  const cadena = `${orderId}${amount}${currency}${secretKey}`;
  const hash = crypto.createHash("sha256").update(cadena).digest("hex");
  return res.json({ integritySignature: hash });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor hash listo en puerto", PORT);
});
