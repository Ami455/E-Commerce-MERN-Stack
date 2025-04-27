const roleMiddleware = (role) => {
    return (req, res, next) => {

        if (role != req.user.role) {
            return res.status(403).json({
                message: "You are not authorized ",
            });
            
            
        }
        console.log("role");
        next();
    }
}


module.exports = roleMiddleware;