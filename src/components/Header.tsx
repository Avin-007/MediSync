
import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white py-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </div>
    </header>
  );
};

export default Header;
