import { Avatar, Button, Card } from "flowbite-react";

export default function Page() {
  return (
    <div>
      <HeaderBlock></HeaderBlock>
      <HeaderBlock></HeaderBlock>
    </div>
  );
}

function HeaderBlock() {
  return (
    <div className="rounded border-gray-300 border-2 bg-white p-2 m-2">
      <p className="text-xl text-bold mb-1">Business</p>
      <p className="text-sm text-bold mb-2">
        Business is the best thing on the planet
      </p>
      <p className="text-xs text-bold text-gray-500 mb-0">We do finance</p>
      <p className="text-xs text-bold text-gray-500 mb-3">
        St. Louis * 534k Followers
      </p>
      <Button className="mb-5" color="purple" pill>
        Visit website
      </Button>

      <hr className=""></hr>
      <p className="text-xl text-bold mt-3 mb-1">Meet the Team</p>
      <div className="grid col-1 gap-2">
        <Avatar
          img="https://flowbite-react.com/images/people/profile-picture-5.jpg"
          alt="avatar of Jese"
        >
          <div className="space-y-1 font-medium dark:text-white">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </div>
          </div>
        </Avatar>
        <Avatar
          img="https://flowbite-react.com/images/people/profile-picture-5.jpg"
          alt="avatar of Jese"
        >
          <div className="space-y-1 font-medium dark:text-white">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </div>
          </div>
        </Avatar>
      </div>
    </div>
  );
}
