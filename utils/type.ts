

// export type SignUpInput = {
//     email:string,
//     password:string
// } 


export type LoginInput = {
  email: string,
  password: string
}

export type UserInfoType = {
  id: number,
  email: string
  username: string
  fullName: string
  description: string
  profileImage: string
  isProfileInfoSet: boolean
  createdAt: string
}

export type gigsDataType = {
  title: string,
  description: string
  category: string,
  deliveryTime: string,
  revision: string,
  features: string[],
  price: string,
  shortDesc: string
}

export type UserGigsType = {
  category: string,
  createdAt: string,
  deliveryTime: number,
  description: string
  features: string[]
  id: number,
  images: string[]
  price: number,
  revision: number
  shortDesc: string,
  title: string
  userId: number
  createdBy: UserInfoType,
  reviews: AddReviewResponseType[]
}

export type SearchUserGigsType = {
  category: string,
  createdAt: string,
  deliveryTime: number,
  description: string
  features: string[]
  id: number,
  images: string[]
  price: number,
  revision: number
  shortDesc: string,
  title: string
  userId: number
  createdBy: UserInfoType
}

export type SearchInputType = {
  searchTerm: string | undefined,
  category: string | undefined
}

export type BuyerOrderType = {
  buyerId: number
  createdAt: string
  gig: UserGigsType
  gigId: number
  id: number
  isCompleted: boolean
  paymentIntent: string
  price: number
}


export type SellerOrderType = {
  buyer: UserInfoType
  buyerId: number
  createdAt: string
  gig: UserGigsType
  gigId: number
  id: number
  isCompleted: boolean
  paymentIntent: string
  price: number
}

export type checkGigOrderType = {
  buyerId: number
  createdAt: string
  gigId: number
  id: number
  isCompleted: boolean
  paymentIntent: string
  price: number
}

export type ReviewInputType = {
  reviewText: string
  rating: number
}

export type AddReviewResponseType = {
  id: number
  createdAt: string
  rating: number
  reviewText: string
  gigId: number
  reviewerId: string
  reviewer: UserInfoType
}

export type MessageInput = {
  recipentId: string,
  message: string
}

export type MessageType = {
  senderId: number,
  recipentId: number,
  orderId: number,
  text: string,
  isRead: boolean,
  createdAt: string
}

export type DashboardDataType = {
  dailyRevenue: number
  gigs: number
  monthlyRevenue: number
  orders: number
  revenue: number
  unreadMessages: number
}

export type UnreadMessageType = {
  senderId: number,
  recipentId: number,
  orderId: number,
  text: string,
  isRead: boolean,
  createdAt: string
  id:number
  sender:UserInfoType
}