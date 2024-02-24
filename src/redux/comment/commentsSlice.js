import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

const initialState = {

  currentUser: {
    "image": { 
      "png": "/assets/images/avatars/robot.png",
      "webp": "/assets/images/avatars/robot.webp"
    },
    "username": "Tanvi"
  },

  comments: [
    {
      "id": 1,
      "content": "Lets get ready for the biggest fest of the NORTH EAST INDIA!!",
      "score": 29,
      "user": {
        "image": { 
          "png": "assets/images/avatars/spidy.png",
          "webp": "assets/images/avatars/spidy.webp"
        },
        "username": "Isha"
      },
      "replies": []
    },
    {
      "id": 2,
      "content": "Isn't that INCANDESCENCE? When is the starting date and venue?",
      "createdAt": "2 weeks ago",
      "score": 5,
      "user": {
        "image": { 
          "png": "/assets/images/avatars/smiley.png",
          "webp": "/assets/images/avatars/smiley.webp"
        },
        "username": "Rimlee"
      },
      "replies": [
        {
          "id": 3,
          "content": "It'll commence on the 23rd of February, exclusively in NIT Silchar.",
          "createdAt": "1 week ago",
          "score": 4,
          "replyingTo": "Rimlee",
          "user": {
            "image": { 
              "png": "/assets/images/avatars/amongus.png",
              "webp": "/assets/images/avatars/amongus.webp"
            },
            "username": "Zadov",
          }
        },
        {
          "id": 4,
          "content": "Lets all have fun together!!",
          "createdAt": "2 days ago",
          "score": 2,
          "replyingTo": "Rimlee",
          "user": {
            "image": { 
              "png": "/assets/images/avatars/ghost.jpeg",
              "webp": "/assets/images/avatars/ghost.webp"
            },
            "username": "Rudrank"
          }
        }
      ]
    }
  ]
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

    addComment: (state, action) => {
      const {content} = action.payload
      const newComment = {
        id: uuidV4(),
        content,
        createdAt: 'Just now',
        score: 0,
        user: state.currentUser,
        replies: [],
      }

      state.comments.push(newComment);
    },

    editComment: (state, action) => {
      const { commentId, content } = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        comment.content = content;
      }
    },

    deleteComment: (state, action) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload)
    },

    addReply: (state, action) => {
      const { commentId, content, createdAt, replyingTo} = action.payload
      const comment = state.comments.find((comment) => comment.id == commentId)
      if (comment) {
        const newReply = {
          id: uuidV4(),
          content,
          createdAt,
          score: 0,
          user: state.currentUser,
        };

        if (replyingTo) {
          newReply.replyingTo = replyingTo;
        }
        comment.replies.push(newReply)
      }
    },

    editReply: (state, action) => {
      const { commentId, replyId, content } = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply) {
          reply.content = content;
        }
      }
    },

    deleteReply: (state, action) => {
      const { commentId, replyId } = action.payload;

      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        const replyIndex = comment.replies.findIndex((reply) => reply.id === replyId);
        if (replyIndex !== -1) {
          comment.replies.splice(replyIndex, 1);
        }
      }
    },

    // score controllers
    upVoteComment: (state, action) => {
      const comment = state.comments.find((comment) => comment.id === action.payload)
      if (comment) {
        comment.score++;
      }
    },
    
    downVoteComment: (state, action) => {
      const comment = state.comments.find((comment) => comment.id === action.payload)
      if (comment && comment.score != 0) {
        comment.score--;
      }
    },

    upVoteReply: (state, action) => {
      const {commentId, replyId} = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);

      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply) {
          reply.score++
        }
      }
    },
    
    downVoteReply: (state, action) => {
      const {commentId, replyId} = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);

      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply && reply.score != 0) {
          reply.score--
        }
      }
    },
  }
});

export const {
  addComment,
  editComment,
  deleteComment,
  addReply,
  editReply,
  deleteReply,
  upVoteComment,
  downVoteComment,
  upVoteReply,
  downVoteReply,
  
} = commentsSlice.actions;

export default commentsSlice.reducer;