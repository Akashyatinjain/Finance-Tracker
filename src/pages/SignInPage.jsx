import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import AuthLayout from '../layouts/AuthLayout';

const Page = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default Page;
