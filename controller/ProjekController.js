const Project = require("../models/ProjekModel");
const Employee = require("../models/Employee");

const GetProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      success: true,
      message: "Daftar project ditemukan",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const GetProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id, {
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Projek Tidak di temukan",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project ditemukan",
      data: project,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const CreateProjek = async (req, res) => {
  try {
    const { project_name, start_date, due_date, status } = req.body;
    if (!project_name || !start_date || !due_date) {
      return res.status(400).json({
        success: false,
        message: "Harap Lengkapi semua data",
      });
    }
    const create = await Project.create({
      project_name,
      start_date,
      due_date,
      status,
    });
    res.status(200).json({
      success: true,
      message: "Data",
      create,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const AddEmployeToProject = async (req, res) => {
  const { projectId, EmployeeId } = req.body;
  if (!projectId || !EmployeeId) {
    return res.status(400).json({
      success: false,
      message: "Harap Lengkapi Data",
    });
  }
  const projek = await Project.findByPk(projectId);
  const employee = await Employee.findByPk(EmployeeId);

  if (!projek) {
    return res.status(400).json({
      success: false,
      message: "Projek tidak terdaftar",
    });
  }
  if (!employee) {
    return res.status(400).json({
      success: false,
      message: "Tidak terdapat Employee",
    });
  }
  await projek.addEmployee(employee);
  res.status(200).json({
    success: true,
    message: "Employee Berhasil di tambahkan",
  });
};

const UpdateEmployeeProject = async (req, res) => {
  try {
    const { projectId, employeeIds } = req.body;
    if (!projectId || !Array.isArray(employeeIds)) {
      return res.status(400).json({
        success: false,
        message: "Harap sertakan projectId dan employeeIds (array)",
      });
    }
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project tidak ditemukan",
      });
    }
    const employees = await Employee.findAll({
      where: { id: employeeIds },
    });
    if (employees.length !== employeeIds.length) {
      return res.status(400).json({
        success: false,
        message: "Beberapa Employee tidak ditemukan",
      });
    }
    await project.setEmployees(employees);
    const updatedProject = await Project.findByPk(projectId, {
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    res.status(200).json({
      success: true,
      message: "Relasi Project-Employee berhasil diperbarui",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  GetProjects,
  GetProjectById,
  CreateProjek,
  AddEmployeToProject,
};
