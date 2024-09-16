import React from 'react';

interface UserMenuProps {
  userName: string | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName }) => {
  return (
    <div className="user-menu">
      {userName ? (
        <span>Welcome, {userName}!</span>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default UserMenu;
