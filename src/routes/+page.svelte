<script>
  import ProfileSection from "@/sections/ProfileSection.svelte";
  import SiteFooter from "@/SiteFooter.svelte";
  import SiteHeader from "@/SiteHeader.svelte";
  import WorksSection from "@/sections/WorksSection.svelte";
  import SkillSection from "@/sections/SkillSection.svelte";
  import ContactSection from "@/sections/ContactSection.svelte";
  import { base } from "$app/paths";

  // 変数でパスを指定する. cssで直接指定するとビルドの際に解決がおかしくなる
  const bgImagePath = `${base}/img/blue_2.png`;
</script>

<SiteHeader />
<div class="title-container">
  <div class="title-card">
    <h1 class="title">UNDER CONSTRUCTION</h1>
    <p class="subtitle">Aiwaka's profile website</p>
  </div>
</div>
<div class="contents">
  <div class="bg-image" style:background-image={`url(${bgImagePath})`} />
  <main class="main-container">
    <div class="contents-container">
      <ProfileSection />
      <SkillSection />
      <WorksSection />
      <ContactSection />
    </div>
    <SiteFooter />
  </main>
</div>

<style>
  .title-container {
    z-index: 20;
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    mix-blend-mode: exclusion;
  }
  .title-card {
    position: sticky;
    top: 50vh;
    height: 100vh;
    width: 80vw;
    margin: -50vh auto;
    text-align: center;
    letter-spacing: 0.7rem;
    color: azure;
  }
  .title-card .title {
    font-size: 4.2rem;
    font-weight: 800;
  }
  @media (max-width: 1024px) {
    .title-card .title {
      font-size: 2.6rem;
    }
  }
  .bg-image {
    top: 0;
    position: sticky;
    background-repeat: no-repeat;
    background-position: center 70%;
    background-size: cover;
    background-attachment: fixed;
    margin-top: 100vh;
    height: 100vh;
    width: 100vw;
  }
  .main-container {
    z-index: 2;
    position: relative;
    height: fit-content;
    width: 100vw;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
  }
  .contents-container {
    position: sticky;
    width: 70%;
  }
  @media (max-width: 1024px) {
    .contents-container {
      width: 80%;
    }
  }

  :global(.section-item) {
    margin: 8rem auto;
  }
</style>
