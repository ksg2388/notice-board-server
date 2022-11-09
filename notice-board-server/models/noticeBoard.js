const mongoose = require("mongoose");

const noticeBoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
    },
    user: {
      id: String,
      username: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NoticeBoard", noticeBoardSchema);
