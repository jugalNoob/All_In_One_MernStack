//Aggregate start row class Line time 
const RegisterGet = require("../model/Apistudent");
exports.Aggress = async (req, res) => {
    try {
        const resultShow = await  RegisterGet .aggregate([
            { 
                $sort: { "age": -1}  // sort age 
              },
            {
                $match: { gender: "female" } // Use $match stage separately
            },
            {
                $group: {
                    _id: "$age",
                    userInfo: {
                        $push: {
                            name: "$name",
                            gender: "$gender",
                            age:"$age",
                            hobbies: "$hobbies",
                            identity:"$identity",
                            bio:"$bio",
                            country:"$country",
                            isEligible:"$isEligible"
                        }
                    }
                }
            },
            {
                $limit: 5 // Place the $limit stage here to limit the number of results
            }
        ]);

        const totalDocumentCount = await RegisterGet.countDocuments({});
        console.log(totalDocumentCount, "totaldocument");

        // console.log(resultShow);
        res.send(resultShow);
    } catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
