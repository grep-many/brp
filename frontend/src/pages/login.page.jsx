import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import CommonForm from '@/components/CommonForm';
import { useState } from 'react';
import { signInFormControls } from '../lib/signInFormControls';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginPage = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => data.email?.trim() && data.password.length > 8;

  const submit = async (e) => {
    e.preventDefault();

    //validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return toast.error('Invalid email');
    }

    await login(data);
  };

  return (
    <div className="flex flex-col my-5 justify-center items-center">
      <Card className="p-6 shadow-lg rounded-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>Enter your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={signInFormControls}
            formData={data}
            setFormData={setData}
            buttonText={loading ? 'Signing in...' : 'Sign In'}
            handleSubmit={submit}
            isButtonDisabled={!validate() || loading}
          />
          <p className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              Create a new account
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
