import Feed from '../components/Feed';

export default function Home() {
  return (
    <div className="md:px-8 px-2 mt-4 flex justify-center items-center md:gap-8">
      <div className="md:w-1/4 w-0"></div>
      <div className="md:w-2/4 w-full">
        <Feed />
      </div>
      <div className="md:w-1/4 w-0"></div>
    </div>
  );
}
