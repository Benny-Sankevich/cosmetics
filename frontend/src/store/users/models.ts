export interface UsersStateInterface {
  users: UserInterface[];
}
export class UserInterface {
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
