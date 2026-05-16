package module

import (
	dialogservice "github.com/vvenger/otus-highload/internal/domain/dialog/services"
	dialogstorage "github.com/vvenger/otus-highload/internal/domain/dialog/storages"
	"github.com/vvenger/otus-highload/internal/chat/web"
	"go.uber.org/fx"
)

var (
	_ web.DialogService                   = (*dialogservice.DialogService)(nil)
	_ dialogservice.MessageRepository = (*dialogstorage.MessageStorage)(nil)
)

func Dialog() fx.Option {
	return fx.Module("dialog",
		fx.Provide(
			fx.Annotate(dialogservice.NewDialogService,
				fx.As(new(web.DialogService)),
			),
			fx.Annotate(dialogstorage.NewMessageStorage,
				fx.As(new(dialogservice.MessageRepository)),
			),
		),
	)
}
