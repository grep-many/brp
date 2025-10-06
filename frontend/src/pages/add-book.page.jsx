import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import CommonForm from '@/components/CommonForm';
import { addUpdateBookForm } from '@/lib/addUpdateBookForm';
import { useNavigate } from 'react-router-dom';
import useBook from '../hooks/useBook';

const AddBookPage = () => {
  const [data, setData] = useState({
    title: '',
    author: '',
    description: '',
    genre: [],
    year: null,
  });

  const { addBook, loading } = useBook();
  const navigate = useNavigate();

  // Simple validation
  const validate = () =>
    data.title?.trim().length > 0 &&
    data.author?.trim().length > 0 &&
    data.year;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await addBook(data);
    setData({ title: '', author: '', description: '', genre: [], year: null });
    navigate('/');
  };

  return (
    <div className="flex flex-col my-5 justify-center items-center">
      <Card className="p-6 shadow-lg rounded-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Add Book</CardTitle>
          <CardDescription>Fill in the book details</CardDescription>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={addUpdateBookForm}
            formData={data}
            setFormData={setData}
            buttonText={loading ? 'Adding...' : 'Add Book'}
            handleSubmit={handleSubmit}
            isButtonDisabled={!validate() || loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBookPage;
