
package models

import "time"

type Scan struct {
    ID        string    `json:"id"`
    Target    string    `json:"target"`
    Status    string    `json:"status"`
    StartedAt time.Time `json:"started_at"`
}

type ToolRun struct {
    ID        string    `json:"id"`
    ScanID    string    `json:"scan_id"`
    Tool      string    `json:"tool"`
    Status    string    `json:"status"`
    ExitCode  *int      `json:"exit_code,omitempty"`
    StartedAt time.Time `json:"started_at"`
}

type HTTPResult struct {
    URL         string   `json:"url"`
    StatusCode  int      `json:"status_code"`
    Title       string   `json:"title,omitempty"`
    ContentType string   `json:"content_type,omitempty"`
    RedirectURL string   `json:"redirect_url,omitempty"`
    Technologies []string `json:"technologies,omitempty"`
}
