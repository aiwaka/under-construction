---
name: RailwayCompanyData
root: 'src/lib/more/station-collections/data/companyData'
output: "**/*"
ignore: []
questions:
  id: 'Enter company ID.'
  name: "Enter company name."
  tags: "Enter tags (separate by ',')."
---

# `{{ inputs.id }}Data.ts`

```mdx
import { createCompanyData } from "../utils";

const {{ inputs.id }}Data = createCompanyData("{{ inputs.id }}", "{{ inputs.name }}", [{{ for tag in split(inputs.tags, ",") }}"{{ tag }}", {{ end }}]);

// {{ inputs.id }}Data.addLineData();

export default {{ inputs.id }}Data;

```
