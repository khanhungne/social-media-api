import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

function Post({ post }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        marginBottom: 2,
        backgroundColor: "white",
        maxWidth: 600,
        mx: "auto"
      }}
    >
      <CardContent sx={{ minHeight: 200 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" marginBottom={1}>
          <Avatar src={post.avatar} alt={post.username} />
          <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              fontWeight="bold"
              variant="subtitle1"
              sx={{ lineHeight: 1  }}
            >
              {post.username}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {post.time}
            </Typography>
          </Box>
        </Box>

        {/* Nội dung bài viết */}
        <Typography variant="body1" mb={2} sx={{ lineHeight: 1.5 }}>
          {post.content}
        </Typography>

        {/* Hình ảnh/video */}
          {/* Images */}
          {post.images && post.images.length > 0 && (
          <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            justifyContent="flex-start"
            mb={2}
          >
            {post.images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                alt={`post-${index}`}
                sx={{
                  width: post.images.length === 1 ? "100%" : "48%",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            ))}
          </Box>
        )}

    {/* Thanh tương tác */}
    <Box display="flex" justifyContent="space-around" mt={1}>
          <IconButton>
            <ThumbUpOutlinedIcon />
            <Typography ml={0.5} variant="caption">
              {post.likes}
            </Typography>
          </IconButton>
          <IconButton>
            <ModeCommentOutlinedIcon />
            <Typography ml={0.5} variant="caption">
              {post.comments}
            </Typography>
          </IconButton>
          <IconButton>
            <ShareOutlinedIcon />
            <Typography ml={0.5} variant="caption">
              {post.shares}
            </Typography>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Post;
