
import img1 from '../../../assets/images/about_us/parts.jpg'
import img2 from '../../../assets/images/about_us/person.jpg'
const About = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className='lg:w-1/2 relative'>
    <img src={img2} className="w-3/4 rounded-lg shadow-2xl" />
    <img src={img1} className="w-1/2 absolute right-5 top-1/2 border-8 border-white rounded-lg shadow-2xl" />
    </div>
    <div className='lg:w-1/2'>
        <h3 className='text-3xl font-bold text-orange-700'>About Us</h3>
      <h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
      <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
      <p className='py-6'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
      <button className="btn btn-active btn-neutral">Get moreInfo</button>
    </div>
  </div>
</div>
    );
};

export default About;