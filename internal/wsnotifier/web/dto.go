package web

type WSPostEvent struct {
	PostID       string `json:"postId"`
	PostText     string `json:"postText"`
	AuthorUserID string `json:"author_user_id"`
}
