---
name: RailwayCompanyData
root: 'src/lib/other/station-collections/data/companyData'
output: "**/*"
ignore: []
questions:
  id: 'Enter company ID.'
  name: "Enter company name."
  tags: "Enter tags (separate by ',')."
---

# `{{ camel(inputs.id) }}Data.ts`

```mdx
import { createCompanyData } from "../utils";

const {{ camel(inputs.id) }}Data = createCompanyData("{{ inputs.id }}", "{{ inputs.name }}", [{{ for tag in split(inputs.tags, ",") }}"{{ tag }}", {{ end }}]);

// {{ camel(inputs.id) }}Data.addLineData();

export default {{ camel(inputs.id) }}Data;

```
