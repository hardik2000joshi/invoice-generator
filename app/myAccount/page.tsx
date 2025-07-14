'use client';

import {useState, useEffect} from 'react';

export default function MyAccountPage() {
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('dashboard');

    const fetchUser = async () => {
        const response = await fetch ('api/account');
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleGenerateKey = async () => {
        const response = await fetch('api/generate_api_key', {method:'POST'});
             if (response.ok) {
            await fetchUser();
        }
    };

    if (!user)  return <div className='flex justify-center items-center h-screen'> Loading... </div>;
        

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
                        <div className='grid md:grid-cols-2 gap-4'>
                            {(() => {
                                const paymentElements = [];
                                for (let i=0; i<user.payments.length; i++) {
                                    const q= user.payments[i];
                                    paymentElements.push(
                                         <div key={i} className="bg-white p-4 rounded shadow">
                                        <div className='text-sm text-gray-500'>
                                Invoice ID
                            </div>
                            <div className='text-lg font-semibold text-gray-900'>
                               {q.id}
                               </div>
                            <div className='mt-1 text-green-600 font-bold'>
                                {q.amount}
                            </div>
                            <div className='text-sm text-gray-400'>
                                {q.date}
                            </div>
                             </div>
                                    );
                                }
                                return paymentElements;

                            })()}
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
