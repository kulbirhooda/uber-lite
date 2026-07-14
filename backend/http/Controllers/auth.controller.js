import { signup , signin , signupDriver} from "../Services/auth.service.js";
import { signupSchema, signinSchema , signupDriverSchema} from "../Schemas/auth.schema.js";
async function postSignup(req,res,next){
    try {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: 'Signup Validation failed'
            });
        }
        const { name, email,  password } = result.data;

        let data = await signup({ name, email, password });
        res.status(200).json(data)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error,
            message: 'Signup Failed'
        })
    }
}
export async function postSignupDriver(req,res,next){
    try{
        const result= signupDriverSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            error: 'Signup Validation failed'
        });
    }
    const { name, email, password, vehicleModel, plateNumber, vehicleType }=result.data;
    const data = await signupDriver({ name, email, password, vehicleModel, plateNumber, vehicleType });
    res.status(200).json(data);
    }catch(error){
        console.error(error)
        res.status(500).json({
            error,
            message: 'Signup Failed'
        })
    }

}

async function postSignin(req,res,next) {
    try{
        const result = signinSchema.safeParse(req.body);
        
        if (!result.success) {

            return res.status(400).json({
                error: 'Signin Validation failed',
                details: JSON.parse(result.error.message)
            });
        }
        
        const { email, password } = result.data;
        const data = await signin({ email, password });
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function getMe(req,res,next) {
    return res.status(200).json({
        user: req.user
    })
}
export {postSignup, postSignin, getMe}