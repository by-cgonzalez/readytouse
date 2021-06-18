import React, { useState, useContext } from 'react';
import MainHeader from './MainHeader';
import MainContent from './MainContent';


const MainLayout = ({ children }) => {
  const test = 'test'
    return (
      <div>
        <MainHeader />
        <MainContent>
          {children}
        </MainContent>
      </div>
    );
  };

export default MainLayout;
