"use client"

import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="text-blue-500" style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
};

export default Loading;
