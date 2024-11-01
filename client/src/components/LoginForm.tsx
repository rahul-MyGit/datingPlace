import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let loading = false;

    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input 
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                        placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input 
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                        placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <button 
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        loading ? 
                        "bg-pink-400 cursor-not-allowed"
                        : "bg-pink-400 hover:bg-pink-700 focus: outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    }`}
                disabled={loading}
            >
                {loading ? "Signing in ..." : "Sign in"}
            </button>
            
        </form>
    )
}

export default LoginForm;