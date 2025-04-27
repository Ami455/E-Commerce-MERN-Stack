const roleMiddleware =(role) =>{
    return(req,res,next)=>{
        if(role != req.user.role){
            return res.status(403).json({
                message: "You are not authorized ",
<<<<<<<<< Temporary merge branch 1
              });
            }
            next();
=========
            });
            
            
        }
        console.log("role");
        next();
>>>>>>>>> Temporary merge branch 2
    }
}


module.exports = roleMiddleware;