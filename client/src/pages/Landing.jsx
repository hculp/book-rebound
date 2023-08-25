import SearchComponent from '../components/SearchBar';
import BookCard from '../components/BookCard';
import SearchPagination from '../components/Pagination';

function Landing() {
  return (
    <div className="bg-forestback-50">
      <SearchComponent />
      <div className="grid grid-cols-3 p-4">
      <BookCard />
      <BookCard />
      <BookCard />
      <SearchPagination />
      </div>
      {/* <h1 className="page-title text-4xl">Landing</h1>
      <p className="text-3xl underline">Test element!</p>
      <p className="border border-3 rounded-xl">Another test</p> */}
    </div>
  )
}

export default Landing