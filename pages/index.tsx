import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Layout from "@/components/layout/layout";
import Bookcard from "@/components/main/booklist/Bookcard";
import { IbookData } from "@/components/shared/Types";
import Sidebar from "@/components/main/sidebarnav/Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { selectBooks, selectLoading, setBooks, setLoading } from "@/store/bookReducer";

interface HomeProps {
  initialBooks: IbookData[];
}

const Home: React.FC<HomeProps> = ({ initialBooks }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("Architecture");

  const handleCategoryClick = async (subject: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setBooks([]));

      const response = await fetch(`/api/books?subject=${subject}`);
      const bookData = await response.json();

      dispatch(setBooks(bookData));
      setCategory(subject);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadMoreBooks = async () => {
    try {
      dispatch(setLoading(true));
      const nextPage = page + 1;
  
      const response = await fetch(`/api/books?subject=${category}&page=${nextPage}`);
      const additionalBooks = await response.json();
  
      // Отфильтровываем новые книги, чтобы исключить дубликаты
      const uniqueNewBooks = additionalBooks.filter((newBook: IbookData) => !books.some((oldBook: IbookData) => oldBook.id === newBook.id));
      
      // Выбираем только 6 уникальных новых книг
      const newBooks = uniqueNewBooks.slice(0, 6);
  
      dispatch(setBooks([...books, ...newBooks]));
      setPage(nextPage); // обновляем номер страницы
    } catch (error) {
      console.error("Error loading more books:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    handleCategoryClick(category);
  }, [category]);

  return (
    <Layout>
      <div className="content container">
        <Sidebar handleCategoryClick={handleCategoryClick} />
        <div className="booklist">
          {books.map((book: IbookData) => (
            <Bookcard key={book.id} bookData={book} />
          ))}
        </div>
        {loading && <div>Loading...</div>}
      </div>
      <div className="container loadmore">
        <button className="button" onClick={loadMoreBooks}>
          Load More
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  try {
    const { subject, page } = query as { subject: string, page: string };
    const response = await fetch(`/api/books?subject=${subject}&page=${page}`);
    const initialBooks = await response.json();

    return {
      props: { initialBooks },
    };
  } catch (error) {
    console.error("Error fetching initial books:", error);
    return {
      props: { initialBooks: [] },
    };
  }
};

export default Home;