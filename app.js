const express = require("express");
const db = require("./config/db");
const app = express();
const port = 3200;
const RoleRoutes = require("./routes/RoleRoutes");
const UserRoutes = require("./routes/UserRoutes");
const DailyAbsenRoutes = require("./routes/DailyAbsenRoutes");
const EmployeRoutes = require("./routes/EmployeeRoutes");
const DetailCompaniesRoutes = require("./routes/DetailCompanyRoutes");
const EdukasiRoutes = require("./routes/EdukasiRoutes");
const BankAccountRoutes = require("./routes/BankAccountRoutes");
const ProjekRoutes = require("./routes/ProjekRoutes");
const PermissionRoutes = require('./routes/PermisiionRoutes')
app.get("/", (req, res) => {
  res.status(200).json({ message: "Tes Koneksi" });
});
app.use(express.json());

const startApp = () => {
  try {
    db.authenticate();
    // db.sync({ alter: true });
    app.use("/api/daily", DailyAbsenRoutes);
    app.use("/api/employee", EmployeRoutes);
    app.use("/api/role", RoleRoutes);
    app.use("/api/user", UserRoutes);
    app.use("/api/edukasi", EdukasiRoutes);
    app.use("/api/bank/account", BankAccountRoutes);
    app.use("/api/detail/companie", DetailCompaniesRoutes);
    app.use("/api/permission", PermissionRoutes)
    app.use("/api/projek", ProjekRoutes);
    app.listen(port, () => {
      console.log("Aplikasi Berjalan di port : ", port);
    });
  } catch (error) {
    console.log("Error running", error);
  }
};

startApp();
