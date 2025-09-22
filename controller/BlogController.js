const Blog = require('../models/Blogs')


const GetBlog = async (req, res) => {
    try {
        const blog = await Blog.findAll()
        res.status(200).json({
            success: false,
            message: "Daftar Blog"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const CreateBlog = async (req, res) => {
    try {
        const { title, synopsis, content, status, cover } = req.body
    } catch (error) {

    }
}

module.exports = { GetBlog }