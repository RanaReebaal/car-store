import Header from "./page-components/Header";
import SocialLinks from "./components/SocialLinks";
import CustomerReview from "./page-components/CustomerReview";
import GoogleMap from "./components/GoogleMap";


export default function Home() {
  return (
    <>
      <Header />
      <SocialLinks />
      <CustomerReview />
      <GoogleMap />
    </>
  );
}
