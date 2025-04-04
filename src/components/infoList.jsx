const statNames = {
  spatk: "Sp. Atk",
  spdef: "Sp. Def",
  hp: "HP",
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// InfoList design inspired by Pokemondb.net
export default function InfoList({ info, gen }) {
  const get = (name) => {
    return Array.isArray(info[name]) ? info[name][gen] : info[name];
  };

  return (
    <div className="flex flex-col items-start p-4 text-2xl text-shadow-mini">
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Gender</p>
        <p className="flex gap-2 pl-2 border-l-2 border-gray">
          {get("gender").split(":")[1] > 0 && (
            <span className="text-genderMale">
              {get("gender").split(":")[1] * 12.5 + "% ♂"}
            </span>
          )}
          {get("gender").split(":")[1] > 0 &&
            get("gender").split(":")[0] > 0 &&
            "-"}
          {get("gender").split(":")[1] < 1 &&
            get("gender").split(":")[0] < 1 &&
            "Genderless"}
          {get("gender").split(":")[0] > 0 && (
            <span className="text-genderFemale">
              {get("gender").split(":")[0] > 0 &&
                get("gender").split(":")[0] * 12.5 + "% ♂"}
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Catch Rate</p>
        <p className="pl-2 border-l-2 border-gray">{get("catch-rate")}</p>
        {/* TODO: Add catch rate calculations */}
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Base Exp.</p>
        <p className="pl-2 border-l-2 border-gray">{get("base-exp")}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right tracking-tight">EV Yield</p>
        <p className="pl-2 border-l-2 border-gray text-left">
          {Object.keys(get("ev-yield")).map(
            (e, i) =>
              `${info["ev-yield"][e]} ${statNames[e] || capitalize(e)}${i !== Object.keys(info["ev-yield"]).length - 1 ? ", " : ""}`,
          )}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Egg Cycles</p>
        <p className="pl-2 border-l-2 border-gray">{get("egg-cycles")}</p>
        {/* TODO: Add egg cycle calculations */}
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Base Friendship</p>
        <p className="pl-2 border-l-2 border-gray">{get("friendship")}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-32 text-right">Growth Rate</p>
        <p className="pl-2 border-l-2 border-gray">
          {capitalize(get("growth-rate"))}
        </p>
      </div>
    </div>
  );
}
