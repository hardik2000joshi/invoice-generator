'use client';

import {useState, useEffect} from 'react';

export default function MyAccountPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');

    const fetchUser = async () => {
        const response = await fetch ('/api/account', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data)
        }
        else {
            setUser(null);
        }
         setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleGenerateKey = async () => {
        const response = await fetch('/api/generate_api_key', 
            {
                method:'POST',
                credentials:'include',
            });

             if (response.ok) {
                const data = await response.json();
                alert(`API Key: ${data.apiKey}\nExpires At: ${new Date(data.expiresAt).toLocaleString()}`);
            await fetchUser();
        }
    };

    const handleLogout = async () => {
        await fetch ('/api/logout', {
            method: "POST",
            credentials: 'include',
        }
        );
        window.location.href = '/login';
    };

     if (loading) {
        return <p>Loading...</p>;
    }

    if (!user)  {
        if (typeof window!=='undefined') {
            window.location.href = '/login';
        }
        return null;
    }
    
    return (
        <div className='min-h-screen bg-gray-100 flex'>
            <aside className='w-64 bg-white border-r shadow-sm p-6 space-y-4'>
                <h2 className='text-xl font-bold text-gray-900 mb-6'>My Account</h2>
                <ul className='space-y-2'>
                    <li>
                        <button onClick={() => setActiveTab('dashboard')} className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${activeTab === 'dashboard' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                            Dashboard
                        </button>
                    </li>

                    <li>
                        <button onClick={() => setActiveTab('profile')} className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${activeTab === 'profile' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                            Profile
                        </button>
                    </li>

                    <li>
                        <button onClick={() => setActiveTab('payments')} className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${activeTab === 'payments' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                            Payments
                        </button>
                    </li>

                    <li>
                        <button onClick={() => setActiveTab('apiKeys')} className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${activeTab === 'apiKeys' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                             API Keys
                        </button>
                    </li>

                    <li>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 rounded-lg font-medium text-red-500 hover:bg-red-100">
                            Logout
                        </button>
                    </li>
                </ul>
            </aside>

            <main className='flex-1 p-8 bg-gray-50 space-y-6'>
                {activeTab === 'dashboard' && (
                    <section>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                            Welcome, {user.name} 
                        </h1>
                        <p className="text-gray-600">
                            Here&#39;s an overview of your account activity.</p>
                         </section>
                )}

                {activeTab === 'profile' && (   
                    <section className='bg-white p-6 rounded-lg shadow space-y-4'>
                        <h1 className='text-center text-2xl font-bold text-gray-800'>
                            Profile
                            </h1>
                            <div>
                                <label className='block text-sm text-gray-500'>
                                     Name
                                </label>
                                <p className='text-lg font-medium text-gray-900'>
                                    {user.name}
                                </p>
                                </div>
                                <div>
                                    <label className='text-sm text-gray-500'>
                                        Email
                                    </label>
                                    <p className='text-lg font-medium text-gray-900'>
                                        {user.email}
                                    </p>
                                </div>
                                </section>
                )}
                   
                   {activeTab === 'payments' && (
                    <section>

                        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Payment History</h2>
                        <div className='overflow-x-auto'>
                            <table className='min-w-full bg-white rounded shadow-md'>
                                <thead>
                                   <tr className='bg-gray-100 border-b'>
                                    <th className='text-left py-2 px-4 text-gray-600'>
                                        Date
                                    </th>
                                    <th className='text-left py-2 px-4 text-gray-600'>
                                        Payment ID
                                    </th>
                                    <th className='text-left py-2 px-4 text-gray-600'>
                                        Payment Amount (USD)
                                    </th>
                                    <th className='text-left py-2 px-4 text-gray-600'>
                                        Status
                                    </th>   
                                   </tr>
                                </thead>

                                <tbody>
                                    {user.payments.length === 0 && (
                                        <tr>
                                                <td colSpan={4} className='py-4 px-4 text-center text-gray-500'>
                                                    No Payments Found.
                                                </td>
                                        </tr>
                                    )}

                                    {
                                        user.payments.map((payment:any, index:number) => (
                                            <tr key={index} className='border-b'>
                                                <td className='py-2 px-4'>
                                                    {payment.date}
                                                </td>
                                                <td className='py-2 px-4'>
                                                    {payment.redirectUrl?.split("/").pop() || 'N/A'}
                                                </td>
                                                <td className='py-2 px-4'>
                                                    {parseFloat(payment.amount).toFixed(2)}
                                                </td>
                                                <td className={`py-2 px-4 font-semibold ${payment.status === 'initiated' ? 'text-yellow-500' : 'text-green-600'}`}>
                                                    {payment.status === 'initiated' ? 'In Progress' : 'success'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                         </section>
                   )}
                           

                    {activeTab === 'apiKeys' && (
                        <section>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-2xl font-semibold text-gray-800'>
                                    API Keys
                                </h2>
                                <button onClick={handleGenerateKey}
                                className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm'>
                                    Generate Key
                                </button>
                            </div>

                            <div className='space-y-3'>
                                {(() => {
                                    const apiKeyElements = [];
                                    for (let i=0; i<user.apiKeys.length; i++) {
                                        apiKeyElements.push(
                                            <div key= {i}
                                            className='bg-gray-100 p-3 rounded font-mono text-sm overflow-auto'
                                            >
                                                {user.apiKeys[i].key}
                                                </div>
                                        );
                                    }
                                    return apiKeyElements;
                                })()}

                            </div>
                        </section>
                    )}
            </main>

        </div>
    )
}
