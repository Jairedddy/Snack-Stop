const Menu = require("../../models/menu")
function homeController(){
    return {
        async index(req,res){
            const snacks = await Menu.find()
            return res.render('home',{snacks : snacks })            
        }
    }
}

module.exports = homeController