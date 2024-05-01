export default async function FetchLevels(): Promise<number> {
  const result = await new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, 1000);
  });

  return result as Promise<number>;
}
