import BFooter from "./footer";
import BNavbar from "./navbar";
import PostForm from "./postform";
import PostList from "./postlist";

export const dynamic = "force-dynamic";

export default function Home() {
  const boins = 0;

  return (
    <div className="h-full w-full">
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex-col items-center justify-between">
        <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">
          Compliment Wall
        </h1>
        <PostForm></PostForm>
        <PostList></PostList>
        {/* <div className="sticky bottom grid justify-items-center pb-2">
          <BFooter boins={boins}></BFooter>
        </div> */}
      </main>
    </div>
  );
}
