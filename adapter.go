package runner

import (
    "context"
    "time"
)

type Result struct {
    ExitCode  int
    StartedAt time.Time
    FinishedAt time.Time
    StdoutPath string
    StderrPath string
}

type Tool interface {
    Name() string
    Run(ctx context.Context, input []string, outputDir string) (Result, error)
}
