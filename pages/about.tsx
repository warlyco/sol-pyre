import { BottomBanner } from "features/UI/bottom-banner";

export default function About() {
  return (
    <div className="flex justify-center bg-stone-900 min-h-screen relative text-stone-300">
      <div className="max-w-5xl mx-auto mt-32 text-lg">
        <h1 className="text-3xl text-center mb-4">About</h1>
        <div className="max-w-xl mx-auto p-4 space-y-6 pb-32">
          <p>
            SolPyre is the first platform on Solana dedicated to the creation of
            token burning campaings.
          </p>
          <p>
            The platform was created with project creators and project managers
            in mind. It provides an easy way to give holders custom rewards for
            burning any NFTs of your choice.
          </p>
          <p>
            <div className="mb-2">Example use cases:</div>
            <ul className="space-y-4">
              <li>
                🌱&nbsp;&nbsp;&nbsp;Provide a streamlined way for users to burn
                Gen 1 NFTs in exchange for Gen 2 mint tokens
              </li>
              <li>
                🟡&nbsp;&nbsp;&nbsp;Introduce new tokens by combining multiple
                tokens into a new one (e.g. crafting or cooking)
              </li>
              <li>
                ⚠️&nbsp;&nbsp;&nbsp;Reward users for burning scam tokens aimed
                at your project
              </li>
              <li>
                👶&nbsp;&nbsp;&nbsp;Give new life to an SPL token that has
                fallen out of use
              </li>
              <li>
                😈&nbsp;&nbsp;&nbsp;Incientivize the destruction of rival
                collection NFTs
              </li>
            </ul>
          </p>
          <p>
            The automated campaign creation system is still under construction,
            but a new burn campaing can currently be setup manually by the team.
            Please{" "}
            <a
              className="underline text-blue-400"
              href="https://twitter.com/sol_pyre"
              target="_blank"
              rel="noreferrer"
            >
              reach out on twitter
            </a>{" "}
            if you have any questions or would like to setup a new custom
            campaign!
          </p>
        </div>
      </div>
      <BottomBanner>
        <div className="text-xs">
          🛠️ by{" "}
          <a href="https://twitter.com/warly_sol" className="underline">
            warly.sol
          </a>
        </div>
      </BottomBanner>
    </div>
  );
}
