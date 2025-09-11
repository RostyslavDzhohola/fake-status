export interface PromptPreset {
  scene: "yacht";
  placeHolder: string;
}

export const yachtPreset: PromptPreset = {
  scene: "yacht",
  placeHolder:
    "Insert a person from the image into the yacht scene in the center",
};

// Returns the composed prompt using the base yacht guidance and the user's prompt.
// Keep the prompt text-only; images are passed as separate message parts to the model.
export function buildComposedPrompt(
  userPrompt: string,
  hasUserImage: boolean
): string {
  const user = (userPrompt || "").trim();

  const editBase =
    "Make changes to the following image according to the instructions. Preserve photorealism, maintain consistent lighting and shadows, and avoid artifacts or distortions.";

  const compositeBase =
    "Maintain the existing base image only inserting the person in the second picture inside the yacht scene in the middle. Make all the ladies look at the center at the guy listening to his stories, being super into whatever he's saying, super excited, laughing. The number of ladies should remain the same for ladies. The output should be 4:5 format for IG.";

  const base = hasUserImage ? compositeBase : editBase;

  // Compose a concise, single-string instruction for the model
  return [base, `Extra instructions: ${yachtPreset.placeHolder}`, user]
    .filter(Boolean)
    .join(" — ");
}
