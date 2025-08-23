import React, { useState } from 'react';
import axios from 'axios';
import {
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaUsers,
  FaPaperPlane,
  FaUserPlus,
  FaCommentDots
} from 'react-icons/fa';

const Contact = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // for success or error message

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message); // or show a toast
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      alert("Unable to connect to server.");
    }

    // try {
    //   const res = await axios.post('http://localhost:5000/api/feedback/submit', {
    //     name,
    //     email,
    //     message,
    //   });

    //   if (res.data.success) {
    //     setStatus({ type: 'success', msg: 'Feedback sent successfully!' });
    //     setName('');
    //     setEmail('');
    //     setMessage('');
    //   } else {
    //     setStatus({ type: 'error', msg: 'Something went wrong!' });
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setStatus({ type: 'error', msg: err.response?.data?.error || 'Something went wrong!' });
    // }
  };

  const contactCards = [
    {
      icon: <FaEnvelope size={24} className="text-[#f8736f]" />,
      title: 'Email',
      subtitle: 'telugu.iitkgp@gmail.com',
      link: 'mailto:telugu.iitkgp@gmail.com',
    },
    {
      icon: <FaInstagram size={24} className="text-[#f8736f]" />,
      title: 'Instagram',
      subtitle: '@tca.iitkgp',
      link: 'https://instagram.com/tca.iitkgp',
    },
    {
      icon: <FaYoutube size={24} className="text-[#f8736f]" />,
      title: 'YouTube',
      subtitle: 'TCA IIT KGP',
      link: 'https://www.youtube.com/@tcaiitkgp',
    },
    {
      icon: <FaMapMarkerAlt size={24} className="text-[#f8736f]" />,
      title: 'Location',
      subtitle: 'IIT Kharagpur',
    },
    {
      icon: <FaUsers size={24} className="text-[#f8736f]" />,
      title: 'Members',
      subtitle: '100+ Active Members',
    },
  ];

  return (
    <section id="contact" className="bg-[#fff7f3] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 pt-10">Get In Touch</h2>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          Join our vibrant Telugu community at IIT Kharagpur. Connect with us for events,
          collaborations, or to learn more about our cultural activities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#fbd4b6] text-center p-6 rounded-xl shadow-sm hover:shadow-md transform transition-transform duration-300 ease-in-out hover:scale-103"
            >
              <div className="mb-2 flex justify-center">{card.icon}</div>
              <h4 className="font-semibold text-md">{card.title}</h4>
              {card.link ? (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  {card.subtitle}
                </a>
              ) : (
                <p className="text-sm text-gray-700">{card.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#f8a36e] to-[#ee7e4b] text-white text-center rounded-xl py-10 px-6 shadow-md">
          <h3 className="text-2xl font-bold mb-3">Join Our Telugu Family</h3>
          <p className="mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you're a student, faculty, or staff member, you're welcome to be
            part of our cultural community that celebrates Telugu heritage at IIT
            Kharagpur.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="mailto:telugu.iitkgp@gmail.com"
              className="bg-white text-[#f9735c] font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-[#ffe7df] transition"
            >
              <FaPaperPlane /> Contact Us
            </a>
            <a
              href="https://instagram.com/tca.iitkgp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#f9735c] font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-[#ffe7df] transition"
            >
              <FaUserPlus /> Follow Us
            </a>
            <button
              onClick={() => setShowFeedback((prev) => !prev)}
              className="bg-white text-[#f9735c] font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-[#ffe7df] transition"
            >
              <FaCommentDots /> {showFeedback ? 'Hide Feedback' : 'Send Feedback'}
            </button>
          </div>
        </div>

        {showFeedback && (
          <div className="mt-10 bg-white rounded-xl shadow p-6 max-w-2xl mx-auto border border-orange-100">
            <h3 className="text-xl font-bold mb-4 text-[#f9735c] text-center">Send Us Your Feedback</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
                  placeholder="you@example.com"
                />
                {/* <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                /> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              {status && (
                <p className={`text-center text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status.msg}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#f9735c] text-white font-semibold py-2 rounded-lg hover:bg-[#f85f49] transition"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}

        <footer className="text-center text-sm text-gray-600 mt-12 pt-8 border-t border-[#f4d6c4]">
          © 2024 Telugu Cultural Association, IIT Kharagpur. All rights reserved.
          <br />
          <span className="text-xs">
            Preserving Telugu culture since 1960 | Building community through heritage
          </span>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
