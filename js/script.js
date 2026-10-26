// =========================================
// 다시, 나 - 황의정 포트폴리오 기능 파일
// =========================================

// 브라우저 개발자도구 콘솔 연결 확인
console.log('다시, 나: script.js 연결 완료');

// =========================================
// 문의 폼 입력값 유효성 검사 및 전송 처리
// =========================================
const contactForm = document.querySelector('#contact-form');
const formMsg = document.querySelector('#form-msg');

if (contactForm && formMsg) {
  let timerId = null;

  // 결과 문구 출력 함수 (3초 후 자동 소멸 기능 포함)
  function showMessage(text, type) {
    formMsg.textContent = text;
    formMsg.className = type;

    // 이전 타이머 초기화 후 3초 뒤 메시지 지우기
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      formMsg.textContent = '';
      formMsg.className = '';
    }, 3500);
  }

  // 전송 버튼 클릭 시 입력값 검사
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 새로고침 방지

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    // 이메일 정규식 규칙
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '') {
      showMessage('이름을 입력해 주세요. 🌸', 'error');
      return;
    }
    if (!emailRule.test(email)) {
      showMessage('올바른 이메일 주소를 입력해 주세요. ✉️', 'error');
      return;
    }
    if (message.length < 10) {
      showMessage('문의 내용을 10자 이상 입력해 주세요. 💬', 'error');
      return;
    }

    // [선택 사항] 실제 본인 이메일로 메일 작성창 열기 (받는 메일 주소 변경 필요)
    const myEmail = 'joeng97@naver.com'; // <- 실제 본인 이메일로 변경
    const subject = encodeURIComponent(`[포트폴리오 문의] ${name}님의 메시지입니다.`);
    const body = encodeURIComponent(`이름: ${name}\n회신 이메일: ${email}\n\n문의 내용:\n${message}`);

    // 메일 클라이언트 실행
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    // 안내 문구 출력 및 폼 초기화
    showMessage('메일 전송 창으로 연결되었습니다. 감사합니다! 💖', 'success');
    contactForm.reset();
  });
}