const express = require('express');
const router = express.Router();

//Create
router.post('/create', (req, res) => {
    
    (async () => {
        try{
            //get req body data
            const {name, description, price} = req.body
            await db.collection('products').doc().create({ name, description, price })

            return res.status(200).json({"message":"Product has been added to collection"})
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                "Error": error.message
            })
        }
    })()
})

//Read a specific product based on Id
router.get('/read/:id', (req, res) => {    
    (async () => {
        try{
            //get product id 
            const product_id = req.params.id
        
            const document = await db.collection('products').doc(product_id).get()//.where(id, "==", product_id).get()
            // console.log('document ', document)
        
            // console.log('product ', product)
            const response = document.data()
            //let response  = document.data()

             console.log("Response", response)

            return res.status(200).json({"message":"Here is the product you requested ", "product": response})
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                "Error": error.message
            })
        }
    })()
})

//Read all document
//Read a specific product based on Id
router.get('/read', (req, res) => {    
    (async () => {
        try{         
        
            const documents = await db.collection('products').get()
            // console.log('document ', document)
            const docs = documents.docs
          

           res.status(200).json({               
                "message":"Here are all the products you requested ", 
                "product": docs.map(doc => {
                    return {
                        "name" : doc.data().name,
                        "description": doc.data().description,
                        "price": doc.data().price,
                        "id": doc.id
                        
                    }                    
                })                        
            })
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                "Error": error.message
            })
        }
    })()
})

//Update
router.put('/update/:id', (req, res) => {
    
    (async () => {
        try{
            //get req body data
            const {name, description, price} = req.body
            await db.collection('products').doc(req.params.id).update({ name, description, price })

            return res.status(200).json({ "message":"Product has been updated" })
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                "Error": error.message
            })
        }
    })()
})

//Delete

router.delete('/delete/:id', (req, res) => {
    
    (async () => {
        try{
            //get req body data
           
            await db.collection('products').doc(req.params.id).delete()

            return res.status(200).json({ "message":"Product has been deleted" })
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                "Error": error.message
            })
        }
    })()
})

/* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
module.exports = router