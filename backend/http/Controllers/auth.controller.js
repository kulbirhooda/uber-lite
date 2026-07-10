import { signup , signin} from "../Services/auth.service.js";
import { signupSchema, signinSchema} from "../Schemas/auth.schema.js";
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
async function postSignin(req,res,next) {
    try{
        const result = signupSchema.safeParse(req.body);
        
        if (!result.success) {

            return res.status(400).json({
                error: 'Signin Validation failed',
                details: JSON.parse(result.error.message)
            });
        }
        
        const { email, password } = result.data;
        const data = await signin({ email, password });
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export {postSignup, postSignin}