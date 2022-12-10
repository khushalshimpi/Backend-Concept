// Logic goes here

const User = require("../models/userModel");

exports.home = (req, res) => {
    res.send("Hello home");
};

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body; 

        // To validate all the detail
        if(!(name && email)){
            res.status(401).send("Name and Email is required")
        }

        // check if user is already there or not in Db
        const userExits = await User.findOne({ email });

        if(userExits) {
            throw new Error("Email is already exists")
        }

        // Inserting this entry in DB

        const user = await User.create({ name, email });

        res.status(201).json({
            success : true,
            message : "User created Successfully",
            user
        });

    } catch (error) {
        console.log(error);
    }
};

exports.getUsers = async (req, res) => {
    try {
        // find all the user
        const users = await User.find();

        res.status(200).json({
            success : true,
            users
        })

    } catch (error) {
        console.log(error);

        res.status(401).json({
            success : false,
            message : error.message
        })
    }
}

exports.editUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({
            success : true,
            message : "user updated successfully",
            user
        })

    } catch (error) {
        console.log(error);

        res.status(401).json({
            success : false,
            message : error.message
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        res.status(200).json({
            success : true,
            message : "user deleted successfully",
            user
        })

    } catch (error) {
        console.log(error);

        res.status(401).json({
            success : false,
            message : error.message
        });
    }
};