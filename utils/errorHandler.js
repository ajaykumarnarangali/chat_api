module.exports.errorHandler=(code,message)=>{
    let error=new Error();
    error.status=code;
    error.message=message;
    return error
}