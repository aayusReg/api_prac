const created_by={
    type:mongoose.Types.ObjectId,
    ref:'User',
    default:null
}
const status={
    type:String,
    enum:['active','inactive'],
    default:'inactive'
}
const trigger={
    autoCreate:true,
    autoIndex:true,
    timestamps:true
}

module.exports={
    trigger,
    status,
    created_by
}