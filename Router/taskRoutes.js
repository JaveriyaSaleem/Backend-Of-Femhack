import express from "express"
import Task from "../Models/Task.js"
import SignupRouter from "../Models/SignupModal.js"
import mongoose from "mongoose"
const router = express.Router()



// define the home page route
router.get('/', async(req, res) => {
    try{
        const task = await Task.find(); 
        res.json(task); 
      }catch(e){
        res.status(500).json({ message: e.message });
      }
})

router.post('/', async (req, res) => {
  try {
    // Destructure fields from the request body
    const { title, description, assignedTo, status } = req.body;

    // Basic validation for required fields
    if (!title || !description || !assignedTo) {
      return res.status(400).json({ message: "Missing required fields: title, description, or assignedTo." });
    }

    // Create a new task
    const task = new Task({
      title,
      description,
      assignedTo,
      status: status || 'To Do'  // Default to 'To Do' if status is not provided
    });

    // Save the task to the database
    await task.save();

    // Return the newly created task in the response
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `Error creating task: ${e.message}` });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
  router.put('/:id', async (req, res) => {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(task);
  })

export default router