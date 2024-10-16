const express = require("express");
const bodyParser = require("body-parser");
const {
  router: authRouter,
  authenticateToken,
} = require("./controllers/authController.js");
const azureBlobStorage = require("./config/azureBlobStorage.js");
const multer = require("multer");
const db = require("./config/db"); // Importer la connexion à MongoDB
const app = express();
const port = 3000;
const soundcloud = require("./config/soundcloud.js");

const upload = multer({ dest: "uploads/" });

app.use(bodyParser.json());
app.use("/auth", authRouter);

app.use(express.static("public"));

//
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/track/:id", async (req, res) => {
  try {
    const track = await soundcloud.getTrack(req.params.id);
    res.json(track);
  } catch (error) {
    res.status(500).send("Error fetching track");
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const tracks = await soundcloud.searchTracks(req.query.q);
    res.json(tracks);
  } catch (error) {
    res.status(500).send("Error searching tracks");
  }
});

app.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    try {
      await azureBlobStorage.uploadFile(req.file.path, req.file.originalname);
      res.send("File uploaded successfully");
    } catch (error) {
      res.status(500).send("Error uploading file");
    }
  }
);

app.get("/download/:filename", authenticateToken, async (req, res) => {
  const filePath = `downloads/${req.params.filename}`;
  try {
    await azureBlobStorage.downloadFile(req.params.filename, filePath);
    res.download(filePath);
  } catch (error) {
    res.status(500).send("Error downloading file");
  }
});

app.get("/delete/:filename", authenticateToken, async (req, res) => {
  try {
    await azureBlobStorage.deleteFile(req.params.filename);
    res.send("File deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting file");
  }
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
