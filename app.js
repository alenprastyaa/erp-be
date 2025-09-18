const express = require("express");
const db = require("./config/db");
const app = express();
const port = 3200;
const RoleRoutes = require("./routes/RoleRoutes");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Tes Koneksi" });
});
app.use(express.json());

const startApp = () => {
  try {
    db.authenticate();
    // db.sync();
    app.use("/api/role", RoleRoutes);
    app.listen(port, () => {
      console.log("Aplikasi Berjalan di port : ", port);
    });
  } catch (error) {
    console.log("Error running", error);
  }
};

startApp();
