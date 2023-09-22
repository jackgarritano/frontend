import { useQuery } from "@tanstack/react-query";
export {
	useAccuracyQuery,
	useScoreQuery,
	useWordQuery,
	useHintQuery,
	useHistoryQuery,
	useTimeQuery,
};

function useAccuracyQuery(queryClient) {
	const { data: accuracy,
		isError: isAccuracyError,
		isLoading: isAccuracyLoading
	} = useQuery(['gameData', 'accuracy'], () => {
		return queryClient.getQueryData(['gameData', 'accuracy']) || 0;
	});
	return { accuracy, isAccuracyError, isAccuracyLoading };
}

function useScoreQuery(queryClient) {
	const { data: score,
		isError: isScoreError,
		isLoading: isScoreLoading
	} = useQuery(['gameData', 'score'], () => {
		return queryClient.getQueryData(['gameData', 'score']) || 0;
	});
	return { score, isScoreError, isScoreLoading };
}

function useWordQuery(queryClient) {
	const { data: currentWord,
		isError: isCurrentWordError,
		isLoading: isCurrentWordLoading
	} = useQuery(['gameData', 'word'], () => {
		return queryClient.getQueryData(['gameData', 'word']) || '';
	});
	return { currentWord, isCurrentWordError, isCurrentWordLoading };
}

function useHintQuery(queryClient) {
	const { data: hint,
		isError: isHintError,
		isLoading: isHintLoading
	} = useQuery(['gameData', 'hint'], () => {
		return queryClient.getQueryData(['gameData', 'hint']) || '';
	});
	return { hint, isHintError, isHintLoading };
}

function useHistoryQuery(queryClient) {
	const { data: history,
		isError: isHistoryError,
		isLoading: isHistoryLoading
	} = useQuery(['gameData', 'history'], () => {
		return queryClient.getQueryData(['gameData', 'history']) || [];
	});
	return { history, isHistoryError, isHistoryLoading };
}

function useTimeQuery(queryClient) {
	const { data: time,
		isError: isTimeError,
		isLoading: isTimeLoading } = useQuery(['gameData', 'time'], () => {
			return queryClient.getQueryData(['gameData', 'time']) || 0;
		});
	return { time, isTimeError, isTimeLoading };
}