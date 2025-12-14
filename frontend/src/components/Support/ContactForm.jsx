import React from 'react'

function ContactForm() {
  return (
    <div>
         <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <span className="text-blue-400 mr-3">📧</span>
                <span>support@bazzario.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="text-blue-400 mr-3">📞</span>
                <span>+92-300-1234567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="text-blue-400 mr-3">🕒</span>
                <span>24/7 Customer Support</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="text-blue-400 mr-3">💬</span>
                <span>Live Chat Available</span>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ContactForm