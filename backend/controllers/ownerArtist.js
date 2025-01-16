import artModel from "../models/artModel.js";
import artistSchema from "../models/Artist.js"; // Assuming you have an artist model

export const fetchArtistDetails = async (req, res) => {
  const { artistId } = req.params;

  try {
    const artist = await artistSchema.findById(artistId);
    if (!artist) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }

    const artworks = await artModel.find({ artist_id: artistId });

    res.status(200).json({
      success: true,
      artist,
      artworks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch artist details",
    });
  }
};
