import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);


  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true)

    emailjs.sendForm(import.meta.env.VITE_EMAIL_JS_SERVICE_ID,import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID, form.current,import.meta.env.VITE_EMAIL_JS_API)
      .then(() => {
        setStatus('Message sent successfully!');
        form.current.reset();
        setIsSending(false)
      })
      .catch((error) => {
        setStatus('Failed to send message. Please try again later.');
        console.error('Error:', error.text);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Contact Us</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input type="text" name="user_name" placeholder="Your Name" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" name="user_email" placeholder="Your Email" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea name="message" placeholder="Your Message" rows="5" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-500" required></textarea>
          </div>
      <input 
  type="submit" 
  value={isSending ? "Sending..." : "Send"} 
  disabled={isSending} 
  className={`w-full ${isSending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg py-3 font-semibold transition-all`} 
/>
          {status && <p className="text-center text-green-600 font-semibold mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact
