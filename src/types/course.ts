
export interface Concept {
  title: string;
  explanation: string;
  formula?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  concepts: Concept[];
  hasVisualization: boolean;
  hasCodeExample: boolean;
  codeExample?: string;
}
