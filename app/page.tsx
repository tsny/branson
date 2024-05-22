'use client'
import NewPost from "./newpost";
import Header from "./header";
import UpBoins from "./upboin";

interface User {
  username: string
  firstName: string
  lastName: string
  profilePicURL: string
}

interface PostProps {
  user: User
  postText: string
  likes: Number
}

const leslie: User = { username: "lsymonds", firstName: "Leslie", lastName: "S", profilePicURL: "https://theimprovshop.com/wp-content/uploads/2022/06/Leslie-Symonds-2048x2048.jpg" }
const andy: User = { username: "asloey", firstName: "Andy", lastName: "S", profilePicURL: "https://theimprovshop.com/wp-content/uploads/2018/09/andy.jpg" }
const ashley: User = { username: "arube", firstName: "Ashley", lastName: "S", profilePicURL: "https://theimprovshop.com/wp-content/uploads/2022/06/Ashley.jpg" }

function Post(props: PostProps) {
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start">
        <img
          src={props.user.profilePicURL}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800">{props.user.firstName}</span>
              <span className="text-sm text-gray-500 ml-2">@{props.user.username}</span>
              <span className="text-sm text-gray-500 ml-2">· 1h</span>
            </div>
          </div>
          <p className="mt-2 text-gray-800">
            {props.postText}
          </p>
          <UpBoins></UpBoins>
        </div>
      </div>
    </div>
  );
};

export default function Home() {

  return (
    <div className="h-full">
      <Header></Header>
      <main className="h-full pt-20 flex-col items-center justify-between m-2">

        {/* <NewPost onAddPost={{}}></NewPost> */}

        <Post user={leslie} likes={13} postText="I wanna apologize for what I said earlier"></Post>
        <Post user={andy} likes={2} postText="the shop will be closed thursday due to me being sad and tired"></Post>
        <Post user={ashley} likes={1} postText="has anyone seen my bible"></Post>
        <Post user={leslie} likes={1209} postText="I think that the left has gone too far sometimes"></Post>

        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          {/* what could happen next hmm? */}
        </div>

        <footer className="">branson branson branson branson branson branson branson branson branson branson branson branson </footer>
      </main>
    </div>
  );
}
