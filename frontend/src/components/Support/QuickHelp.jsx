import React from 'react'

function QuickHelp() {
  return (
   <>
     <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Quick Help</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button className="bg-gray-700 border border-gray-600 rounded-md p-3 text-left hover:bg-gray-600 transition-all duration-200">
                <span className="font-medium text-gray-100">Order Tracking</span>
                <p className="text-sm text-gray-300 mt-1">Track your order status</p>
              </button>
              <button className="bg-gray-700 border border-gray-600 rounded-md p-3 text-left hover:bg-gray-600 transition-all duration-200">
                <span className="font-medium text-gray-100">Return Request</span>
                <p className="text-sm text-gray-300 mt-1">Start a return process</p>
              </button>
              <button className="bg-gray-700 border border-gray-600 rounded-md p-3 text-left hover:bg-gray-600 transition-all duration-200">
                <span className="font-medium text-gray-100">Payment Help</span>
                <p className="text-sm text-gray-300 mt-1">Payment method issues</p>
              </button>
              <button className="bg-gray-700 border border-gray-600 rounded-md p-3 text-left hover:bg-gray-600 transition-all duration-200">
                <span className="font-medium text-gray-100">Seller Support</span>
                <p className="text-sm text-gray-300 mt-1">For shop owners</p>
              </button>
            </div>
          </div>
        
   </>
  )
}

export default QuickHelp