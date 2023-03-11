import type { AllowedName } from "./allowdServiceName";

export interface SkillData {
  name: string;
  icon: AllowedName | AllowedName[];
  history: string;
  description: string;
}

export interface FrameworkData extends Omit<SkillData, "icon"> {
  icon: AllowedName | null;
  langIcon: AllowedName;
}
export interface DbData extends Omit<SkillData, "icon"> {
  icon: AllowedName;
}
export interface ToolsData extends Omit<SkillData, "icon"> {
  icon: AllowedName;
}
export { AllowedName };
