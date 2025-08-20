
/// --- > 2 . 0 Aggration --------------------------------->>>>


exports.Aggress = async (req, res) => {
    try {
        const { name, country, minAge, maxAge, gender } = req.query;

        // Build dynamic $match conditions
        const matchConditions = {};

        if (gender) matchConditions.gender = gender;
        if (name) matchConditions.name = { $regex: name, $options: 'i' }; // case-insensitive
        if (country) matchConditions.country = { $regex: country, $options: 'i' };
        if (minAge || maxAge) {
            matchConditions.age = {};
            if (minAge) matchConditions.age.$gte = parseInt(minAge);
            if (maxAge) matchConditions.age.$lte = parseInt(maxAge);
        }

        const resultShow = await RegisterGet.aggregate([
            { $match: matchConditions },
            { $sort: { age: -1 } },
            {
                $group: {
                    _id: "$age",
                    userInfo: {
                        $push: {
                            name: "$name",
                            gender: "$gender",
                            age: "$age",
                            hobbies: "$hobbies",
                            identity: "$identity",
                            bio: "$bio",
                            country: "$country",
                            isEligible: "$isEligible"
                        }
                    }
                }
            },
            { $limit: 5 }
        ]);

        const totalDocumentCount = await RegisterGet.countDocuments({});
        res.send(resultShow);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// http://localhost:9000/aggregate?name=john&gender=male&minAge=25&country=India