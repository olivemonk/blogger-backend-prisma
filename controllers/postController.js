const prisma = require("../prisma/index");

// create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;
    // validation
    if (!slug || !title || !body || !authorId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });
    res.status(201).json(result);
  } catch (error) {
    throw new Error(error);
  }
};
// update a post
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const result = await prisma.post.update({
      where: {
        id: id,
        data: {
          title: title,
          body: body,
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    throw new Error(error);
    res.status(500).json({ error: `Post with ${id} doen't exist` });
  }
};
// delete a post
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    throw new Error(error);
    res.status(500).json({ error: `Post with ${id} doen't exist` });
  }
};
// get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const result = await prisma.post.findMany()
    res.status(200).json(result);
  } catch (error) {
    throw new Error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}