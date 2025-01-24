import React from "react";
import { Box, Card, CardContent, Avatar, Typography, Divider, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const postMock = {
  username: "johndoe",
  isVerified: true,
  avatar: "https://via.placeholder.com/150",
  content: "This is a sample post. Just testing how it looks!",
  createdAt: "2025-01-24T12:00:00Z",
  thumbnail: "https://via.placeholder.com/150",
  replies: [{ username: "janedoe" }, { username: "marksmith" }],
  likes: 12,
};

export default function TestThreadPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          {/* Avatar và username */}
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={postMock.avatar} alt="User Avatar" />
            <Box ml={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {postMock.username} {postMock.isVerified && "✔️"}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                5 minutes ago
              </Typography>
            </Box>
          </Box>

          {/* Nội dung bài đăng */}
          <Typography variant="body1" mb={2}>
            {postMock.content}
          </Typography>

          {/* Ảnh trong bài đăng */}
          {postMock.thumbnail && (
            <Box mb={2}>
              <img
                src={postMock.thumbnail}
                alt="Post Thumbnail"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>
          )}

          <Divider />

          {/* Nút tương tác */}
          <Box display="flex" justifyContent="space-around" mt={2}>
            <IconButton>
              <ThumbUpOutlinedIcon />
              <Typography ml={1}>{postMock.likes}</Typography>
            </IconButton>
            <IconButton>
              <ModeCommentOutlinedIcon />
              <Typography ml={1}>{postMock.replies.length} replies</Typography>
            </IconButton>
            <IconButton>
              <ShareOutlinedIcon />
              <Typography ml={1}>Share</Typography>
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
