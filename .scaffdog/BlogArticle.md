---
name: BlogArticle
root: 'src/content/blog'
output: "**/*"
ignore: []
questions:
  slug: 'Enter filename.'
  title: "Enter title."
  # date: "Enter date text (yyyy-mm-dd)."
  tags: "Enter tags (separate by ',')."
  description: "Enter description text."
---

# `{{ inputs.slug }}.mdx`

```mdx
---
title: {{ inputs.title }}
description: {{ inputs.description }}
thumbnail: remote
date: {{ today() }}
tags:
  {{ for tag in split(inputs.tags, ",") }}- {{ tag }}
  {{ end }}
draft: true
---

import BlogImagesRemote from "@components/blog/BlogImagesRemote.astro";
export const ARTICLE_ID = "{{ inputs.slug }}";

```
