$(function(){
  const setButton = $('#setButton');
  const deleteButton = $('#deleteButton');
  const slotButton = $(".slotButton");
  const spinButton = $('#spinButton');
  const resetButton = $('#resetButton');
  const reelElement01 = $('#reel01');
  const reelElement02 = $('#reel02');
  const reelElement03 = $('#reel03');
  const lever = $('#lever');
  const cardShadow = $('.cardShadow');
  const cardList = $('.cardList');
  const card = $('.card');
  const card01 = $('.card01');
  const card02 = $('.card02');
  const card03 = $('.card03');
  const textLight = $(".textWrapper .text");
  const numHeight = $(".reel .num").innerHeight();
  var answerArray01 = [];
  var answerArray02 = [];
  var answerArray03 = [];
  const answerList01 = $('#answerList01');
  const answerList02 = $('#answerList02');
  const answerList03 = $('#answerList03');


  function addAnswer01() {
    $('#slot01_add').on('click', function() {
      // Input要素から値を取得
      var answerNum01 = $('#numberInput01').val();
      var answerText01 = $('#textInput01').val();
      if(answerNum01 == "" || answerText01 == "") {

      } else {
        // 新しい配列を作成し、dataArrayに追加
        answerArray01.push([answerNum01, answerText01]);
        // Input要素の値をリセット
        $('#numberInput01').val('');
        $('#textInput01').val('');
        console.log(answerArray01); // 現在のdataArrayの内容をコンソールに出力
        answerList01.append('<li><span class="num">' + answerNum01 + '</span><span class="text">' + answerText01 + '</span><span class="delete js-delete">×</span></li>');
        deleteButton.removeClass('disabled');
      }
      deleteAnswer(answerArray01);
    });
  }

  function addAnswer02() {
    $('#slot02_add').on('click', function() {
      // Input要素から値を取得
      var answerNum02 = $('#numberInput02').val();
      var answerText02 = $('#textInput02').val();
      if(answerNum02 == "" || answerText02 == "") {

      } else {
        // 新しい配列を作成し、dataArrayに追加
        answerArray02.push([answerNum02, answerText02]);
        // Input要素の値をリセット
        $('#numberInput02').val('');
        $('#textInput02').val('');
        console.log(answerArray02); // 現在のdataArrayの内容をコンソールに出力
        answerList02.append('<li><span class="num">' + answerNum02 + '</span><span class="text">' + answerText02 + '</span><span class="delete js-delete">×</span></li>');
        deleteButton.removeClass('disabled');
      }
      deleteAnswer(answerArray02);
    });
  }

  function addAnswer03() {
    $('#slot03_add').on('click', function() {
      // Input要素から値を取得
      var answerNum03 = $('#numberInput03').val();
      var answerText03 = $('#textInput03').val();
      if(answerNum03 == "" || answerText03 == "") {

      } else {
        // 新しい配列を作成し、dataArrayに追加
        answerArray03.push([answerNum03, answerText03]);
        // Input要素の値をリセット
        $('#numberInput03').val('');
        $('#textInput03').val('');
        console.log(answerArray03); // 現在のdataArrayの内容をコンソールに出力
        answerList03.append('<li><span class="num">' + answerNum03 + '</span><span class="text">' + answerText03 + '</span><span class="delete js-delete">×</span></li>');
        deleteButton.removeClass('disabled');
      }
      deleteAnswer(answerArray03);
    });
  }


  function deleteAnswer(array) {
    const deleteIcon = $(".js-delete");
    deleteIcon.on('click', function() {
      var textToRemove0 = $(this).siblings().first().text();
      var textToRemove1 = $(this).siblings().eq(1).text();
      console.log(textToRemove0);
      console.log(textToRemove1);
      var filteredArray = array.filter(function(element) {
        return !(element[0] === textToRemove0 && element[1] === textToRemove1);
      });
      array.length = 0; // 元の配列を空にする
      Array.prototype.push.apply(array, filteredArray); // フィルタリングされた要素を追加
      console.log(array);
      var deleteElement = $(this).parent();
      deleteElement.remove();
    });
  }

  function setButtonFunc() {
    setButton.on('click', function() {
      function setFunc() {
        if(answerArray01.length !== 0 && answerArray02.length !== 0 && answerArray03.length !== 0) {
          $(".reel").removeClass("active");
          textLight.removeClass("active");
          reelRandom(answerArray01,answerList01,reelElement01,card01);
          reelRandom(answerArray02,answerList02,reelElement02,card02);
          reelRandom(answerArray03,answerList03,reelElement03,card03);
          slotButton.removeClass("disabled");
        } else {
          slotButton.addClass("disabled");
        }
      }
      if(cardList.hasClass('is-step03')) {
        $(".reel").removeClass("active");
        textLight.removeClass("active");
        cardList.addClass("is-reset");
        setTimeout(function() {
          card.removeClass("is-active");
        }, 1500);
        setTimeout(function() {
          cardList.removeClass("is-step03");
          cardList.addClass("is-step01");
          setFunc()
        }, 4000);
        setTimeout(function() {
          cardList.removeClass("is-reset");
        }, 7000);
      } else {
        setFunc();
      }
    });
  }

  function reelRandom(array,list,reel,card) {
    const reelInner = reel.find(".reelInner");
    const cardText = card.find(".cardText");
    const cardNum = card.find(".cardNum");
    // ランダムに配列を選択
    var randomIndex = Math.floor(Math.random() * array.length);
    var selectedArray = array[randomIndex];
    // 値を別々の変数に格納
    var num = selectedArray[0];
    var text = selectedArray[1];
    array.splice(randomIndex, 1);
    list.children("li").eq(randomIndex).remove();
    // updateList(array,list);
    console.log(array);
    reelInner.children().not(":last-child").remove();
    // 1から50までの数字を含む配列を作成
    var numbers = [];
    for (var i = 1; i <= 39; i++) {
      numbers.push(i);
    }
    // 配列をシャッフル（Fisher-Yates shuffle）
    for (var i = numbers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = temp;
    }
    // シャッフルされた数字を<p>タグで出力
    $.each(numbers, function(index, number) {
      reelInner.prepend("<p class='num' data-value="+ number +"><span>"+ number +"</span></p>");
    });
    reelInner.prepend("<p class='num' data-value="+ num +"><span>"+ num +"</span></p>");
    reelInner.css("transform","translateY("+ -(numHeight *  40) +"px)");
    cardNum.html(num);
    cardText.html(text);
  }

  function spinButtonFunc() {
    spinButton.on('click', function() {
      $(".reel").addClass("active");
      $(this).addClass("active");
      lever.addClass("active");
      textLight.addClass("active");
      setTimeout(function() {
        spinButton.removeClass("active");
        spinButton.addClass("disabled");
      }, 5000);
      setTimeout(function() {
        lever.removeClass("active");
      }, 3000);
      setTimeout(function() {
        cardList.removeClass('is-step01');
        cardList.addClass('is-step02');
      }, 5000);
      setTimeout(function() {
        cardShadow.addClass('is-active');
        cardList.removeClass('is-step02');
        cardList.addClass('is-step03');
      }, 7000);
      setTimeout(function() {
        cardShadow.removeClass('is-active');
        if(answerArray01.length == 0 || answerArray02.length == 0 || answerArray03.length == 0) {
          slotButton.addClass("disabled");
        }
      }, 8000);
    });
    card.on('click', function() {
      $(this).addClass('is-active');
    });
  }

  function resetButtonFunc() {
    resetButton.on('click', function() {
      $(".reel").removeClass("active");
      textLight.removeClass("active");
      slotButton.removeClass("disabled");
      $(this).addClass("active");
      cardList.addClass("is-reset");
      setTimeout(function() {
        resetButton.removeClass("active");
      }, 500);
      setTimeout(function() {
        reelRandom(answerArray01,answerList01,reelElement01,card01);
        reelRandom(answerArray02,answerList02,reelElement02,card02);
        reelRandom(answerArray03,answerList03,reelElement03,card03);
        card.removeClass("is-active");
      }, 1500);
      setTimeout(function() {
        cardList.removeClass("is-step03");
        cardList.addClass("is-step01");
      }, 4000);
      setTimeout(function() {
        cardList.removeClass("is-reset");
      }, 7000);
    });
  }

  function deleteButtonFunc() {

    deleteButton.on('click', function() {
      if(deleteButton.hasClass('disabled')) {

      } else {
      $(".reel").removeClass("active");
        textLight.removeClass("active");
        setTimeout(function() {
          card.removeClass("is-active");
          answerArray01.length = 0;
          answerArray02.length = 0;
          answerArray03.length = 0;
          $('.answerList').empty();
          $('.reelInner').children().not(":last-child").remove();
          $('.reelInner').css("transform","translateY(0px)");
          slotButton.addClass("disabled");
          resetButton.addClass("disabled");
          deleteButton.addClass('disabled');
        }, 1500);
        if(cardList.hasClass("is-step03")){
          cardList.addClass("is-reset");
          setTimeout(function() {
            cardList.removeClass("is-step03");
            cardList.addClass("is-step01");
            setFunc()
          }, 4000);
          setTimeout(function() {
            cardList.removeClass("is-reset");
          }, 7000);
        }
      }
    });
  }

  addAnswer01();
  addAnswer02();
  addAnswer03();
  setButtonFunc();
  spinButtonFunc();
  resetButtonFunc();
  deleteButtonFunc();
});
