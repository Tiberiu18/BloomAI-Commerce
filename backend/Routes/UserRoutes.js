import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import protect from '../Middleware/AuthMiddleware.js';
import generateToken from '../utils/generateToken.js';

import {PythonShell} from 'python-shell';
import {spawn} from 'child_process';

const userRouter = express.Router();


// Get all users
userRouter.get("/", asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.json(users);
})
);


// Login
userRouter.post("/login", asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        console.log(user.ageGroup);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id),
            createdAt: user.createdAt,
            cluster: user.cluster,
            favoriteColors: user.favoriteColors,
            favoriteFlowers: user.favoriteFlowers,
            sex:user.sex,
            ageGroup:user.ageGroup,

        });
    } 
        else{
            res.status(401);
            throw new Error('Invalid email or password');
        }
    })
);


// Register
// userRouter.post("/", asyncHandler(async(req, res) => {
//     const {name, email, password, sex, ageGroup, favoriteColors, favoriteFlowers} = req.body;
//     const userExists = await User.findOne({email});

//     if (userExists){
//         res.status(400);
//         throw new Error('User already exists');
//     }

//     const user = await User.create({
//         name,
//         email,
//         password,
//         sex,
//         ageGroup,
//         favoriteColors,
//         favoriteFlowers,
//     });

//     if(user){
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin:user.isAdmin,
//             sex:user.sex,
//             ageGroup:user.ageGroup,
//             favoriteColors:user.favoriteColors,
//             favoriteFlowers:user.favoriteFlowers,
//             token:generateToken(user._id),
//         });
//     }

//     else{
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// })
// );



userRouter.post("/", asyncHandler(async(req, res) => {
    const {name, email, password, sex, ageGroup, favoriteColors, favoriteFlowers} = req.body;
    const color1 = req.body.favoriteColors[0].label;
    const color2 = req.body.favoriteColors[1].label;
    const color3 = req.body.favoriteColors[2].label;

    const flower1 = req.body.favoriteFlowers[0].label;
    const flower2 = req.body.favoriteFlowers[1].label;
    const flower3 = req.body.favoriteFlowers[2].label;
    let cluster;

    const userExists = await User.findOne({email});

    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const pythonScript = "./AIModel/python_script.py";
    const modelFile = "./AIModel/model.pkl";
    const setDate = "./AIModel/set_date.csv";
    const newData = {
        Sex: sex,
        AgeGroup: ageGroup,
        Color1: color1,
        Color2: color2,
        Color3: color3,
        Flower1: flower1,
        Flower2: flower2,
        Flower3: flower3
      };
    

    const pythonProcess = spawn('python',[pythonScript, modelFile, JSON.stringify(newData), setDate]);
    pythonProcess.stdout.on('data', async(data) => {
        cluster = data.toString();
        cluster = parseInt(cluster);
        console.log(cluster);

        const user = await User.create({
            name,
            email,
            password,
            sex,
            ageGroup,
            favoriteColors,
            favoriteFlowers,
            cluster
        });

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin:user.isAdmin,
                sex:user.sex,
                ageGroup:user.ageGroup,
                favoriteColors:user.favoriteColors,
                favoriteFlowers:user.favoriteFlowers,
                token:generateToken(user._id),
                cluster:user.cluster,
            });
        }

        else{
            res.status(400);
            throw new Error('Invalid user data');
        }
        });
})
);






// PROFILE
userRouter.get("/profile", protect, asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            favoriteColors: user.favoriteColors,
            favoriteFlowers: user.favoriteFlowers,
            ageGroup: user.ageGroup,
            sex:user.sex,
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
}
));


// Update PROFILE
userRouter.put("/profile", protect,asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        console.log(req.body.favoriteColors);
        user.email = req.body.email || user.email;
        user.name = req.body.name || user.name;
        if(req.body.password){
            user.password = req.body.password;
        }
        user.sex = req.body.sex || user.sex;
        user.ageGroup = req.body.ageGroup || user.ageGroup;
        user.favoriteColors = req.body.favoriteColors || user.favoriteColors;
        user.favoriteFlowers = req.body.favoriteFlowers || user.favoriteFlowers;
        
        // recalculate cluster
        recalculateCluster(user);
        const updatedUser = await user.save();
        
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            sex: updatedUser.sex,
            ageGroup: updatedUser.ageGroup,
            favoriteColors: updatedUser.favoriteColors,
            favoriteFlowers: updatedUser.favoriteFlowers,
            cluster: updatedUser.cluster,
            token:generateToken(updatedUser._id),
        });
        
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
}
));


// create a function
const recalculateCluster = async (user) => {
    const pythonScript = "./AIModel/python_script.py";
    const modelFile = "./AIModel/model.pkl";
    const setDate = "./AIModel/set_date.csv";
    const newData = {
        Sex: user.sex,
        AgeGroup: user.ageGroup,
        Color1: user.favoriteColors[0].label,
        Color2: user.favoriteColors[1].label,
        Color3: user.favoriteColors[2].label,
        Flower1: user.favoriteFlowers[0].label,
        Flower2: user.favoriteFlowers[1].label,
        Flower3: user.favoriteFlowers[2].label
    };
    let cluster;
    const pythonProcess = spawn('python',[pythonScript, modelFile, JSON.stringify(newData), setDate]);
    pythonProcess.stdout.on('data', async(data) => {
        cluster = data.toString();
        cluster = parseInt(cluster);
        console.log(cluster);
        user.cluster = cluster;
        await user.save();
    });

}



export default userRouter;