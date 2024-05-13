import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function Contact() {
  const template_id = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
  const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const user_id = process.env.REACT_APP_EMAIL_USER_ID;
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const usingSwal = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "We have recieved your message! Thank you for reaching out to us.",
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Close', 
      
    }).then((result) => {

    });
  }

  const sendEmail = (e) => {
    e.preventDefault();
  
    const data = {
      service_id: service_id,
      template_id: template_id,
      user_id: user_id,
      template_params: {
        to_name: 'FitFreak',
        from_name: form.current.user_name.value,
        message: form.current.message.value,
        reply_to: form.current.user_email.value
      }
    };
  
    axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data);
      console.log("message sent");
      // alert("Message Sent!");
      usingSwal();
      setFormData({
        user_name: '',
        user_email: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error('Error sending email:', error.response ? error.response.data : error);
      console.error('Request data:', data);
    });
  };
  

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input 
          type="text" 
          name="user_name" 
          value={formData.user_name}
          onChange={handleChange}
        />
        <label>Email</label>
        <input 
          type="email" 
          name="user_email" 
          value={formData.user_email}
          onChange={handleChange}
        />
        <label>Message</label>
        <textarea 
          name="message" 
          value={formData.message}
          onChange={handleChange}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Contact;
