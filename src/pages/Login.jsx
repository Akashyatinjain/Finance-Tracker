import React from 'react';

const Login = () => (
  <div className="p-4 max-w-md mx-auto">
    <h2 className="text-xl font-bold mb-2">Login</h2>
    <input className="border p-2 w-full mb-2" placeholder="Email" />
    <input className="border p-2 w-full mb-2" placeholder="Password" type="password" />
    <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
  </div>
);

export default Login;
