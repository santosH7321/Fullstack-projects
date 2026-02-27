import Catagory from "../model/catagory.model.js";

export const createCategory = async (req, res) => {
    try {
        // fetch data from request body
        const { title, description } = req.body;

        // validate data
        if (!title || !description) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required'
             });
        }
        // check if category already exists
        const cateogory = await Catagory.findOne({name: title});
        if(cateogory){
            return res.status(400).json({
                success: false,
                message: "Category all ready exist"
            });
        }
        // save category to database
        await Catagory.create({name: title, description});

        // return res to client
        res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    }
    catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ message: 'Error creating category' });
    }
}