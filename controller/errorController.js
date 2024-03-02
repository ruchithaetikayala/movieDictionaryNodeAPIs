
const AppError = require("../utils/appError")

const handleDuplicateFieldsDB=err=>{
    const fieldValue =err.keyValue
    const message = `Duplicate field value ${JSON.stringify(fieldValue)}.Please use another movieID`
    return new AppError(message,400)
}

const handleValidationError = err =>{
    console.log('entered')
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid Input data : ${errors.join('. ')} `
    return new AppError(message,400)
}


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    //Handled errors
    if(err.isHandled){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else{
        //unhandled error for customer to not panic them
        //1. log error to console ,for debugging in production
        console.log('Error',err)
        //2.Send generic error for customer
        res.status(500).json({
            status: err.status,
            message: 'Internal Sever Error'
        })
    }
}

module.exports = (err, req, res, next) => {
    // set locals, only providing error in development
    err.status = err.status || 500
    err.statusCode = err.statusCode || 500;

    // render the errors
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else {
        let error = {...err}
        if(error.code === 11000) error= handleDuplicateFieldsDB(error)
        if(err.name === 'ValidationError') error= handleValidationError(error)
        sendErrorProd(error, res)
    }
}