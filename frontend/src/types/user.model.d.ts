interface IUserMongo {
  user: IUser;
}

interface IUser {
  _id: string;
  email: string;
  isAdmin: boolean;
  image?: string;
}
