import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import jwt from "jsonwebtoken";
import Stripe from 'stripe';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zcri3cd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     await client.connect();
    // Send a ping to confirm a successful connection

    const userCollection = client.db("bistroDB").collection("users");
    const menuCollection = client.db("bistroDB").collection("menu");
    const reviewCollection = client.db("bistroDB").collection("reviews");
    const cartCollection = client.db("bistroDB").collection("carts");
    const paymentCollection = client.db("bistroDB").collection("payments");

    //jwt api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });
      res.send({token}) 
    });

    //middlewares
    const verifyToken = (req,res,next) => {
      // console.log(req.headers.authorization)
      if(!req.headers.authorization){
        return res.status(401).send({message: 'unauthorized access'})
      }
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
          return res.status(401).send({message: 'unauthorized access'})
        }
        req.decoded = decoded
        next()
      })
    }

    //check admin after verify token
    const verifyAdmin = async(req,res,next) => {
      const email = req.decoded.email
      const query = {email: email}
      const user = await userCollection.findOne(query)
      const isAdmin = user?.role === 'admin'
      if(!isAdmin){
        res.status(403).send({message: 'forbidden access'})
      }
      next()
    }

    //users api
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    app.get("/users/admin/:email", verifyToken, async(req,res) => {
      const email = req.params.email
      if(email !== req.decoded.email){
        res.status(403).send({message: 'forbidden access'})
      }
      const query = {email: email}
      const user = await userCollection.findOne(query)
      let admin = false
      if(user){
        admin = user?.role === 'admin'
      }
      res.send({admin})
    })

    app.get("/admin-stats",verifyToken, verifyAdmin, async(req,res) => {
      const users = await userCollection.estimatedDocumentCount()
      const menuItems = await menuCollection.estimatedDocumentCount()
      const orders = await paymentCollection.estimatedDocumentCount()
      const result = await paymentCollection.aggregate([
        {
          $group : {
            _id: null,
            totalRevenue : {
              $sum : "$price"
            }
          }
        }
      ]).toArray()
      const revenue = result.length > 0 ? result[0].totalRevenue : 0
      res.send({users, menuItems, orders, revenue})
    })
    

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const isUserExist = await userCollection.findOne(query);
      if (isUserExist) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/users/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.post("/menu", verifyToken, verifyAdmin, async(req,res) => {
      const item = req.body
      const result = await menuCollection.insertOne(item)
      res.send(result)
    })

    app.get("/menu/:id", async(req,res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await menuCollection.findOne(query)
      res.send(result)
    })

    app.patch("/menu/:id", async(req,res) => {
      const item = req.body
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const updatedDoc = {
        $set:{
          name: item.name,
          category: item.category,
          price: item.price,
          recipe: item.recipe,
          image: item.image,
        }
      }
      const result = await menuCollection.updateOne(filter, updatedDoc) 
      res.send(result)
    })

    app.delete("/menu/:id", verifyToken, verifyAdmin, async(req,res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await menuCollection.deleteOne(query)
      res.send(result)
    })

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    //create payment intent
    app.post('/create-payment-intent', async(req,res) => {
      const {price} = req.body
      const amount = Math.round(price * 100)
      if (amount < 50) {
      return res.status(400).json({
        error: 'Amount must be at least $0.50 USD',
      });
    }
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types : ['card']
      })
      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })
    app.post("/payments", async(req,res) => {
      const payment = req.body
      const paymentResult = await paymentCollection.insertOne(payment)

      //carefully delete each item from the cart
      console.log('payment info', payment)
      const query = {_id : {
        $in : payment.cartIds.map(id => new ObjectId(id))
      }}
      const deleteResult = await cartCollection.deleteMany(query)
      res.send({paymentResult, deleteResult})
    })

    app.get("/payments/:email",verifyToken, async(req,res) => {
      const {query} = {email: req.params.email}
      if(req.params.email !== req.decoded.email){
        return res.status(403).send({message: 'forbidden access'})
      }
      const result = await paymentCollection.find(query).toArray()
      res.send(result)
    })

    //using aggregate pipeline
    app.get("/order-stats",verifyToken, verifyAdmin, async(req,res) => {
      const result = await paymentCollection.aggregate([
        {
          $unwind : '$menuItemIds'
        },
        {
          $lookup: {
            from: 'menu',
            localField: 'menuItemIds',
            foreignField: '_id',
            as: 'menuItems'
          }
        },
        {
          $unwind: '$menuItems'
        },
        {
          $group: {
            _id: '$menuItems.category',
            quantity: {$sum: 1},
            totalRevenue: {$sum: '$menuItems.price'}
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            quantity: "$quantity",
            revenue: "$totalRevenue",
          }
        }
      ]).toArray()
      res.send(result)
    })

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

//middleware\
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bistro Boss Server");
});


app.listen(port, () => {
  console.log(`app is listening from ${port}`);
});
