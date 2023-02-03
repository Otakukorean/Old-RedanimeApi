const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const Port = process.env.PORT || 8080;
const db = require('./models');
const cors = require('cors');
const morgan = require("morgan")
const helmet = require("helmet");
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session =require('express-session');
const path = require('path');
app.use(express.json());
app.use(cors( {
      origin: ['https://redanime.net','http://localhost:3000'],
      credentials:true
   
    }));
global.__basedir = __dirname;
app.use(morgan("common"))
app.use(helmet({
    referrerPolicy: false
}));
app.use(cookieparser())
app.use(bodyparser.urlencoded({extended: true}));

app.get("/" , (req,res) => {
    res.send("Hello")
})
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const userRoutes = require('./routes/UserRoute.js')
app.use('/user' , userRoutes)


const GenerRoutes = require('./routes/CategoryRoute.js')
app.use('/gener' , GenerRoutes)


app.use(express.static('Uploads'));

const TagRoutes = require('./routes/tagRoute.js')
app.use('/tag' , TagRoutes)


const ShowsRoute = require('./routes/ShowsRoute.js')
app.use('/shows' , ShowsRoute)

const EpisodeRoutes = require('./routes/EpisodesRoute.js')
app.use('/episodes', EpisodeRoutes)

const watchlistRoutes = require('./routes/WatchlistRoute.js')
app.use('/watchlist' , watchlistRoutes)

const favoritelistRoutes = require('./routes/favorite_listRoute.js')
app.use('/favorite' , favoritelistRoutes)

const historyRoutes = require('./routes/historyRoute.js')
app.use('/history' , historyRoutes)
const CommentRoutes = require('./routes/Comment.js')
app.use('/comment' , CommentRoutes)

app.use( '/Uploads/',express.static('./Uploads'))

const viewRoute = require('./routes/PageView.js')
app.use('/view',viewRoute)


app.get('*', function(req, res){
  res.status(404).json({error:"Page Not Found"})
});

db.sequelize.sync().then(() => {
    app.listen(Port , () => {
        console.log(`Listening on port ${Port}`);
        console.log(`${path.join(__dirname, '..',"client" , 'src','assets' , 'Uploads')}`)
    })

})
