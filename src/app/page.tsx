import Image from "next/image";
import { dedupe, flag } from "@vercel/flags/next";

const buttonFeatureFlag = flag<boolean>({
  key: "buttonFeatureFlag",
  defaultValue: false,
  description: 'Flips the button visibility',
  // origin: 'URL',
  identify() {
    return { user: { id: 'test2' }}
  },
  decide({ entities }) {
    return entities.user.id === 'test';
  }
});

const randomNumberFlag = dedupe(() => {
  return Math.random();
})

export default async function Home() {
  const flag = await buttonFeatureFlag();

  const randomNumber1 = await randomNumberFlag();
  const randomNumber2 = await randomNumberFlag();
  const randomNumber3 = await randomNumberFlag();
  const randomNumber4 = await randomNumberFlag();

  return (
    <div className="p-20">
      {flag && <button className="p-5 bg-blue-500">Click Me!</button>}
      <div>{randomNumber1} {randomNumber2} {randomNumber3} {randomNumber4}</div>
    </div>
  );
}
