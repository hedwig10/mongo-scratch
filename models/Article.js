var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  url:{
    type:String,
    required: true,
    unique: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }],
  isSaved:{ 
  type: Boolean,
  default: false
}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
