type SkillData = {
  skill: string;
  score: number;
};
export const sampleSkillData: {
  data: SkillData[];
  series: { name: keyof SkillData; color: string }[];
} = {
  data: [
    { skill: "リーダーシップ", score: 70 },
    { skill: "対人能力", score: 85 },
    { skill: "達成思考", score: 90 },
    { skill: "援助・対人支援", score: 60 },
    { skill: "専門性", score: 95 },
  ],
  series: [{ name: "score", color: "primary.solid" }],
};

type JobLevelData = {
  allocation: number;
  type: string;
};

export const sampleJobLevelData: {
  data: JobLevelData[];
  series: { name: keyof JobLevelData; color: string }[];
} = {
  data: [
    { allocation: 20, type: "新人" },
    { allocation: 45, type: "CR1" },
    { allocation: 30, type: "CR2" },
    { allocation: 30, type: "MR1" },
    { allocation: 10, type: "MR2" },
  ],
  series: [{ name: "allocation", color: "primary.solid" }],
};
