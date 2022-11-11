<script>
  import ServiceIcon from "@/components/ServiceIcon.svelte";
</script>

<section class="contact-section section-item">
  <h2 id="contact">Contact</h2>
  <span>お問い合わせはメールにてお願いいたします。</span>
  <div class="contact-container">
    <a
      href="mailto:Kw.I.KU.2525@gmail.com?subject=%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B（From Under-Construction）"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="contact-item mail">
        <ServiceIcon name="gmail" size="large" />
        <span>Kw.I.KU.2525@gmail.com</span>
      </div>
    </a>
    <a href="https://github.com/littleIkawa" target="_blank" rel="noopener noreferrer">
      <div class="contact-item github">
        <ServiceIcon name="github" size="large" />
        <span>@littleIkawa</span>
      </div>
    </a>
  </div>
</section>

<style>
  .contact-container {
    display: flex;
    margin: 12rem auto;
    justify-content: center;
  }
  .contact-item {
    display: flex;
    margin: auto 2rem;
    flex-direction: column;
    align-items: center;
  }
</style>
