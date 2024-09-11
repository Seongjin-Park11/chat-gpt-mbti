// 페이지 로드 시 실행되는 함수
function displayResult() {
    const resultElement = document.getElementById("result");
    const restartButton = document.getElementById("restart-button");

    // 로컬 스토리지에서 MBTI 결과 가져오기
    const mbtiResult = localStorage.getItem('mbti_result');

    // 결과가 있으면 결과를 표시하고, 없으면 대체 텍스트 표시
    if (mbtiResult) {
        resultElement.innerText = `${mbtiResult}입니다!`;
    } else {
        resultElement.innerText = "아직 테스트를 진행하지 않았습니다!";
    }

    // 버튼 텍스트를 "테스트 하러 가기"로 변경
    restartButton.innerText = "테스트 하러 가기";
}

// 페이지 로드 시 displayResult 함수 호출
window.onload = displayResult;
