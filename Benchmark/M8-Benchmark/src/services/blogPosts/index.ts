import express, { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import BlogPostsModel from "./schema";
import UsersModel from "../users/schema";
import { PostDocument } from "../../types/types";
// import q2m from "query-to-mongo";

const blogPostsRouter = express.Router();

blogPostsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBlogPost = new BlogPostsModel(req.body);
      const createdBlogPost: PostDocument = await newBlogPost.save();
      createdBlogPost.authors.forEach(async (author) => {
        const authStr = author.toString();
        await UsersModel.findByIdAndUpdate(authStr, {
          $push: { posts: createdBlogPost._id.toString() },
        });
      });

      res.status(201).send(createdBlogPost);
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const mongoQuery = q2m(req.query);
      // const totalBlogPosts = await BlogPostsModel.countDocuments(
      //   mongoQuery.criteria
      // );
      const blogPosts = await BlogPostsModel
        .find
        // mongoQuery
        ()
        .populate("authors");
      // .limit(mongoQuery.options.limit || 10)
      // .skip(mongoQuery.options.skip || 0)
      // .sort(mongoQuery.options.sort);
      // res.send({
      //   links: mongoQuery.links("/blogPosts", totalBlogPosts),
      //   totalPages: Math.ceil(totalBlogPosts / mongoQuery.options.limit),
      //   totalBlogPosts,
      //   blogPosts,
      // });
      res.send(blogPosts);
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.get(
  "/:blogPostID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogPostID = req.params.blogPostID;

      const blogPost = await BlogPostsModel.findById(blogPostID).populate(
        "authors"
      );
      if (blogPost) {
        res.send({ ...blogPost.toObject(), totalLikes: blogPost.likes.length });
      } else {
        next(createHttpError(404, `BlogPost with id ${blogPostID} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.put(
  "/:blogPostID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogPostID = req.params.blogPostID;
      const updatedBlogPost = await BlogPostsModel.findByIdAndUpdate(
        blogPostID,
        req.body,
        {
          new: true,
        }
      );
      if (updatedBlogPost) {
        res.send(updatedBlogPost);
      } else {
        next(createHttpError(404, `User with id ${blogPostID} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.delete(
  "/:blogPostID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogPostID = req.params.blogPostID;
      const deletedBlogPost = await BlogPostsModel.findByIdAndDelete(
        blogPostID
      );
      if (deletedBlogPost) {
        res.status(204).send();
      } else {
        next(createHttpError(404, `User with id ${blogPostID} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.put(
  "/:blogPostID/likes",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogPostID = req.params.blogPostID;
      const user = await UsersModel.findById(req.body.likedById);
      if (!user) {
        next(
          createHttpError(
            404,
            `User with id ${req.body.likedById} does not exist`
          )
        );
      }
      const blogPost = await BlogPostsModel.findById(blogPostID);
      if (
        blogPost &&
        blogPost.likes.findIndex((id) => id === req.body.likedById) < 0
      ) {
        next(
          createHttpError(
            400,
            `User with id ${req.body.likedById} has already liked blogPost with id ${blogPostID}`
          )
        );
      } else {
        const updatedBlogPost = await BlogPostsModel.findByIdAndUpdate(
          blogPostID,
          {
            $push: { likes: req.body.likedById },
          },
          {
            new: true,
          }
        );
        if (updatedBlogPost) {
          res.send({
            ...updatedBlogPost.toObject(),
            totalLikes: updatedBlogPost.likes.length,
          });
        } else {
          next(
            createHttpError(404, `BlogPost with id ${blogPostID} not found!`)
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.post(
  "/:blogPostID/comments",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const modifiedBlogPost = await BlogPostsModel.findByIdAndUpdate(
        req.params.blogPostID,
        { $push: { comments: { comment: req.body.comment } } },
        { new: true }
      );
      if (modifiedBlogPost) {
        const newComment = modifiedBlogPost.comments.find(
          (comment) => comment.comment === req.body.comment
        );
        if (newComment) {
          res.send({
            comment: newComment.comment,
            _id: newComment._id.toString(),
            createdAt: newComment.createdAt,
          });
        } else {
          next("failed to upload comment");
        }
      } else {
        next(
          createHttpError(
            404,
            `BlogPost with id ${req.params.blogPostID} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.get(
  "/:blogPostID/comments",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogPost = await BlogPostsModel.findById(req.params.blogPostID);
      if (blogPost) {
        res.send(blogPost.comments);
      } else {
        next(
          createHttpError(
            404,
            `BlogPost with id ${req.params.blogPostID} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.get(
  "/:blogPostID/comments/:commentID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogPost = await BlogPostsModel.findById(req.params.blogPostID);
      if (blogPost) {
        const comment = blogPost.comments.find(
          (comment) => comment._id.toString() === req.params.commentID
        );
        if (comment) {
          res.send(comment);
        } else {
          next(
            createHttpError(
              404,
              `Comment with id ${req.params.commentID} not found!`
            )
          );
        }
      } else {
        next(
          createHttpError(
            404,
            `BlogPost with id ${req.params.blogPostID} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.put(
  "/:blogPostID/comments/:commentID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogPost = await BlogPostsModel.findById(req.params.blogPostID);
      if (blogPost) {
        const index = blogPost.comments.findIndex(
          (book) => book._id.toString() === req.params.commentID
        );

        if (index !== -1) {
          blogPost.comments[index] = {
            ...blogPost.comments[index].toObject(),
            ...req.body,
          };
          await blogPost.save();
          const comment = blogPost.comments.find(
            (comment) => comment._id.toString() === req.params.commentID
          );
          res.send(comment);
        } else {
          next(
            createHttpError(
              404,
              `Book with id ${req.params.commentID} not found!`
            )
          );
        }
      } else {
        next(
          createHttpError(
            404,
            `BlogPost with id ${req.params.blogPostID} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

blogPostsRouter.delete(
  "/:blogPostID/comments/:commentID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const modifiedBlogPost = await BlogPostsModel.findByIdAndUpdate(
        req.params.blogPostID,
        { $pull: { comments: { _id: req.params.commentID } } },
        { new: true }
      );

      if (modifiedBlogPost) {
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            `BlogPost with id ${req.params.blogPostID} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default blogPostsRouter;
