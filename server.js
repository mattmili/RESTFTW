var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    router = express.Router(),
    app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// connect to db
mongoose.connect('mongodb://localhost/users');

// create db schema
var dbSchema = mongoose.Schema({
    name: String,
    skill: String
});

var User = mongoose.model('User', dbSchema);

router.route('/')
    
    // GET
    .get(function (req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.send(users);
        });
    })

    // POST
    .post(function (req, res) {
        var user = new User();
        user.name = req.body.name;
        user.skill = req.body.skill;

        user.save(function(err) {
            if (err)
                res.send(err);

            res.send({message: "User created"});
        });
    });

router.route('/:user_id')
    .put(function(req, res) {
        User.findOne({_id: req.params.user_id}, function(err, user) {
            user.name = req.body.name;
            user.skill = req.body.skill;

            user.save(function(err) {
                if (err)
                    res.send(err);
                res.send({message: "User updated"});
            });

        });
    })
    .delete(function (req, res) {
        User.remove({_id: req.params.user_id}, function(err) {
            if (err)
                res.send(err);
            res.json({message: "User Deleted!"});
        });
    });

app.use(router);

app.listen(port);