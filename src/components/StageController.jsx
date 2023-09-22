import StartCard from "./StartCard";
import Loading from "./Loading";
import GameCard from "./GameCard";
import EndCard from "./EndCard";

import { useQueryClient } from "@tanstack/react-query";
import { useEndGameMutation, useStartGameMutation } from "../../hooks/mutations";

/*
Controls which 'screen' should be shown: start, game, or
end. (full routing seemed unnecessary)
*/
export default function StageController() {
	const queryClient = useQueryClient();
	const startGameMutation = useStartGameMutation(queryClient);
	const endGameMutation = useEndGameMutation(queryClient);

	function startGame(difficulty) {
		startGameMutation.mutate(difficulty);
	}

	function endGame(){
		startGameMutation.reset();
		endGameMutation.mutate();
	}

	function resetToStart(){
		endGameMutation.reset();
	}

	return (
		<>
			{startGameMutation.isIdle && endGameMutation.isIdle && <StartCard startGame={startGame}></StartCard>}
			{startGameMutation.isLoading && <Loading label={"Fetching Words..."}></Loading>}
			{startGameMutation.isSuccess && <GameCard endGame={endGame}></GameCard>}
			{endGameMutation.isLoading && <Loading label={"Wrapping Up..."}></Loading>}
			{endGameMutation.isSuccess && <EndCard reset={resetToStart}></EndCard>}
		</>
	)
}