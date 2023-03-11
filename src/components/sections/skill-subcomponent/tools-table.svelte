<script lang="ts">
  import ServiceIcon from "@components/ServiceIcon.svelte";
  import type { ToolsData } from "@lib/profile";

  export let toolsTableData: ToolsData[];
</script>

<table class="tools-table skill-table">
  <tbody>
    {#each toolsTableData as data}
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
