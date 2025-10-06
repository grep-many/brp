import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import CommonForm from '@/components/CommonForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpFormControls } from '../lib/signUpFormControls';
import useAuth from '../hooks/useAuth';
import { toast } from 'sonner';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () =>
    data.name?.trim().length >= 2 &&
    data.email?.trim() &&
    data.password.length > 8 &&
    data.confirmPassword.length > 8;

  const { loading, register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();

    // Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return toast.error('Invalid email');
    }
    if (data.password !== data.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const { confirmPassword, ...userData } = data;
    await register(userData);
  };

  return (
    <div className="flex flex-col my-5 justify-center items-center">
      <Card className="p-6 shadow-lg rounded-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={signUpFormControls}
            formData={data}
            setFormData={setData}
            buttonText={loading ? 'Signing up...' : 'Sign Up'}
            handleSubmit={submit}
            isButtonDisabled={!validate() || loading}
          />
          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Sign in
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
