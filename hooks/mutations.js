import { useMutation } from "@tanstack/react-query";
export {
	useGuessWordMutation, 
	useSkipWordMutation,
	useStartGameMutation,
	useEndGameMutation,
};

function useGuessWordMutation(queryClient, focusTextFn){
	const guessWordMutation = useMutation({
		mutationFn: (word) => {
			return fetch(`http://localhost:3000/guess?word=${word}`, { credentials: 'include' })
				.then(res => {
					return res.json();
				})
		},
		onSuccess: (guessData) => {
			queryClient.setQueryData(
				['gameData', 'time'],
				queryClient.getQueryData(['gameData', 'time']) + (guessData.timeIncrement * 1000));
				queryClient.setQueryData(['gameData', 'accuracy'], guessData.accuracy);
				queryClient.setQueryData(['gameData', 'hint'], guessData.correctLetters);
			if (guessData.correct) {
				queryClient.setQueryData(['gameData', 'word'], guessData.nextWord);
				queryClient.setQueryData(['gameData', 'score'], guessData.score);
				const correctWordEvent = new CustomEvent('correctword');
				document.dispatchEvent(correctWordEvent);
			}
			else {
				queryClient.setQueryData(['gameData', 'correctLetters'], guessData.correctLetters);
				const incorrectWordEvent = new CustomEvent('incorrectword');
				document.dispatchEvent(incorrectWordEvent);
			}
			focusTextFn();
		}
	});

	return guessWordMutation;
}

function useSkipWordMutation(queryClient, focusTextFn){
	const skipWordMutation = useMutation({
		mutationFn: () => {
			return fetch(`http://localhost:3000/skip`, { credentials: 'include' })
				.then(res => {
					return res.json();
				})
		},
		onSuccess: (skipData) => {
			queryClient.setQueryData(['gameData', 'word'], skipData.nextWord);
			queryClient.setQueryData(['gameData', 'hint'], skipData.correctLetters);
			queryClient.setQueryData(
				['gameData', 'time'],
				queryClient.getQueryData(['gameData', 'time']) + (skipData.timeIncrement * 1000));
			focusTextFn();
		}
	})
	return skipWordMutation;
}

function useStartGameMutation(queryClient){
	const startGameMutation = useMutation({
		mutationFn: (difficulty) => {
			return fetch(`http://localhost:3000/start?difficulty=${difficulty}`, {credentials: 'include'})
				.then(res => {
					return res.json();
				})
		},
		onSuccess: (gameData) => {
			queryClient.setQueryData(['gameData', 'word'], gameData.nextWord);
			queryClient.setQueryData(['gameData', 'time'], Date.now() + gameData.totalTime * 1000);
			queryClient.setQueryData(['gameData', 'score'], 0);
			queryClient.setQueryData(['gameData', 'accuracy'], 0);
			queryClient.setQueryData(['gameData', 'hint'], gameData.correctLetters);
		}
	});
	return startGameMutation;
}

function useEndGameMutation(queryClient){
	const endGameMutation = useMutation({
		mutationFn: () => {
			return fetch(`http://localhost:3000/end`, {credentials: 'include'})
				.then(res => {
					return res.json();
				})
		},
		onSuccess: (gameData) => {
			queryClient.setQueryData(['gameData', 'word'], null);
			queryClient.setQueryData(['gameData', 'time'], null);
			queryClient.setQueryData(['gameData', 'score'], gameData.score);
			queryClient.setQueryData(['gameData', 'accuracy'], gameData.accuracy);
			queryClient.setQueryData(['gameData', 'history'], gameData.history);
		}
	});
	return endGameMutation;
}