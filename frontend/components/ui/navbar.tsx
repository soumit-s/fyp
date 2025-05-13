import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); 
  };

  return (
    <div className="flex justify-between items-center border-b pb-2 px-4 py-2">
      <div className="rounded-full border px-4 py-2">
        <img src="/favicon.ico" alt="logo" className="h-6 w-6 mr-2" />
      </div>
      <Input
        placeholder="Search items"
        className="w-1/2"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      
      <div className="flex items-center space-x-4">
        <div className="rounded-full border px-3 py-1">cart</div>
        <div
          className="border px-4 py-2 rounded-lg cursor-pointer"
          onClick={handleLoginClick}
        >
          login/sign up
        </div>
      </div>
    </div>
  );
};

export default Navbar;