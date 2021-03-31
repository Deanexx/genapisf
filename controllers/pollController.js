const footballersModel = require("../models/footballersModel")
const pollsModel = require("../models/pollsModel")

exports.getAll = async function(req, res, next){
    let all = await pollsModel.find();

    res.status(200).json({
        status: "success",
        all
    })
}


exports.weeklyVote = async function (req, res, next){
    // {_id: "", additionalPlayers: 0}

    const user = req.body;

    if(!(await pollsModel.findOne({ active: true, "poll._id": user._id })))
        var data = await pollsModel.findOneAndUpdate({ active: true }, { $push:{
                poll: { _id: user._id, additionalPlayers: user.additionalPlayers, cnt: 0 }
            }
    }, { new: true })
    res.status(200).json({
        status: "success",
        data
    })
}

exports.resetPoll = async function(req, res, next){
    try{
        await pollsModel.findOneAndUpdate( { active: true }, { active: false });

        await pollsModel.create(
            {
                poll: [],
                active: true
            }
        );
    }
    catch(error){
        throw new Error("Something went bad");
    }

    res.status(201).json({
        status: "success"
    })

}

exports.createPolls = async function(req, res, next){
    await pollsModel.create(
        {
            poll: [],
            active: true
        }
    );

    res.status(200).json({
        status: "success"
    })
}

exports.removeUserFromPoll = async function(req, res, next){
    console.log(req.body);
    let userID = req.body._id;

    const data = await pollsModel.findOneAndUpdate( { active: true },
{
        $pull:
            {
                poll: { _id: userID }
            }
    }, { new: true})

    res.status(200).json({
        status: "success",
        data
    })
}

exports.setScore = async function(req, res, next){
    console.log(req.body, "body");
    const { scores, userID } = req.body;

    let { poll, _id } = await pollsModel.findOne({ active: true });
    console.log(_id, "id")

    for(let id_user in scores){
        poll.forEach(el => {
            if(id_user === el._id)
                el.cnt += scores[id_user]
        })
    }

    try{
        var result = await pollsModel.findOneAndUpdate( { active: true }, { poll }, { new: true} );
        let res = await footballersModel.findOneAndUpdate({_id: userID}, { votedID: _id }, { new: true })
        console.log(res, "res")
    }
    catch(error){
        throw new Error(error.message);
    }
    res.status(200).json({
        status: "success",
        data: result
    })
}