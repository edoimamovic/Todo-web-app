module.exports = function(app)
{
    app.get("/api/zadaci",
        function(request, response)
        {

            todo.find({korisnik_id: request.query.korisnik}, function(err, svi_zadaci)
            {
                if (err)
                    response.send(err);

                response.json(svi_zadaci);
            });
        });

    app.post("/api/zadaci",
        function(request, response)
        {
            todo.create({tekst: request.body.tekst, korisnik_id: request.body.korisnik, uradjen: false}, function(err, novi_zadatak)
            {
                if (err)
                    response.send(err);

                todo.find({korisnik_id: request.body.korisnik}, function(err, svi_zadaci)
                {
                    if (err)
                        response.send(err);

                    response.json(svi_zadaci);
                });
            });

        });

    app.post("/api/azuriraj_zadatak",
        function(request, response)
        {
            todo.update({_id: request.body._id}, { $set: { tekst: request.body.tekst }}).exec();
        });

    app.delete("/api/zadaci:id_zadatka", function(request, response)
    {
        todo.remove({_id: request.params.id_zadatka}, function(err, izbrisani)
        {
            if (err)
                response.send(err);

            todo.find({}, function(err, svi_zadaci)
            {
                if (err)
                    response.send(err);

                response.json(svi_zadaci);
            });
        });
    });



    app.post("/api/login", function(req, res)
    {
        console.log(req.body.uname);
        korisnik.findOne({username: req.body.uname, password: req.body.pass}, function(err, kor)
        {
            console.log("pokusavam se ulogovati kao " + req.body.uname);

            if (err || kor == null)
                kor = {username: "", password: ""};

            res.json(kor);
        })
    });

    app.post("/api/registracija_korisnika", function(request, response)
    {
        korisnik.create({username: request.body.reg_uname, password: request.body.reg_pass}, function(err, novi_korisnik)
        {
            if (err)
                response.send(err);

            console.log("pravim korisnika " + request.body.reg_uname);

        });
    });



    app.get('/', function(req, res, next){
        return res.sendFile("index.html");
    });
}