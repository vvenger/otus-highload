package feed

type FanoutBatch struct {
	PostID      string   `json:"post_id"`
	AuthorID    string   `json:"author_id"`
	Text        string   `json:"text"`
	FollowerIDs []string `json:"follower_ids"`
}
