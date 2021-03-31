const footballersModel = require("../models/footballersModel")

exports.getAll = async function(req, res, next){
    const data = await footballersModel.find();

    res.status(200).json({
        status: "success",
        data
    })
}

exports.changeUser = async function(req, res, next){
    let user = req.body;

    await footballersModel.findByIdAndUpdate(user._id, { name: user.name })
    res.status(200).json({
        status: "success"
    })
}

exports.reg = async function(req, res, next){
    const data = req.body;
    let user = null;
    let errorMsg = "";

    try{
        user = await footballersModel.findOne({ name: data.name });

        if(!user)
            user = await footballersModel.create(data);
        else errorMsg = "Person with this name exists in main table. If you are sure this name relates to you in data base then no actions required. If no, then clear yourself on a main page and create a new name!"
    }
    catch(error){
        throw new Error ("Error with creating new User")
    }
    res.status(201).json({
        status: "success",
        data: {
            user,
            errorMsg
        }
    })
    next();
}