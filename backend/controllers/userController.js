import User from "../models/User.js";

// Update only fullName and email
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.fullName = fullName;
    user.email = email;

    await user.save();

    res.json({ success: true, user: { fullName: user.fullName, email: user.email, _id: user._id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
