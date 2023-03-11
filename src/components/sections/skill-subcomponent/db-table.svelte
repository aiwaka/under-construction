<script lang="ts">
  import ServiceIcon from "@components/ServiceIcon.svelte";
  import type { DbData } from "@lib/profile";

  export let dbTableData: DbData[];
</script>

<table class="db-table skill-table">
  <tbody>
    {#each dbTableData as data}
      <tr class="table-row">
        <th class="name">
          {#if data.icon}
            <ServiceIcon name={data.icon} size="normal" />
          {/if}
          <span>{data.name}</span>
        </th>
        <td class="desc"
          ><p>
            使用歴：{data.history}
          </p>
          <p>
            {data.description}
          </p></td
        >
      </tr>
    {/each}
  </tbody>
</table>
