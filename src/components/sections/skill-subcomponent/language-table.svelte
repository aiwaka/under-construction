<script lang="ts">
  import type { LanguageData } from "@lib/profile";

  import ServiceIcon from "@components/ServiceIcon.svelte";

  export let languageTableData: LanguageData[];
</script>

<table class="lang-table skill-table">
  <tbody>
    {#each languageTableData as data}
      <tr class="table-row">
        <th class="name">
          {#if Array.isArray(data.icon)}
            {#each data.icon as icon}
              <ServiceIcon name={icon} size="normal" />
              <!-- レスポンシブにサイズ変更したいかも -->
            {/each}
          {:else}
            <ServiceIcon name={data.icon} size="normal" />
          {/if}
          <span>{data.name}</span>
        </th>
        <td class="desc">
          <p>
            使用歴：{data.history}
          </p>
          <p>
            {data.description}
          </p>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
