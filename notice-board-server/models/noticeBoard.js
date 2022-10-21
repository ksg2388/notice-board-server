const mongoose = require("mongoose");

const noticeBoardSchema = new mongoose.Schema({
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
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user: {
    id: String,
    username: String,
  },
});

module.exports = mongoose.model("NoticeBoard", noticeBoardSchema);
