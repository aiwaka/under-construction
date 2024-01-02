---
name: BlogArticle
root: 'src/content/blog'
output: "**/*"
ignore: []
questions:
  slug: 'Enter filename (exclude extension).'
  title: "Enter title."
  # date: "Enter date text (yyyy-mm-dd)."
  tags: "Enter tags (separate by ',')."
  description: "Enter description text."
  useAutoPostLink:
    confirm: "Use AutoPostLink component?"
    initial: false
  createAutoLink:
    if: inputs.useAutoPostLink
    confirm: "Create AutoPostLink tag?"
  autoLinkSlug:
    if: inputs.createAutoLink
    message: "Input the slug of `AutoPostLink`."
  useEmbedYoutube:
    confirm: "Use EmbedYoutube component?"
    initial: false
---

# `{{ inputs.slug }}.mdx`

```mdx
---
title: {{ inputs.title }}
description: {{ inputs.description }}
thumbnail:
  type: remote
date: {{ today() }}
tags:
  {{ for tag in split(inputs.tags, ",") }}- {{ tag }}
  {{ end }}
draft: true
---

export const ARTICLE_ID = "{{ inputs.slug }}";
import BlogImagesList from "@components/blog/BlogImagesList.astro";
{{ if inputs.useAutoPostLink }}import AutoPostLink from "@components/blog/AutoPostLink.astro";{{ end }}
{{ if inputs.useEmbedYoutube }}import EmbedYoutube from "@components/works/EmbedYoutube.astro";{{ end }}

{{ if inputs.createAutoLink }}<AutoPostLink slug="{{ inputs.autoLinkSlug }}">リンク</AutoPostLink>。{{ end }}

```
