const DatastoreUser = require('nedb');
const DataUsers = new DatastoreUser({ filename: 'users' });
DataUsers.loadDatabase();

const DatastoreProfile = require('nedb');
const DataProfile = new DatastoreProfile({ filename: 'profile' });
DataProfile.loadDatabase();

const DatastoreReg = require('nedb');
const DataReg = new DatastoreReg({ filename: 'reg' });
DataReg.loadDatabase();

const DatastoreWall = require('nedb');
const DataWall = new DatastoreWall({filename: 'wall'});
DataWall.loadDatabase();

const DatastoreDialogs = require('nedb');
const DataDialogs = new DatastoreDialogs({filename: 'dialogs'});
DataDialogs.loadDatabase();

const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require('memorystore')(session);
const cors = require("cors");
var buffer = require('buffer');
var path = require('path');
const TIME_SESSION = 1000 * 60 * 60;

let app = express();

function Paginator(err, docs, req) {
    let count = 5;
    let startArr = (Number(1) - 1) * count;
    if (req.query.count != undefined && Number(req.query.count) > 0) {
        count = req.query.count;
    }
    let maxPage = Math.ceil(docs.length / count);
    if (req.query.page != undefined && Number(req.query.page) > 0 && Number(req.query.page) <= maxPage) {
        startArr = (Number(req.query.page) - 1) * count;
    }
    let state = { users: [...docs], maxPage: maxPage > 0 ? maxPage : 1 };
    state.users = state.users.splice(startArr, count);
    return state;

}

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
    name: "social-site",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    secure: false,
    store: new MongoStore({ checkPeriod: TIME_SESSION }),
    cookie: {
        maxAge: TIME_SESSION,
        httpOnly: true,
        secure: false
    }
}))

app.get("/", (req, res) => {
    const { userID } = req.session;
})


app.use(express.static(__dirname + '/images'));


app.get("/users", (req, res) => {
    DataProfile.persistence.compactDatafile();
    DataProfile.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {
            let frend = docs[0].frends.map(i => { return { id: i.id } })
            let mayBeFrends = docs[0].mayBeFrends.map(i => { return { id: i.id } })
            let frendsRequests = docs[0].frendsRequests.map(i => { return i.id })
            DataUsers.find({ $not: { $or: [...frend, ...mayBeFrends, { id: req.session.userID }] } }).limit().exec((err, docs) => {
                let state = Paginator(err, docs, req);
                res.send({
                    ...state,
                    frendsRequests
                })
                res.status(200);
            })
        }
    });

})

//profile 
app.get("/profile/id:id", (req, res) => {
    DataWall.persistence.compactDatafile();
    DataProfile.persistence.compactDatafile();
    DataProfile.find({ id: Number(req.params.id) }).limit(1).exec((err, docs) => {
        if(docs.length > 0)
        {
            DataWall.find({ idProfile: Number(req.params.id)}).limit(1).exec((err, wall) => {
                let wallUsers = [];
               if( wall[0].MyWall.length > 0)  {
                   
                   wallUsers = [
                    {...docs[0],
                    Wall: wall[0].MyWall.reverse()}
                ]}else{wallUsers = [{
                    ...docs[0]
                }];}
            res.send(wallUsers)
            res.status(200);
            })
        }

    }
    );

})

app.post("/profile/wall",(req, res) => {
    DataUsers.find({id: req.session.userID}).limit(1).exec((err,docs)=>{
        if(docs.length > 0)
        {DataWall.find({idProfile :req.body.userId}).limit(1).exec((err,profileWall) =>{
        let message =  {
                    id: profileWall[0].MyWall.length > 0 ?
                    ++profileWall[0].MyWall[profileWall[0].MyWall.length - 1].id:
                    1,
                    idUser:docs[0].id,
                    avatar:docs[0].avatar,
                    name:docs[0].name,
                    text:req.body.message,
                    time:req.body.time,
                    countLike:[]
                    }
                
  DataWall.update({idProfile:req.body.userId},{$push:{MyWall:message}},{},()=>{})
    })
                    res.send("Operation sucersful")
    }
    })
    
})

