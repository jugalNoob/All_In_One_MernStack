const express=require("express")


const app = express();
const port = 9000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


// app.use(passport.initialize());
// app.use(passport.session());
app.use(router); // All other API routes


app.listen(port , ()=>{

    console.log(port)
})