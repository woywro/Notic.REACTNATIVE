export const generateIntroText = (text) => {
  return `${text.split(" ").splice(0, 15).join(" ")}...`;
};
