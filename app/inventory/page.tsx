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
      <div className="font-bold text-center mb-3">
        You have {cords.length} cards and {user.dust} dust!
      </div>
      <SellerPanel cords={cords}></SellerPanel>
    </div>
  );
}