app.post("/profile/wall/like",(req, res) => {
    DataUsers.find({id: req.session.userID}).limit(1).exec((err,docs)=>{
        if(docs.length > 0)
        {DataWall.find({idProfile :req.body.userId}).limit(1).exec((err,profileWall) =>{
        let message =  {
                    id:profileWall[0].MyWall.length + 1,
                    idUser:docs[0].id,
                    avatar:docs[0].avatar,
                    name:docs[0].name,
                    text:req.body.message,
                    time:req.body.time,
                    countLike:[]
                    }
                
    //  DataWall.update({idProfile:req.body.userId},{$push:{MyWall:message}},{},()=>{})
    })
                    res.send("Operation sucersful")
    }
    })
    
})

app.get("/authentication", (req, res) => {
    DataReg.find({ mail: req.query.mail, password: req.query.password }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {
            req.session.userID = docs[0].idUser;
            req.session.save();
            res.send({
                ...docs[0],
                AU: true
            }
            )
        } else {
            res.send({
                message: "Неверный маил или пароль",
                AU: false
            })

        }
    })
})
//session work
app.get("/session", (req, res) => {
    DataReg.find({ idUser: req.session.userID }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {
            delete docs[0].password;
            delete docs[0]._id;
            res.send({
                user: {
                    ...docs[0]
                },
                AU: true
            }
            )
        } else {
            res.send({
                message: "Вы не зарегистрированны",
                AU: false,
                dd: req.session
            })

        }
    });

})

app.delete("/session", (req, res) => {
    if (req.session.userID > 0)
        req.session.userID = "";
})

//frends work
app.get("/frends", (req, res) => {
    DataUsers.persistence.compactDatafile();
    DataProfile.persistence.compactDatafile();
    DataProfile.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {
            res.send({
                frends: Paginator(err, docs[0].frends, req),
                mayBeFrends: Paginator(err, docs[0].mayBeFrends, req),
                frendsRequests: Paginator(err, docs[0].frendsRequests, req)
            });
            res.status(200);
        } else {
            res.send({ message: "У Вас Нет пока друзей=(" })
            res.status(200);
        }

    });
})

app.post("/frends", (req, res) => {
    DataProfile.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {
            docs[0].mayBeFrends.forEach(items => {
                if (items.id === req.body.userFrendID) {
                    delete items._id
                    DataProfile.update({ id: req.session.userID }, { $push: { frends: items } }, {}, () => { });
                    DataProfile.update({ id: req.session.userID }, { $pull: { mayBeFrends: items } }, {}, () => { });
                    DataUsers.find({ id: req.session.userID }).limit(1).exec((err, documents) => {
                        if (documents.length > 0) {
                            delete documents[0]._id
                            DataProfile.update({ id: req.body.userFrendID }, { $push: { frends: documents[0] } }, {}, () => { })
                            DataProfile.update({ id: req.body.userFrendID }, { $pull: { frendsRequests: documents[0] } }, {}, () => { })
                        }
                    }
                    )
                }
            });
            res.send("Operation sucersful");
        }
    });

})

app.post("/frendsDel", (req, res) => {
    DataProfile.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {
            docs[0].frends.forEach(items => {
                if (items.id === req.body.userFrendID) {
                    delete items._id
                    DataProfile.update({ id: req.session.userID }, { $pull: { frends: items } }, {}, () => { });
                    DataProfile.update({ id: req.session.userID }, { $push: { mayBeFrends: items } }, {}, () => { });
                    DataUsers.find({ id: req.session.userID }).limit(1).exec((err, doci) => {
                        if (doci.length > 0) {
                            delete doci[0]._id
                            DataProfile.update({ id: req.body.userFrendID }, { $pull: { frends: doci[0] } }, {}, () => { })
                            DataProfile.update({ id: req.body.userFrendID }, { $push: { frendsRequests: doci[0] } }, {}, () => { })
                        }
                    }
                    )
                }
            });
            res.send("Operation sucersful");
        }
    });

})

