const mongoose =require('mongoose')
const { ENV, DB } = require('./config')

let db_url=null
if(ENV==='DEV'){
    db_url=`${DB.PROTOCOL}://${DB.HOST}:${DB.PORT}/${DB.NAME}`
}

let connect=mongoose.connect(db_url,{
    autoCreate:true,
    autoIndex:true
})

if(connect){
    console.log('DB CONNECTED')
}else{
    console.log('DB NOT CONNECTED')
}