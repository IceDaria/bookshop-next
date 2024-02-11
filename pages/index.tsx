import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Bookcard from "@/components/main/booklist/Bookcard";
import { IbookData } from "@/components/shared/Types";
import Sidebar from "@/components/main/sidebarnav/Sidebar";
import Loader from "@/components/Loader/Loader";
import Slider from "@/components/main/slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { selectBooks, selectLoading, setBooks, setLoading } from "@/store/bookReducer";

interface HomeProps {
  initialBooks: IbookData[];
}

// Создаём компонент Home
const Home: React.FC<HomeProps> = ({ initialBooks }) =>  {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("Architecture");

  // Функция для загрузки книг по выбранной категории
  const handleCategoryClick = async (subject: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setBooks([]));
      const bookData = await fetchBooks(subject);
      dispatch(setBooks(bookData));
      setCategory(subject);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Функция для загрузки книг из API
  const fetchBooks = async (subject: string) => {
    const response = await fetch(`/api/books?subject=${subject}`);
    return response.json();
  };

  // Функция для загрузки дополнительных книг при прокрутке
  const loadMoreBooks = async () => {
    try {
      dispatch(setLoading(true));
      const nextPage = page + 5;
      const additionalBooks = await fetchBooksByPage(category, nextPage);
      const uniqueNewBooks = filterUniqueBooks(additionalBooks);
      const newBooks = uniqueNewBooks.slice(0, 6);
      dispatch(setBooks([...books, ...newBooks]));
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more books:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Функция для загрузки дополнительных книг по странице
  const fetchBooksByPage = async (subject: string, nextPage: number) => {
    const response = await fetch(`/api/books?subject=${subject}&page=${nextPage}`);
    return response.json();
  };

  // Функция для фильтрации уникальных книг
  const filterUniqueBooks = (additionalBooks: IbookData[]) => {
    return additionalBooks.filter((newBook: IbookData) => !books.some((oldBook: IbookData) => oldBook.id === newBook.id));
  };

  // Запуск загрузки книг при изменении категории
  useEffect(() => {
    handleCategoryClick(category);
  }, [category]);

  return (
    <Layout>
      <Slider />
      <div className="content container">
        <Sidebar handleCategoryClick={handleCategoryClick} />
        <div className="books">
          <div className="booklist">
            {books.map((book: IbookData) => (
              <Bookcard key={book.id} bookData={book} />
            ))}
          </div>
          {loading && <Loader />}
        </div>
      </div>
      <div className="container loadmore">
        <button className="button" onClick={loadMoreBooks} aria-label="Кнопка для загрузки дополнительных книг"> 
          Load More
        </button>
      </div>
    </Layout>
  );
};

// Получение данных из АПИ для серверного рендеринга
export const getServerSideProps = async ({ query }: { query: { subject: string | null } }) => {
  const subject = query.subject ? query.subject : "Architecture";
  try {
    const response = await fetch(`/api/books?subject=${subject}`);
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