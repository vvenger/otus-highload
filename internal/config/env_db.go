package config

type QueryExecMode string

const (
	QueryExecModeCache  QueryExecMode = "CACHE_STATEMENT"
	QueryExecModeExec   QueryExecMode = "MODE_EXEC"
	QueryExecModeSimple QueryExecMode = "SIMPLE_PROTOCOL"
)
