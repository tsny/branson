import { getCordsForUser, getCurrentDBUser } from "../actions";
import InvLinkHeader from "./linkHeader";
import SellerPanel from "./seller";

export default async function InventoryPage() {
  let user = await getCurrentDBUser();
  if (!user) {
    return <>not logged in</>;
  }
  let cords = await getCordsForUser(user.id);

  return (
    <div>
      <InvLinkHeader invSelected={true}></InvLinkHeader>
      <SellerPanel userDust={user.dust} cords={cords}></SellerPanel>
    </div>
  );
}
