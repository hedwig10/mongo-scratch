var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

module.exports = fucntion(app) {
    app.het("/scrape", function (req, res) {
        console.log("scrape route")
        request("https://news.utexas.edu/", function (error, response, html) {
            console.log("running request")
            if (error) {
                console.log(error)
                return res.json(error)
            }
            var $ = cheerio.load(html);
            console.log("error check passed succesfully")
            $("h2.news-headline").each(function (i, element) {

                var result = {};

                result.headline = $(element)
                    .children("a")
                    .text();
                result.summary = $("element")
                    .siblings("div.body-copy")
                    .children("p")
                    .text();
                result.url = $(element)
                    .children("a")
                    .attr("href");
                console.log("results: " + JSON.stringify(result))

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle)
                    })
                    .catch(function (err) {
                        return res.json(err)
                    });
            });
        });
        res.redirect("/")
    });
}