import { Router } from "express";
import q2m from "query-to-mongo";
import { postPicture } from "./upload.js";
import PostModel from "./schema.js";
import LikeModel from "./likeSchema.js";
import CommentModel from "./commentsSchema.js";
import ProfileModel from "../profile/schema.js";
import createHttpError from "http-errors";

const postRouter = Router();

postRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query = q2m(req.query);
      const posts = await PostModel.find().populate("user");
      // .sort(query.options.sort)
      // .skip(query.options.skip)
      // .limit(query.options.limit || 5);
      const enrichedPosts = Promise.all(
        posts.map(async (post) => {
          return {
            ...post.toObject(),
            likes: await LikeModel.countDocuments({ post: post._id }),
            likedByUser:
              (
                await LikeModel.find({
                  post: post._id,
                  user: process.env.ME_ID,
                })
              ).length > 0,
            comment: await CommentModel.find({ post: post._id }).populate(
              "user"
            ),
          };
        })
      );
      res.status(200).send(await enrichedPosts);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    // console.log(
    //   "this is user",
    //   await ProfileModel.findOne({ username: "Cover" })
    // );
    try {
      const newPost = await PostModel.create(req.body);

      // const username = await ProfileModel.findOne({ username: req.body })

      // const errors = validationResult(req)             THIS IS USEFUL IF WE ADD VALIDATION
      // if (!errors.isEmpty()) return next(createHttpError(400, errors))         THIS IS USEFUL IF WE ADD VALIDATION
      // const posts = await PostModel(...req.body.toObject);
      // const { _id } = await posts.save();
      res.status(201).send(newPost);
    } catch (error) {
      next(error);
    }
  });

postRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      if (req.params.id.length !== 24)
        return next(createHttpError(400, "Invalid ID"));
      const posts = await PostModel.findById(req.params.id).populate("user");
      if (posts === null) {
        ("this post doesn't exist");
      } else {
        const likes = await LikeModel.countDocuments({ post: req.params.id });
        const comments = await CommentModel.find({ post: req.params.id });
        res.send({ ...posts.toObject(), likes, comments });
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    console.log(req.body);
    try {
      if (req.params.id.length !== 24)
        return next(createHttpError(400, "Invalid ID"));
      const posts = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (posts === null) {
        ("this post doesn't exist");
      } else {
        res.send(posts);
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      if (req.params.id.length !== 24)
        return next(createHttpError(400, "Invalid ID"));
      const posts = await PostModel.findByIdAndDelete(req.params.id);
      if (posts) {
        res.status(204).send();
      } else {
        next(createHttpError(404, "Not found!"));
      }
    } catch (error) {
      next(error);
    }
  });

postRouter.post("/:id/postImage", postPicture, async (req, res, next) => {
  try {
    const imagePath = req.file.path;
    // console.log("this is the pPath", imagePath)
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      { image: imagePath },
      { new: true }
    );

    res.send(updatedPost);
  } catch (error) {
    next(error);
  }
});

postRouter
  .route("/:id/like")
  .post(async (req, res, next) => {
    try {
      const user = await ProfileModel.findById(req.body?.user);
      const post = await PostModel.findById(req.params?.id);
      if (user) {
        if (post) {
          const isLiked = await LikeModel.find({
            user: req.body?.user,
            post: req.params?.id,
          });
          if (isLiked.length !== 0) {
            next(createHttpError(409, "User has already liked this post"));
          } else {
            const newLike = await LikeModel.create({
              user: req.body?.user,
              post: req.params?.id,
            });
            res.status(201).send(newLike);
          }
        } else {
          next(createHttpError(404, "post not found"));
        }
      } else {
        next(createHttpError(404, "User not found"));
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedLike = await LikeModel.deleteOne({
        user: req.body?.user,
        post: req.params?.id,
      });
      if (deletedLike) {
        res.status(204).send();
      } else {
        next(createHttpError(404, "not found"));
      }
    } catch (error) {
      next(error);
    }
  });

postRouter
  .route("/:id/comment")
  .get(async (req, res, next) => {
    try {
      const comments = await CommentModel.find();
      res.send(comments);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await ProfileModel.findById(req.body?.user);
      const post = await PostModel.findById(req.params?.id);
      if (user) {
        if (post) {
          const newComment = await CommentModel.create({
            user: req.body?.user,
            post: req.params?.id,
            comment: req.body?.comment,
          });
          if (newComment) {
            res.status(201).send(newComment);
          } else {
            next(error);
          }
        } else {
          next(createHttpError(404, "post not found"));
        }
      } else {
        next(createHttpError(404, "User not found"));
      }
    } catch (error) {
      next(error);
    }
  });

postRouter
  .route("/:id/comment/:commentId")
  .put(async (req, res, next) => {
    try {
      const updatedComment = await CommentModel.findByIdAndUpdate(
        req.params.commentId,
        { comment: req.body?.comment },
        { new: true }
      );
      if (updatedComment) {
        res.send(updatedComment);
      } else {
        next(createHttpError(404, "comment not found"));
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedComment = await CommentModel.findByIdAndDelete(
        req.params.commentId
      );
      if (deletedComment) {
        res.status(204).send();
      } else {
        next(createHttpError(404, "comment not found"));
      }
    } catch (error) {
      next(error);
    }
  });

export default postRouter;
