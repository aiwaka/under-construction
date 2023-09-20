---
name: StationCollection
root: 'src/content/station'
output: "**/*"
ignore: []
questions:
  id: 'Enter station ID.'
  name: "Enter station name."
  lines: "Enter lines (separate by ', ')."
  date: "Enter first visit date text (yyyy-mm-dd or 'none')."
---

# `{{ inputs.id }}.mdx`

```mdx
---
name: {{ inputs.name }}
lines: [{{ inputs.lines }}]
{{ if inputs.date != "none" }}firstVisitDate: {{ inputs.date }}{{ end }}
---


```
