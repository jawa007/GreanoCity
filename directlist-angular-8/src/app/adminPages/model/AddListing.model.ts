import { Image } from "./Image.model";
import { Pricing } from "./Pricing.model";
import { Location } from "./Location.model";

export class AddListing {
  id?: string;
  businessName: string
  ownerName: string
  category: string
  phone: string
  mobile:string
  keywords:string
  websiteUrl:string
  facebookUrl:string
  twitterUrl:string
  email:string
  amenities:string[]
  image:string
  description:string
  location:Location
  pricing:Pricing[]
}
