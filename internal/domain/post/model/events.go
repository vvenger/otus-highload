package post

type FanoutBatch struct {
	PostID      string   `json:"post_id"`
	AuthorID    string   `json:"author_id"`
	Text        string   `json:"text"`
	FollowerIDs []string `json:"follower_ids"`
}

type WSPostEvent struct {
	PostID       string `json:"postId"`
	PostText     string `json:"postText"`
	AuthorUserID string `json:"author_user_id"`
}
