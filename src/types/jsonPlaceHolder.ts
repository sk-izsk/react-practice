export interface Comment {
  postId?: number
  id?: number
  name: string
  email: string
  body: string
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Album {
  userId: number
  id: number
  title: string
}

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface UserGeo {
  lat: string
  lng: string
}

export interface UserAddress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: UserGeo
}

export interface UserCompany {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: UserAddress
  phone: string
  website: string
  company: UserCompany
}
