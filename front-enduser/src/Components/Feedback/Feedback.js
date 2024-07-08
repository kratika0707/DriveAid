import React,{useState} from 'react'
import StarRating from './StarRating'
const Feedback = () => {
    const [userRating, setUserRating] = useState(0); // State to hold user's selected rating

  const handleRatingChange = (newRating) => {
    setUserRating(newRating); // Update parent component's state with selected rating
    // You can perform any actions with the new rating here, e.g., save it to a database
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your form submission logic here
    console.log('Form submitted:', {
      email: event.target.email.value,
      phone: event.target.phone.value,
      feedback: event.target.feedback.value,
      rating: userRating
    });
    // Reset form fields or perform any other actions after submission
  };
  return (
    <>
      
    <div className="container" style={{height:'100vh',margin:'10%'}}>
        <h1 style={{textAlign:'center', margin:'5%'}}>Submit your feedback!</h1>
        <form onSubmit={handleSubmit}>
      <div className="mb-3" style={{ width: '50%' }}>
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" style={{ height: '40px' }} required />
      </div>
      <div className="mb-3" style={{ width: '50%' }}>
        <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
        <input type="tel" className="form-control" id="exampleInputPhone" name="phone" style={{ height: '40px' }} required />
      </div>
      <div className="mb-3" style={{ width: '70%' }}>
        <label htmlFor="exampleInputIssue" className="form-label">Your Feedback</label>
        <textarea className="form-control" id="exampleInputIssue" name="feedback" rows="4" style={{ minHeight: '80px', resize: 'vertical' }} required></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Rate our service:</label>
        <StarRating rating={userRating} onRatingChange={handleRatingChange} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ height: '40px', width: 'auto', marginTop: '1%',marginBottom:'2%',lineHeight:'5px', backgroundColor:'#0078d6', fontWeight:'500' }}>Submit</button>
    </form>
    </div>
    </>
  )
}

export default Feedback
