const File = require("../models/file");

// Créer un nouveau fichier
exports.createFile = async (req, res) => {
    try {
        const newFile = await File.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                file: newFile,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

// Obtenir tous les fichiers
exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json({
            status: "success",
            results: files.length,
            data: {
                files,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

// Obtenir un fichier par ID
exports.getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({
                status: "fail",
                message: "File not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                file,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

// Mettre à jour un fichier
exports.updateFile = async (req, res) => {
    try {
        const file = await File.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!file) {
            return res.status(404).json({
                status: "fail",
                message: "File not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                file,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

// Supprimer un fichier
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).json({
                status: "fail",
                message: "File not found",
            });
        }
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};