import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './auth.context';
import BookProvider from './book.context';
import ReviewProvider from './review.context';
import ThemeProvider from './theme.context';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '../components/Navbar';

const AppProvider = ({ children }) => (
  <BrowserRouter basename='brp'>
    <ThemeProvider>
      <AuthProvider>
        <BookProvider>
          <ReviewProvider>
            <Navbar/>
            <Toaster />
            {children}
          </ReviewProvider>
        </BookProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default AppProvider;
