import BFooter from "./footer";
import BNavbar from "./navbar";
import PostForm from "./postform";
import PostList from "./postlist";
import SignInLink from "./signin";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="h-full w-full">
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex-col items-center justify-between">
        <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">
          Compliment Wall
        </h1>
        <SignInLink></SignInLink>

        <PostForm></PostForm>
        <PostList></PostList>
        <div className="sticky bottom-0 grid justify-items-center pb-2">
          <BFooter></BFooter>
        </div>
      </main>
    </div>
  );
}
