import React from 'react';
import { Home, Gamepad2, Gift, Activity, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative font-sans">
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-50">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors duration-200 ${
                        isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <Icon size={24} className={isActive ? 'fill-current' : ''} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
            )
        })}
      </nav>
    </div>
  );
};

export default Layout;
