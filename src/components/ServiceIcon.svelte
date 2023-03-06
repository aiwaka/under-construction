<script lang="ts">
  import type { AllowedName } from "./allowdServiceName";

  export let name: AllowedName;
  export let size = "normal";

  const getSvgUrl = (serviceName: AllowedName) => {
    switch (serviceName) {
      case "c":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg";
      case "c++":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg";
      case "css":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg";
      case "docker":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg";
      case "express":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg";
      case "firebase":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg";
      case "flask":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg";
      case "github":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
      case "html":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg";
      case "js":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
      case "latex":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg";
      case "mysql":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain-wordmark.svg";
      case "nginx":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg";
      case "node":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
      case "numpy":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg";
      case "nuxt":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg";
      case "psql":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg";
      case "python":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
      case "rust":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg";
      case "sass":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg";
      case "shell":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg";
      case "svelte":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg";
      case "ts":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
      case "twitter":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg";
      case "vue":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg";
      case "aws-ec2":
        return "svg-porn-icon/aws-ec2.svg";
      case "fortran":
        return "svg-porn-icon/fortran.svg";
      case "gmail":
        return "svg-porn-icon/google-gmail.svg";
      case "mariadb":
        return "svg-porn-icon/mariadb.svg";
      case "postcss":
        return "svg-porn-icon/postcss.svg";
      case "vite":
        return "svg-porn-icon/vitejs.svg";
      default:
        return "";
    }
  };

  const getSize = (sizeStr: string) => {
    switch (sizeStr) {
      case "normal":
        return "4rem";
      case "small":
        return "3rem";
      case "large":
        return "6rem";
      default:
        return sizeStr;
    }
  };

  $: svgUrl = getSvgUrl(name);
  $: computedSize = getSize(size);
</script>

<div class="language-icon">
  <img
    class="icon-img"
    src={svgUrl}
    style:width={computedSize}
    style:height={computedSize}
    alt={`icon-${name}`}
  />
</div>

<style>
  .language-icon {
    display: inline-block;
    vertical-align: sub;
  }
</style>
