import type { AllowedName } from "./allowdServiceName";

export interface SkillData {
  name: string;
  icon: AllowedName;
  history: string;
  description: string;
}

export interface LanguageData extends Omit<SkillData, "icon"> {
  icon: AllowedName | AllowedName[];
}

export interface FrameworkData extends Omit<SkillData, "icon"> {
  icon: AllowedName | null;
  langIcon: AllowedName;
}
export interface DbData extends SkillData {}
export interface ToolsData extends SkillData {}
export type { AllowedName };
