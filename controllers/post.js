const Post =require("../models/post")
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllPosts = async (req, res) => {
    const posts = await Post.find().sort('createdAt')
    res.status(StatusCodes.OK).json({ posts, count: posts.length })
  }
  const getPost = async (req, res) => {
    const {
      user: { name },
      params: { id: postId },
    } = req
  
    const post = await Post.findOne({
      _id: postId,
      createdBy: name,
    })
    if (!post) {
      throw new NotFoundError(`No Post with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({ post })
  }
  const createPost = async (req, res) => {
    req.body.createdBy = req.user.name
    const post = await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({post })
  }

  const deletePost = async (req, res) => {
    const {
      user: { userId },
      params: { id: postId },
    } = req
  
    const post = await Post.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    })
    if (!post) {
      throw new NotFoundError(`No Posy with id ${postId}`)
    }
    res.status(StatusCodes.OK).send("Post Deleted successfully")
  }
  const updatePost = async (req, res) => {
    const {
      body: { title, body },
      user: { userId },
      params: { id: postId },
    } = req
  
    if (title === '' || body === '') {
      throw new BadRequestError('Titlw or Body fields cannot be empty')
    }
    const post = await Post.findByIdAndUpdate(
      { _id: postId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!post) {
      throw new NotFoundError(`No Post with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({ post })
  }
  module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    updatePost,
    getPost,
  }