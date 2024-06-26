package config

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_parseArgs(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		args []string
		want cmdArgs
	}{
		{
			name: "OK",
			args: []string{"-c", "config.yaml", "-l", "error", "-f", "console"},
			want: cmdArgs{
				ConfigFile: "config.yaml",
				LogLevel:   "error",
				LogFormat:  "console",
			},
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got, err := parseArgs(&Config{}, tt.args)

			require.NoError(t, err)
			require.Equal(t, tt.want, got)
		})
	}
}