app.post("/MayBeFrandDel", (req, res) => {
    if (req.session.userID > 0) {
        DataUsers.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
            delete docs[0]._id;
            DataProfile.update({ id: req.body.userFrendID }, { $pull: { frendsRequests: docs[0] } }, {}, () => { });
        })
        DataUsers.find({ id: req.body.userFrendID }).limit(1).exec((err, docs) => {
            delete docs[0]._id;
            DataProfile.update({ id: req.session.userID }, { $pull: { mayBeFrends: docs[0] } }, {}, () => { });
        })
        res.send("Operation sucersful");
    }
})
//follow user or
app.post("/frendsRequests", (req, res) => {
    if (req.session.userID > 0) {
        DataUsers.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
            delete docs[0]._id;
            DataProfile.update({ id: req.body.userFrendID }, { $push: { mayBeFrends: docs[0] } }, {}, () => { });
        })
        DataUsers.find({ id: req.body.userFrendID }).limit(1).exec((err, docs) => {
            delete docs[0]._id;
            DataProfile.update({ id: req.session.userID }, { $push: { frendsRequests: docs[0] } }, {}, () => { });
        })
        res.send("Operation sucersful");
    }
})

app.post("/frendsRequestsDel", (req, res) => {
    DataProfile.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {
            docs[0].frendsRequests.forEach(items => {
                if (items.id === req.body.userFrendID) {
                    delete items._id
                    DataProfile.update({ id: req.session.userID }, { $pull: { frendsRequests: items } }, {}, () => { });
                    DataUsers.find({ id: req.session.userID }).limit(1).exec((err, docr) => {
                        if (docr.length > 0) {
                            delete docr[0]._id
                            DataProfile.update({ id: req.body.userFrendID }, { $pull: { mayBeFrends: docr[0] } }, {}, () => { })
                        }
                    }
                    )
                }
            });
            res.send("Operation sucersful");
        }
    });

})

//gallery
app.get("/gallery", (req, res) => {
    if (req.query.id == undefined || Number(req.query.id) <= 0) {
        DataProfile.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
            if (docs.length > 0) {
                res.send(docs[0].Gallery)
            }
        })
    } else {
        DataProfile.find({ id: Number(req.query.id) }).limit(1).exec((err, docs) => {
            if (docs.length > 0) {
                res.send(docs[0].Gallery)
            }
        })
    }
})




app.post('/gallery', (req, res) => {
    DataProfile.find({ id: req.session.userID }).limit(1).exec((err, docs) => {
        if (docs.length > 0) {

            let buf = Buffer.from(req.body.file, 'base64');
            let x = path.join('images', 'gallery', String('/id' + req.session.userID), String('Img' + (docs[0].Gallery.length + 1) + '.jpg'));
            fs.writeFileSync(x, buf);
            let serverPath = "http://localhost:3000/gallery/id" + 
            req.session.userID + 
            String('/Img' + (docs[0].Gallery.length + 1)+'.jpg');
            let v = { id: docs[0].Gallery.length + 1, src:serverPath} 
            res.send(v);
            DataProfile.update({ id: req.session.userID },
                { $push: { Gallery: v } },
                {},
                () => { });
        }

    })
})
 
app.post('/avatar',(req,res)=>{
  DataProfile.find({id: req.session.userID}).limit(1).exec((err,docs)=>{
        if(docs.length > 0){
            let buf = Buffer.from(req.body.file, 'base64');
            let x = path.join('images', 'avatar', String("/id" + req.session.userID + ".jpg"));
            fs.writeFileSync(x, buf);
            let serverPath = "http://localhost:3000/avatar/id" +  req.session.userID + ".jpg"
            DataProfile.update({id: req.session.userID},{$set:{avatar: serverPath }},{},()=>{})
            DataUsers.update({id: req.session.userID},{$set:{avatar: serverPath }},{},()=>{})
      }
   })
})

//message dialog
class createDialog{
    constructor(myId, usersId){ 
        this.dataStore =  require('nedb');
        this.pathMessage = "messageDate/id" + myId;
        fs.access(this.pathMessage,(err)=>{
            if(err){
                fs.mkdirSync(this.pathMessage);
            }
        })
        this.dataMessage = new this.dataStore({filename:this.pathMessage + '/id' + myId + '_id' + usersId});
        this.dataMessage.loadDatabase();
        return this.dataMessage;
    }
}


app.get("/testMessage",(req,res) => {
  let baseMessage = new createDialog(2,1);

})

app.listen(3000, () => { })