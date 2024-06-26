// 모달창 열기
// const openModal = (target, btn, type) => {
//     btn && btn.classList.add('modal-open');
//     target.classList.add('show');
//     tabEvent(target);
//     closeModal(target, type);
// };
// UUID생성
const generateUniqueId = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// form 제어
const checkLabel = () => {
    const formElements = document.querySelectorAll('.form-element__wrap');
    
    formElements.forEach(el => {
        const uniqueId = generateUniqueId();
        
        // Label 설정
        const label = el.querySelector('label');
        if (label) {
            label.setAttribute('for', uniqueId);
        }
        
        // Input 설정
        const inputItems = el.querySelectorAll('input');
        if (inputItems.length > 0) {
            const firstInput = inputItems[0];
            firstInput.setAttribute('id', uniqueId);
            const setTitle = label.textContent;
            inputItems.forEach((input, index) => {
                input.setAttribute('title', setTitle + ' ' + (index + 1) + '번째 자리');
            })
        }

        //select box
        const selectItems = el.querySelectorAll('select');
        if (selectItems.length > 0) {
            const firstSelectItems = selectItems[0];
            firstSelectItems.setAttribute('id', uniqueId);
            const setTitle = label.textContent;
            selectItems.forEach((select, index) => {
                select.setAttribute('title', setTitle + ' ' + (index + 1) + '선택하세요');
            })
        }
    });
}
checkLabel()

// dot pin
const checkDotPin = (pw) => {
    const pwStr = pw.toString(); // 비밀번호를 문자열로 변환
    const dotPinsFrame = document.querySelectorAll('.pin-dot');  
    let passWord = []; // 입력된 키 값을 저장할 배열

    dotPinsFrame.forEach(frame => {
        const dotPins = frame.querySelectorAll('.dot');
        let currentIndex = 0; // 현재 입력된 키의 인덱스

        document.addEventListener('keydown', (event) => {
            let keyValue = event.key;

            if (currentIndex < dotPins.length) {
                dotPins[currentIndex].classList.add('is-active');
                passWord.push(keyValue); // 현재 키를 비밀번호 배열에 추가
                currentIndex++;

                // 4번째 키 입력이 끝나면 자동으로 검증
                if (currentIndex === 4) {
                    let inputPassword = passWord.join(''); // 입력된 비밀번호 문자열 생성
                    let compare = pwStr === inputPassword;

                    if (compare) {
                        console.log('비밀번호 일치');
                    } else {
                        console.log('비밀번호 불일치');
                    }
                }
            }

            if (passWord.length > 4) {
                console.log('You have entered 4 keys already.');
                return;
            }
        });
    });
}

//dropdown menu  
const dropdownMenus = document.querySelectorAll('.dropdown-menu__wrap');

function handleDropdownMenu(menu) {
    const selectedOptionButton = menu.querySelector('.btn-dropdown');
    const optionList = menu.querySelectorAll('.dropdown_list li button');

    function toggleMenu() {        
        dropdownMenus.forEach(m => {
            if (m !== menu) {
                m.classList.remove('is-active');
                m.querySelector('.btn-dropdown').classList.remove('is-active');
                m.querySelector('.dropdown_list').classList.remove('is-active');
            }
        });                        
        menu.classList.toggle('is-active');
        selectedOptionButton.classList.toggle('is-active');
        selectedOptionButton.nextElementSibling.classList.toggle('is-active');
    }

    selectedOptionButton.addEventListener('click', toggleMenu);
    optionList.forEach(option => {
        option.addEventListener('click', () => {
            const selectedValue = option.getAttribute('data-option');
            selectedOptionButton.textContent = selectedValue;

            menu.querySelectorAll('.dropdown_list li').forEach(item => {
                item.classList.remove('is-active');
            });

            option.parentElement.classList.add('is-active');
            toggleMenu();
        });
    });
    document.addEventListener("click", function(e) {
        if (menu.classList.contains('is-active') && !e.target.closest('.dropdown-menu__wrap')) {
            menu.classList.remove('is-active');
            selectedOptionButton.classList.remove('is-active');
            selectedOptionButton.nextElementSibling.classList.remove('is-active');
        }
    });
}

dropdownMenus.forEach(handleDropdownMenu);  

//스크롤 이벤트
const ScrollEnterMain = () => {
    const scrollElements = document.querySelectorAll(".animation-enter");

    if (!scrollElements) return;

    const elementInView = (el, dividend = 1) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    const elementOutofView = (el) => el.getBoundingClientRect().top > (window.innerHeight || document.documentElement.clientHeight);
    const displayScrollElement = (element) => element.classList.add("fade-in");
    const hideScrollElement = (element) => {
        element.classList.remove("fade-in", "left-enter-effect", "right-enter-effect", "shadow-effect", "scroll-up");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
                el.classList.toggle('left-enter-effect', el.hasAttribute('left-enter'));
                el.classList.toggle('right-enter-effect', el.hasAttribute('right-enter'));
                el.classList.toggle('shadow-effect', el.hasAttribute('shadow-effect'));
                el.classList.toggle('scroll-up', el.hasAttribute('scrollUp'));
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
};

ScrollEnterMain();

// 위 아래 구분을 위한 스크립트
let lastScrollTop = 0;
const scrollEventManage = () => {
const Yoffset = window.pageYOffset || document.documentElement.scrollTop;

if (Yoffset > lastScrollTop) {
    // downscroll code
    console.log("scroll Down")
} else {
    console.log("scroll Up")
}
lastScrollTop = Yoffset <= 0 ? 0 : Yoffset;
}
window.addEventListener("scroll", scrollEventManage);
// 위 아래 구분을 위한 스크립트====================