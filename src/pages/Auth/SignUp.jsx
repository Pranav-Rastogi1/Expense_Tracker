import React from 'react'
import {useNavigate,Link} from 'react-router-dom';
import Input from '../../components/Inputs/Input'
import AuthLayout from '../../components/layouts/AuthLayout';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadimage';
import UserContext from '../../context/userContext';



const SignUp = () => {
  const [profilePic,setProfilePic]=React.useState(null);
  const [fullName,setFullName]=React.useState('');
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [error,setError]=React.useState(null);
  const navigate = useNavigate();
  const { updateUser }=React.useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    //handle signup
    let profileImageUrl = '';
    if(!fullName){
      setError('Please enter your full name');
      return;
    }
    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }
    if(!password){
      setError('Please enter your password');
      return;
    }
    setError(null);

    // Proceed with signup logic (e.g., API call)

    try{

      // upload profile picture if exists
      if(profilePic){
        const imageUploadRes=await uploadImage(profilePic);
        profileImageUrl=imageUploadRes.imageUrl||'';
      }

      // Signup API call
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });
      const {token,user} = response.data;
      if(token){
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');

      }
    }
    catch(err){
      if(err.response && err.response.data && err.response.data.message)
        setError(err.response.data.message);
      else
        setError('An error occurred during signup. Please try again.');
    }
    
  }

  return (
    <AuthLayout>
      <div className='lg:w-full h-auto md:h-full flex flex-col justify-center'>
        <h3 className='text-xl text-black font-semibold'>Create Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input label="Full Name" type="text" value={fullName} placeholder="John Doe" onChange={(e) => setFullName(e.target.value)} />
            <Input label="Email" type="email" value={email} placeholder="john@example.com" onChange={(e) => setEmail(e.target.value)} />
            <div className='col-span-2'>
              <Input label="Password" type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            </div>
                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                      
                      <button type='submit' className='btn-primary'>Sign UP </button>
                      
                      <p className="text-[13px] text-slate-800 mt-3">Already Have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/login">
                        Login
                        </Link>
                      </p>
         
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
