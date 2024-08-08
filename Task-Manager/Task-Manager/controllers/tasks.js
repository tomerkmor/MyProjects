const Task = require('../models/Task')

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

// async because we will use it on a task that uses 'await'
const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getSingleTask = async (req,res) => {
    console.log("trying to get info")
    try {
        const {id: taskID} = req.params

        const task = await Task.findOne({_id: taskID})
        if (!task) {
            //return next(createCustomError(`No task with id : ${taskID}`, 404))
            return res.status(404).json({msg: `No task with id of: ${taskID} was found`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


const updateSingleTask = async (req,res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body,{
            // ?? - it avoids cases of empty update, but how?
            new: true,
            runValidators: true,
        })
        
        if (!task) {
            //return next(createCustomError(`No task with id : ${taskID}`, 404))
            return res.status(404).json({msg: `No task with id of: ${taskID} was found`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


const deleteSingleTask = async (req,res) => {
    console.log("trying to delete")
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if (!task) {
            //return next(createCustomError(`No task with id : ${taskID}`, 404))
            return res.status(404).json({msg: `No task with id of: ${taskID} was found`})
        }
        res.status(200).json({status: 'successful delete', task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateSingleTask,
    deleteSingleTask
}