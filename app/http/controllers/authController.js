const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController(){
    return {
        login : function(req,res){
            res.render('login')
        },

        postLogin(req,res,next){
            const {email, password } = req.body

            if(!email || !password){
                req.flash('error','All Fields Are Mandatory')
                return res.redirect('/login')
            }
            passport.authenticate('local',(err,user,info) => {
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }
                req.login(user,(err) => {
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req,res,next)
        },

        register : function(req,res){
            res.render('register')
        },
        async postRegister(req,res){
            const { name, email, password } = req.body

            if(!name || !email || !password){
                req.flash('error','All Fields Are Mandatory')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }
            
            User.exists({ email: email},(err,result) => {
                if (result){
                    req.flash('error','Email already in use')
                    req.flash('name',name)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
            })

            const hashedPassword = await bcrypt.hash(password,10 )

            const user = new User({
                name: name,
                email: email,
                password : hashedPassword
            })

            user.markModified();
            user.save().then(() => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('error','Something Went Wrong')
                return res.redirect('/register')
            })
        },
        logout(req,res){
            req.logout()
            return res.redirect('login')
        }
    }
}

module.exports = authController