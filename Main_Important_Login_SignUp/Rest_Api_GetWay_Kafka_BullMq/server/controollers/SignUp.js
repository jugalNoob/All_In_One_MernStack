
const  Register=require("../model/student")


exports.first = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }



        const jobDetails = new Register({
          
            name , email, password , shortId,
        });

        const checkSave = await jobDetails.save();
        console.log('Saved job details to MongoDB:', checkSave);

        res.status(200).json({ success: true, jobId: job.id });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ success: false, message: 'Failed to add job to the queue' });
    }
};