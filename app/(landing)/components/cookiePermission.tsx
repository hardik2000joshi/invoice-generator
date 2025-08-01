"use client"
import { useEffect, useState } from 'react';

type PreferenceType = "preferences" | "statistics" | "marketing";

const Toggle = ({ 
    label, 
    onClick, 
    active, 
    disabled = false,
}:{
    label: string,
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
}) => (
    <div className="flex items-center space-x-2">
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-12 h-6 rounded-full ${disabled ? 'bg-gray-300' : active ? 'bg-purple-600' : 'bg-gray-300'} relative`}
    >
        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform $ {
            active ? 'translate-x-6' : 'translate-x-1'
            }`}>
        </div>
        </button>
        <span className="text-sm font-bold uppercase">{label}</span>
    </div>
    ); 

const CookiePermission = () => {
const [ show, setShow ] = useState(false);
const [preferences, setPrefrences] = useState({
    preferences: false,
    statistics: false,
    marketing: false,
})

 useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setShow(true);
  }, []);

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'denied');
    setShow(false);
  };

   const handleAllowAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setShow(false);
  };

  const handleAllowSelection = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShow(false);
  };



const toggle = (type: PreferenceType) => {
    setPrefrences({ ...preferences, [type]: !preferences[type]});
};

if (!show) 
    return null;



return (
    <div className='fixed bottom-6 right-6 w-[320px] bg-white rounded-2xl shadow-lg p-6 z-50 text-sm'>

            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
                This website uses cookies
            </h2>
            <p className="text-gray-700 mb-4">
                We use cookies to personalise content and ads, to provide social media features and to analyse our <br />
                traffic. We also share information about your use of our site with our social media, advertising and <br />
                analytics partners who may combine it with other information that you've provided to them or that <br />
                they've collected from your use of their services. <br />

                <a href="/privacy-cookie-policy" className='text-blue-600 underline'>Cookie Policy</a>
            </p>

            <div>
                <Toggle label="Necessary" disabled/>
                <Toggle label = "Preferences" onClick = {() => toggle('preferences')} active = {preferences.preferences} />
                    <Toggle label="Statistics" onClick={() => toggle('statistics')} active={preferences.statistics} />
                        <Toggle label="Marketing" onClick={() => toggle('marketing')} active={preferences.marketing} />
            </div>

            <div className="flex justify-end gap-1">
          <button onClick={handleDeny} className="bg-gray-200 text-white font-semibold px-3 py-1 rounded">Deny</button>
          <button onClick={handleAllowSelection} className="border font-semibold px-3 py-1 rounded">Allow selection</button>
          <button onClick={handleAllowAll} className="bg-purple-300 text-white font-semibold px-3 py-1 rounded">Allow all</button>
        </div>
        </div>
);
};



    

export default CookiePermission;