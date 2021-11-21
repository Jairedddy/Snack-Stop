function cartController(){
    return {
        index : function(req,res){
            res.render('cart')
        },
        update(req,res){

            if (!req.session.cart){
                req.session.cart = {
                    menuitems: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
            console.log(req.body)

            if(!cart.menuitems[req.body._id]){
                cart.menuitems[req.body._id]={
                    menuitem : req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }
            else{
                cart.menuitems[req.body._id].qty += 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }

            return res.json({ totalQty: req.session.cart.totalQty})
        }
    }
}

module.exports = cartController