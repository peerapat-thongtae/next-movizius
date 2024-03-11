import { useAuth } from "@/shared/hocs/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      router.replace(`/search?name=${e.target.value}`);
    }
  }

  const { login, isAuthenticated, logout } = useAuth();
  return (
    <div className="bg-main mx-auto flex h-24 w-[100%] items-center text-white">
      <span onClick={() => router.replace("/")} className="ml-4 text-xl font-black uppercase cursor-pointer flex-none">MOVIZIUS</span>
      <nav className="contents text-base font-semibold lg:text-lg">
        <ul className="mx-auto flex items-center">
          <li className="p-5 xl:p-8 hover:text-yellow-500">
            <Link href={'/'}>Home</Link>
          </li>
          <li className="p-5 xl:p-8 hover:text-yellow-500">
            <Link href={'/movie'}>Movies</Link>
          </li>
          <li className="p-5 xl:p-8 hover:text-yellow-500">
            <Link href={'/tv'}>TV</Link>
          </li>
          <li className="p-5 xl:p-8 hover:text-yellow-500">
            <Link href={'/person'}>Person</Link>
          </li>
        </ul>
      </nav>
      <div className="relative flex items-center mx-8 w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          onKeyUp={handleKeyUp}
          placeholder="Search something.." />
      </div>
      <div className="w-72 text-right">
        {!isAuthenticated ?
          <button
            onClick={login}
            type="button"
            className="rounded-full border border-white px-8 py-2 font-bold"
          >
            Log in
          </button>
          :
          <button
            onClick={() => logout()}
            type="button"
            className="rounded-full border border-white px-8 py-2 font-bold"
          >
            Log out
          </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
