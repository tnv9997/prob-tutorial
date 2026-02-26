import { getCharacter } from '../data/characters.js';

/**
 * Generate a concrete question instance from a template.
 * Returns an object ready for the QuestionScreen to display.
 */
export function generateQuestion(template, providedParams = null) {
  const params = providedParams || template.paramGenerator();
  const character = getCharacter(template.characterId);

  // Build the story text
  let story;
  if (template.storyTemplateFn) {
    story = template.storyTemplateFn(params, character.name);
  } else {
    story = template.storyTemplate.replace(/\{character\}/g, character.name);
    // Replace all params in story
    for (const [key, val] of Object.entries(params)) {
      story = story.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
    }
  }

  // Build derived params for hints/theory text
  const derivedParams = { ...params };
  if (params.red !== undefined) derivedParams.red_minus_1 = params.red - 1;
  if (params.total !== undefined) derivedParams.total_minus_1 = params.total - 1;
  if (params.hearts !== undefined) derivedParams.hearts_minus_1 = params.hearts - 1;
  if (params.gulab !== undefined) derivedParams.gulab_minus_1 = params.gulab - 1;
  if (params.pairs) derivedParams.pairs_str = params.pairs.map(p => `(${p[0]},${p[1]})`).join(', ');
  // For compound dependent: compute final numerator/denominator
  if (params.red !== undefined && params.total !== undefined) {
    derivedParams.num = params.red * (params.red - 1);
    derivedParams.den = params.total * (params.total - 1);
  }

  // Process steps: fill in param placeholders in prompts, hints, theory
  const steps = template.steps.map((step, index) => {
    const fillParams = (text) => {
      if (!text) return text;
      let filled = text;
      for (const [key, val] of Object.entries(derivedParams)) {
        if (val !== null && val !== undefined && typeof val !== 'object') {
          filled = filled.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
        }
      }
      // Handle array display for targets
      if (params.targets) {
        filled = filled.replace(/\{targets\}/g, params.targets.join(', '));
      }
      return filled;
    };

    return {
      index,
      prompt: fillParams(step.prompt),
      answer: step.computeAnswer(params),
      acceptFormats: step.acceptFormats,
      hint: fillParams(step.hint),
      theory: fillParams(step.theory),
      formula: fillParams(step.formula || ''),
      miniExample: fillParams(step.miniExample || ''),
      visual: step.visual,
      visualParams: step.visualParams ? step.visualParams(params) : null,
    };
  });

  return {
    id: `${template.id}_${Date.now()}`,
    templateId: template.id,
    concept: template.concept,
    difficulty: template.difficulty,
    character,
    story,
    steps,
    keywords: template.keywords || [],
    params,
  };
}
