const shortid = require('shortid');
const Register = require('../../model/student');

exports.first = async (req, res) => {
  try {
    const {name,price,age,birthDate,
        bloodGroup,email,hobbies,country,bio,isEligible,gender,password,   // add if you want to save password
    } = req.body;

    // Basic validation
// if (
//   !name || price === undefined || age === undefined || !birthDate || !bloodGroup ||
//   !email || !hobbies || !country || !bio || isEligible === undefined || !gender || !password
// ) {
//   return res.status(400).json({ success: false, message: 'Missing required fields' });
// }

    if (!Array.isArray(hobbies)) {
      return res.status(400).json({ success: false, message: 'Hobbies must be an array' });
    }

    const shortId = shortid.generate();

    const newUser = new Register({
      name,price,age,birthDate: new Date(birthDate),bloodGroup,email,hobbies,country,bio,isEligible,gender,

    });

    const savedUser = await newUser.save();

    console.log('Saved user to MongoDB:', savedUser);

    res.status(200).json({ success: true, userId: savedUser._id });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ success: false, message: 'Failed to save user' });
  }
};
