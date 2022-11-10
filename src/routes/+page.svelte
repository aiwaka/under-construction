<main>
  <section class="top-screen">
    <div class="top-image" />
    <div class="title-card">
      <h1 class="title">UNDER CONSTRUCTION</h1>
      <p class="subtitle">Aiwaka's profile website</p>
    </div>
  </section>
  <section id="profile">
    <h2>Aiwaka</h2>
    <p>Japan, Nara</p>
  </section>
</main>

<style>
  .top-screen {
    height: calc(100vh - 5rem);
  }
  .title-card {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    letter-spacing: 0.7rem;
    color: darkslateblue;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
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
</style>
