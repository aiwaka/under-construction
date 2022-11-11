<section class="profile-section">
  <h2 id="profile">Aiwaka</h2>
  <div class="my-icon-col">
    <img class="icon" src="my-icon.png" alt="Aiwaka icon" />
  </div>
  <div class="text-col">
    <ul class="profile-data">
      <li>Location: Japan, Nara</li>
      <li>Education: Graduate School of Informatics, Kyoto University</li>
    </ul>
    <p>遊ぶことが好きです。</p>

    <p>
      小学生時代まで熊本に住み、中学受験を経て奈良に移りました。現在も奈良から京都大学に通っています。
      <br />
      趣味はビデオゲーム、作曲、ピアノ、イラスト、カラオケ、ドライブ、散歩、鉄道、地理、プログラミングです。今後も増えます。
    </p>
  </div>
  <div>
    <h3>経歴</h3>
    <ul class="history">
      <li>2018年京都大学工学部情報学科入学</li>
      <li>2022年同学科卒業</li>
      <li>2022年京都大学大学院情報学研究科先端数理科学専攻入学（計算力学分野）</li>
      <li>2024年同専攻卒業予定</li>
    </ul>
  </div>
</section>

<style>
  p {
    margin: 2rem auto;
  }
  #profile {
    width: 100%;
  }
  .profile-section {
    display: flex;
    flex-wrap: wrap;
  }
  .my-icon-col {
    overflow: hidden;
    width: 20%;
    margin: auto;
  }
  .my-icon-col .icon {
    border-radius: 30rem;
    width: 90%;
    object-fit: contain;
  }
  .text-col {
    width: 70%;
  }
  .history,
  .profile-data {
    list-style: disc;
  }
</style>
