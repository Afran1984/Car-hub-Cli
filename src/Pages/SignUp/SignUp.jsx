import { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {

  const {createUser} = useContext(AuthContext);
    const handelSignUp = event =>{
        event.preventDefault();

      const form = event.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      console.log(name, email, password);

      createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => console.log(error))
    }


    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className="card shrink-0 w-full text-center max-w-sm shadow-2xl bg-base-100">
  <h1 className="text-5xl font-bold">Sign Up</h1>
      <form onSubmit={handelSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="enter your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">confirm Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
      <p className='p-4 text-center'>Already have an Account <Link className='text-orange-600' to="/login">Login</Link>  </p>
    </div>
    
    <div className="mr-12 w-1/2">
      
      <img src={img} alt="" />
    </div>
  </div>
</div>
    );
};

export default SignUp;