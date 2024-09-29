const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

app.set("view engine", "ejs");
// app.set('views', views);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

////////////////////Mongoose connection//////////////////////
mongoose
  .connect(
    "mongodb+srv://creativeblaster14:ejzS3i8XBNWKcg24@cluster0.0ep1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Mongo Connected");
    //////////GET DOCUMENTS ////////////
app.get("/articles", async function (req, res) {
  try {
    const foundArticles = await Article.find().lean(); // Use await without callbacks
    if (foundArticles.length === 0) {
      console.log("No articles found");
    } else {
      console.log(foundArticles);
    }
    res.send(foundArticles);
  } catch (error) {
    console.log(error);
  }
});

app.post("/articles", function (req, res) {
  console.log(req.body.title);
  console.log(req.body.content);
  const newArticle = new Article({
    title : req.body.title,
    content: req.body.content
  });
  newArticle.save();    
  });
  })
  .catch((err) => console.error(err));





app.listen(3000, () => {
  console.log("Server Started");
});
