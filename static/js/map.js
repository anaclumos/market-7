const addressFinderContainer = document.querySelector("#addressFinderContainer");

const closeDaumPostcode = function() {
  // iframe을 넣은 element를 안보이게 한다.
  addressFinderContainer.style.display = "none";
}

const sample2_execDaumPostcode = function() {
  new daum.Postcode({
    oncomplete(data) {
      // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백(")값을 가지므로, 이를 참고하여 분기 한다.
      let addr = ""; // 주소 변수
      // var extraAddr = "; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") { // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.querySelector("#postcode").value = data.zonecode;
      document.querySelector("#address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.querySelector("#detailAddress").focus();

      // iframe을 넣은 element를 안보이게 한다.
      // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
      addressFinderContainer.style.display = "none";
    },

    width : "100%",
    height : "100%",
    maxSuggestItems : 5
  }).embed(addressFinderContainer);

  // iframe을 넣은 element를 보이게 한다.
  addressFinderContainer.style.display = "block";

  // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
  initLayerPosition();
}

// 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
// resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
// 직접 addressFinderContainer의 top,left값을 수정해 주시면 됩니다.
const initLayerPosition = function() {
  const width = 300; //우편번호서비스가 들어갈 element의 width
  const height = 400; //우편번호서비스가 들어갈 element의 height
  const borderWidth = 5; //샘플에서 사용하는 border의 두께

  // 위에서 선언한 값들을 실제 element에 넣는다.
  addressFinderContainer.style.width = width + "px";
  addressFinderContainer.style.height = height + "px";
  addressFinderContainer.style.border = borderWidth + "px solid";
  // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
  addressFinderContainer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + "px";
  addressFinderContainer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + "px";
}