package topics

const (
	TopicFanout = "feed.fanout"
	TopicEvent  = "post:events" // deprecated: будет удалён в шаге 6
)

const (
	EventTypeCreated = "post.created"
	EventTypeUpdated = "post.updated"
	EventTypeDeleted = "post.deleted"
)

const (
	StreamName       = "FEED_FANOUT"
	CacheConsumer    = "feed-cache"
	NotifierConsumer = "post-notifier"
)
