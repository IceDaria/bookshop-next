import Layout from "@/components/layout/layout";
import Bookcard from "@/components/main/booklist/Bookcard";
import Sidebar from "@/components/main/sidebarnav/Sidebar";
import Slider from "@/components/main/slider/Slider";
import { bookData } from "@/components/shared/Types";

export async function getStaticProps() {
  try {
    // Вызов вашего API-обработчика и получение данных книг
    const response = await fetch(`http://localhost:3000/api/books?subject=Architecture&page=1`);
    const bookData: { items: bookData[] } = await response.json();

    // Возвращение данных книг в виде пропсов
    return {
      props: {
        bookData: []
      }
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    // Возвращение пустых данных в случае ошибки
    return {
      props: {
        bookData: null
      }
    };
  }
}

interface HomeProps {
  bookData: bookData;
}

const Home: React.FC<HomeProps> = ({ bookData }) => {
    return (
      <Layout>
        <Slider />
        <div className='content container'>
          <Sidebar />
          <div className='booklist'>
            <Bookcard bookData={bookData} />
          </div>
        </div>
      </Layout>
    )
}

export default Home;

