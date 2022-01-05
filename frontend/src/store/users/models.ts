export interface UsersStateInterface {
  users: User[];
}
export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAdmin: string;
  isActive: boolean;
  lastModified: string;
  createdDate: string;
  lastLogin: string;
  profileImage: FileList;
  imageName: string;
  oldImageName: string;
}
