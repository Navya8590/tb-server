const blogs = require('../models/blogModel')

// add blogs
exports.addBlogController = async (req,res)=>{
    console.log("inside addBlogController");
    const userId = req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log(req.file);
    const {title,discription} =req.body
    const blogImage = req.file.filename
    try{
        const existingBlog = await blogs.findOne({discription})
        if(existingBlog){
            res.status(406).json("Blog Already exists.. please upload another!!")
        }else{
            const newBlog = new blogs({
                title,discription,blogImage,userId
            })
            await newBlog.save()
            res.status(200).json(newBlog)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get user blogs - authorised user
exports.getUserBlogsController = async(req,res)=>{
    console.log("Inside getUserBlogsController");
    const userId = req.userId
    try{
        const allUserBlogs = await blogs.find({userId})
        res.status(200).json(allUserBlogs)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all blogs - authorised user
exports.getAllBlogsController = async(req,res)=>{
    console.log("Inside getAllBlogsController");
    try{
        const allBlogs = await blogs.find()
        res.status(200).json(allBlogs)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit blog
exports.editBlogController = async(req,res)=>{
    console.log("inside editBlogController");
    const {id} = req.params
    const {title,discription,blogImage} = req.body
    const reUploadFileName = req.file?req.file.filename:blogImage
    const userId = req.userId
    console.log(id,title,discription,reUploadFileName,userId);
    try{
        const updatedBlog = await blogs.findByIdAndUpdate({_id:id},{
            title,discription,blogImage:reUploadFileName,userId
        },{new:true})
        await updatedBlog.save()
        res.status(200).json(updatedBlog)
    }catch(err){
        res.status(401).json(err)
    }
}

// delete blog
exports.removeBlogController = async(req,res)=>{
    console.log("inside removeBlogController");
    const {id} = req.params
    try{
        const removeBlog = await blogs.findByIdAndDelete({_id:id})
        res.status(200).json(removeBlog)
    }catch(err){
        res.status(401).json(err)
    }
}