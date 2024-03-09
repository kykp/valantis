type Acc = {
  [key: string] : number;
}
export const getUniqIds = (ids: string[]): string[] => {
  const frequencies: Acc = {};

  // Сначала подсчитываем частоту появления каждой строки
  ids.forEach((item: string) => {
    if (!frequencies[item]) {
      frequencies[item] = 1;
    } else {
      frequencies[item]++;
    }
  });

  // Затем возвращаем только те строки, которые встречаются только один раз
  return Object.keys(frequencies).filter((key) => frequencies[key] === 1);
};
