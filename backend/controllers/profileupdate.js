import Artist from '../models/Artist.js';

// Fetch Artist Details
export const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Artist Details
export const updateArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    let image_filename=`${req.file.filename}`;

    const updatedData = req.body;
    updatedData.profilePicture=image_filename;
    // console.log(req.body.socialLinks);

    // let socialLink = req.body.socialLinks;
    updatedData.socialLink=JSON.parse(req.body.socialLink);
    console.log(updatedData);
    
    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', updatedArtist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};