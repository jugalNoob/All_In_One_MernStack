

const RegisterGet = require("../model/Apistudent");
exports.updatesAll = async (req, res) => {
    try {
        const { name,age,country } = req.body;

        const _id = req.params.id;

        // Update the data in the database
        const updateyourdata = await RegisterGet.updateMany({ _id }, {
         name,   age,    country 
        });
        if (updateyourdata) {
            res.status(200).json({ status: "success" });
        } else {
            res.status(404).json({ status: "unsuccessful", error: "No matching records found" });
        }
        console.log(updateyourdata); // For debugging purposes
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "An error occurred" });
    }
};

