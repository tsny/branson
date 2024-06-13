import { getSessionUser } from "./actions";
import BFooter from "./footer";
import BNavbar from "./navbar";
import PostForm from "./postform";
import PostList from "./postlist";

export const dynamic = "force-dynamic";

export default async function Home() {
  let user = await getSessionUser();
  return (
    <div>
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex flex-col items-center ">
        <h1 className="text-4xl font-bold text-center text-gray-800 pt-4 mb-8">
          Compliment Wall
        </h1>
        {user && <PostForm></PostForm>}
        <PostList></PostList>
        <BFooter></BFooter>
      </main>
    </div>
  );
}
