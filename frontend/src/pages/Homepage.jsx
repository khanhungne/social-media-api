import React from "react";
import { Box } from "@mui/material";
import Post from "../components/posts/PostItem";
import rosieAvatar from "../assets/rosie.jpg";

const mockPosts = [
  {
    id: 1,
    username: "nabila_qabrdy",
    avatar: rosieAvatar,
    time: "8h",
    content: "pickaboo 🐰",
    images: [rosieAvatar, rosieAvatar, rosieAvatar],
    likes: "17.8K",
    comments: 47,
    shares: 244,
  },
  {
    id: 2,
    username: "ii.ira_",
    avatar: "https://via.placeholder.com/40",
    time: "42m",
    content: "I'm trapped in those eyes",
    // images: [
    //   "https://via.placeholder.com/300x400",
    //   "https://via.placeholder.com/300x400",
    // ],
    likes: 334,
    comments: 3,
    shares: 17,
  },
];

function HomePage() {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
}

export default HomePage;
