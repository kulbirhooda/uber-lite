import env from "../../env.js"
import jwt from "jsonwebtoken"
import { prisma } from "../../prisma/client.js"
import bcrypt from "bcrypt"

function signToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET);
}
async function signupDriver({name , email , password , vehicleModel , plateNumber , vehicleType}){
    const existing = await prisma.user.findUnique({where : {email}})
    if(existing){
        const err = new Error('Email already in use')
        err.status=400
        throw err
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        role: 'DRIVER',
        driver: {
          create: { vehicleModel, plateNumber, vehicleType }
        }
      },
      include: { driver: true }
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role, driver: user.driver },
      token
    };
    } catch (err){
        console.log(err);
        throw err
    }
}
async function signup({name , email , password}){
    const existing = await prisma.user.findUnique({where : {email}})
    if(existing){
        const err = new Error('Email already in use')
        err.status=400
        throw err
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({ data: { email, name, password: passwordHash } });
        const token = signToken({ id: user.id, email: user.email });
        return { user: { id: user.id, email: user.email, name: user.name }, token };
    } catch (err){
        console.log(err);
        throw err
    }
}
async function signin({ email, password }) {

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }

    const token = signToken({ id: user.id, email: user.email });

    return { user: { id: user.id, email: user.email, name: user.name }, token };
}
export {signup, signupDriver, signin}