import { GetServerSideProps } from 'next';
import Layout from "@/components/layout/layout";
import Bookcard from "@/components/main/booklist/Bookcard";
import Slider from "@/components/main/slider/Slider";
import { IbookData } from "@/components/shared/Types";
import { useEffect, useState } from "react";
import Sidebar from '@/components/main/sidebarnav/Sidebar';

interface HomeProps {
  initialBooks: IbookData[];
}

const Home: React.FC<HomeProps> = ({ initialBooks }) => {
  const [bookData, setBookData] = useState<IbookData[]>(initialBooks);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (subject: string) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/books?subject=${subject}&page=0`);
      const bookData = await response.json();

      setBookData(bookData);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCategoryClick('Architecture');
  }, []);

  return (
    <Layout>
      <Slider />

      <div className='content container'>
        <Sidebar handleCategoryClick={handleCategoryClick} />
        <div className='booklist'>
          {bookData.map((book: IbookData) => (
            <Bookcard key={book.id} bookData={book} />
          ))}
        </div>
        {loading && <div>Loading...</div>}
      </div>
      <div className='container loadmore'>
        <button className='button'>load more</button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  try {
    const { subject } = query as { subject: string };
    const response = await fetch(`/api/books?subject=${subject}&page=0`);
    const initialBooks = await response.json();

    return {
      props: { initialBooks },
    };
  } catch (error) {
    console.error('Error fetching initial books:', error);
    return {
      props: { initialBooks: [] },
    };
  }
};

export default Home;