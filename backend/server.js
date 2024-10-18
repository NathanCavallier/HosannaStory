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
const port = 3000 || process.env.PORT;
const soundcloud = require("./config/soundcloud.js");
const sequelize = require("./config/database"); // Importer la connexion à Sequelize
//#region Liste des routes
const userRouter = require("./routes/userRoutes");
const storyRouter = require("./routes/storyRoutes");
const chapterRouter = require("./routes/chapterRoutes");
const commentRouter = require("./routes/commentRoutes");
const voteRouter = require("./routes/voteRoutes");
const fileRouter = require("./routes/fileRoutes");
//#endregion

app.use(bodyParser.json());
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

// Utiliser les routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//#region Routes pour l'authentification
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.get("/forgot-password", (req, res) => {
  res.sendFile(__dirname + "/public/forgot-password.html");
});

app.get("/reset-password", (req, res) => {
  res.sendFile(__dirname + "/public/reset-password.html");
});
//#endregion

//#region Routes pour Azure Blob Storage
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

app.get("/list", authenticateToken, async (req, res) => {
  try {
    const files = await azureBlobStorage.listFiles();
    res.json(files);
  } catch (error) {
    res.status(500).send("Error listing files");
  }
});
//#endregion

//#region Routes pour SoundCloud
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
app.get("/api/track/:id", authenticateToken, soundcloud.getTrack); // Ajouter le middleware authenticateToken
app.get("/api/search", authenticateToken, soundcloud.searchTracks); // Ajouter le middleware authenticateToken
//#endregion

//#region Utiliser les routes
app.use("/users", authenticateToken, userRouter); // Ajouter le middleware authenticateToken
app.use("/stories", authenticateToken, storyRouter);
app.use("/chapters", authenticateToken, chapterRouter);
app.use("/comments", authenticateToken, commentRouter);
app.use("/votes", authenticateToken, voteRouter);
app.use("/files", authenticateToken, fileRouter);
//#endregion

// Synchroniser les modèles Sequelize et démarrer le serveur
sequelize
  .sync({ force: false }) // Utiliser { force: true } pour réinitialiser la base de données
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur en écoute sur http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });
