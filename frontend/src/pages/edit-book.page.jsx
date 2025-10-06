import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import CommonForm from '@/components/CommonForm';
import { addUpdateBookForm } from '@/lib/addUpdateBookForm';
import useBook from '../hooks/useBook';

const UpdateBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, updateBook, loading } = useBook();

  const [data, setData] = useState({
    title: '',
    author: '',
    description: '',
    genre: [],
    year: '',
  });

  // Fetch existing book data on mount
  useEffect(() => {
    (async () => {
      const book = await getBookById(id);
      const { title, author, description, genre, year, ...rem } = book;
      setData({ title, author, description, genre, year });
    })();
  }, [id]);

  const validate = () =>
    data.title?.trim().length > 0 &&
    data.author?.trim().length > 0 &&
    data.year;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await updateBook(id, data);
    navigate(`/book/${id}`); // navigate back to book list
  };

  return (
    <div className="flex flex-col my-5 justify-center items-center">
      <Card className="p-6 shadow-lg rounded-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Update Book</CardTitle>
          <CardDescription>Modify the details of the book</CardDescription>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={addUpdateBookForm}
            formData={data}
            setFormData={setData}
            buttonText={loading ? 'Updating...' : 'Update Book'}
            handleSubmit={handleSubmit}
            isButtonDisabled={!validate() || loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateBookPage;
