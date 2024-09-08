import { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { Result } from 'postcss';
import axios from 'axios';

const Login = () => {
  const {signIn} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

    const handelLogin = event =>{
        event.preventDefault();
        const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      
      signIn(email, password)
      .then(result =>{
        const loggedInUser = result.user;
        console.log(loggedInUser);
        const user = {email}; 

        // get access tocken
        axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
        .then(res => {
          console.log(res.data);
          if(res.data.success){
            navigate(location?.state ? location?.state : '/')
          }
        })
      })
      .catch(error => console.log(error))
    }


    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className="card shrink-0 w-full text-center max-w-sm shadow-2xl bg-base-100">
  <h1 className="text-5xl font-bold">Login</h1>
      <form onSubmit={handelLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <p className='p-4 text-center'>New to Car's Doctor <Link className='text-orange-600' to="/signup">SignIn</Link>  </p>
    </div>
    
    <div className="mr-12 w-1/2">
      
      <img src={img} alt="" />
    </div>
  </div>
</div>
    );
};

export default Login;