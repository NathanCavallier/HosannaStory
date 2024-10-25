import { updateStory } from "../../../../backend/controllers/storyController"; // Assurez-vous que le modèle Story est correctement défini

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const story = await updateStory(req.params.id, req.body);
      res.status(200).json(story);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
