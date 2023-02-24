type UserT = {
  _id: string;
  username: string;
  email: string;
  Fname: string;
  Lname: string;
  contact: string;
  date_of_birth: Date;
  followers: Array<string>;
  following: Array<string>;
  picture: string;
  greddits: Array<string>;
  posts: Array<string>;
  savedPosts: Array<string>;
};

type PostT = {
  _id: string;
  title: string;
  content: string;
  postedBy: string | UserT;
  greddit: string;
  comments: Array<{content: string, commentedBy: UserT}>;
  upvotes: Array<string>;
  downvotes: Array<string>;
}

type ReportT = {
  _id: string;
  reportedBy: UserT | string;
  reportedUser: UserT | string;
  reportedPost: PostT | string;
  reason: string;
}

type SubGredditT = {
  _id: string
  createdAt: number;
  name: string;
  description: string;
  picture: string;
  posts: Array<string>;
  followers: Array<string>;
  bannedUsers: Array<string>;
  tags: Array<string>;
  bannedKeywords: Array<string>;
  reports: Array<string>;
  joinRequests: Array<string>;
}

export { UserT, PostT, ReportT, SubGredditT };