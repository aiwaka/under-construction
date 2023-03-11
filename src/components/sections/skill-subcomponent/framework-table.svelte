<script lang="ts">
  import ServiceIcon from "@components/ServiceIcon.svelte";
  import type { FrameworkData } from "@lib/profile";

  export let frameworkTableData: FrameworkData[];
</script>

<table class="framework-table skill-table">
  <tbody>
    {#each frameworkTableData as data}
      <tr class="table-row">
        <th class="name">
          <div>
            <ServiceIcon name={data.langIcon} size="small" />
          </div>
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
