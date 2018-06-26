export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  creator: { _id: string; firstname: string; lastname: string };
  comments: [any];
}
