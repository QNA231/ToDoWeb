import { json } from 'express';
import Task from '../models/Task.js';

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find().sort({createdAt: "desc"});
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Lỗi khi gọi getAllTask", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
};

export const createTask = async (req, res) => {
    try {
        const {title} = req.body;
        const task = new Task({title});

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Lỗi khi gọi createTask", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
};

export const updateTask = async (req, res) => {
    try {
        const {title, status, completedAt} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.param.id,
            {
                title,
                status,
                completedAt
            },
            {new: true}
        );

        if (!updatedTask){
            return res.status(404).json({message: "Nhiệm vụ không tồn tại!"})
        }
        res.status(200).json(updatedTask);
    } catch (error) {        
        console.error("Lỗi khi gọi updateTask", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.param.id);

        if (!deletedTask){
            return res.status(404).json({message: "Nhiệm vụ không tồn tại!"})
        }
        res.status(200).json(deletedTask);
    } catch (error) {        
        console.error("Lỗi khi gọi deleteTask", error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
};