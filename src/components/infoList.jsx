const statNames = {
  spatk: "Sp. Atk",
  spdef: "Sp. Def",
  hp: "HP",
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// InfoList design inspired by Pokemondb.net
export default function InfoList({ info }) {
  return (
    <div className="flex flex-col items-start p-4 text-2xl text-shadow-mini">
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Gender</p>
        <p className="text-genderMale">
          {info.gender.split(":")[0] > 0 &&
            info.gender.split(":")[0] * 12.5 + "% ♂"}
        </p>
        {info.gender.split(":")[0] > 0 && <p>-</p>}
        <p className="text-genderFemale">
          {info.gender.split(":")[1] > 0 &&
            info.gender.split(":")[1] * 12.5 + "% ♀"}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Catch Rate</p>
        <p>{info["catch-rate"]}</p>
        {/* TODO: Add catch rate calculations */}
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Base Exp.</p>
        <p>{info["base-exp"]}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right tracking-tight">EV Yield</p>
        <p className="text-left">
          {Object.keys(info["ev-yield"]).map(
            (e, i) =>
              `${info["ev-yield"][e]} ${statNames[e] || capitalize(e)}${i !== Object.keys(info["ev-yield"]).length - 1 ? ", " : ""}`,
          )}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Egg Cycles</p>
        <p>{info["egg-cycles"]}</p>
        {/* TODO: Add egg cycle calculations */}
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Base Friendship</p>
        <p>{info.friendship}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Growth Rate</p>
        <p>{info["growth-rate"]}</p>
      </div>
    </div>
  );
}
