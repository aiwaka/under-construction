<script lang="ts">
  // このアプリでアイコンを提供する名前セットを定義する
  type AllowedName =
    | "aws-ec2"
    | "c"
    | "c++"
    | "docker"
    | "express"
    | "firebase"
    | "flask"
    | "fortran"
    | "github"
    | "js"
    | "latex"
    | "mariadb"
    | "mysql"
    | "nginx"
    | "node"
    | "numpy"
    | "postcss"
    | "psql"
    | "python"
    | "sass"
    | "svelte"
    | "rust"
    | "ts"
    | "twitter"
    | "vite"
    | "vue";

  export let name: AllowedName;
  export let size = "2rem";

  const getSvgUrl = (serviceName: AllowedName) => {
    switch (serviceName) {
      case "c":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg";
      case "c++":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg";
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
      case "psql":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg";
      case "python":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
      case "rust":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg";
      case "sass":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg";
      case "svelte":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg";
      case "ts":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
      case "twitter":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg";
      case "vue":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg";
      case "aws-ec2":
        return "/img/svg-porn/aws-ec2.svg";
      case "fortran":
        return "/img/svg-porn/fortran.svg";
      case "mariadb":
        return "/img/svg-porn/mariadb.svg";
      case "postcss":
        return "/img/svg-porn/postcss.svg";
      case "vite":
        return "/img/svg-porn/vitejs.svg";
      default:
        return "";
    }
  };

  $: svgUrl = getSvgUrl(name);
</script>

<div class="language-icon">
  <img class="icon-img" src={svgUrl} style:width={size} style:height={size} alt={`icon-${name}`} />
</div>

<style>
  .language-icon {
    display: inline-block;
    vertical-align: sub;
  }
</style>
