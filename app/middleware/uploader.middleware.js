const multer=require('multer')

const myStorage=multer.diskStorage({
    filename:(req,file,next)=>{
        let file_name=Date.now()+'-'+file.originalname
        next(null,file_name)
    },
    destination:(req,file,next)=>{
        let path="public"
        next(null,path)
    }
})

const imgFilter=(req,file,next)=>{
    let allowed=['jpg','jpeg','png','gif']
    let file_split=file.originalname.split('.')
    let ext=file_split.pop()
    if(allowed.includes(ext)){
        next(null,true)
    }else{
        next({
            status:404,
            msg:'file format not supported'
        })
    }
}

const uploader=multer({
    storage:myStorage,
    fileFilter:imgFilter,
    limits:{
        fileSize:350000
    }
})

module.exports=uploader