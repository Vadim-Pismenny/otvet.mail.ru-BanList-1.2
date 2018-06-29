setInterval(function() {
    $(".q--li--stats").each(function() {
        if (!$(this).hasClass('imgAdded')) {
            $(this).append("<i class='icon icon-buble_D ex-btn banByUser'></i><i class='icon icon-my_15 ex-btn banByName'></i>");
            $(this).addClass('imgAdded');
        }
    })
    if (!$(".tabs--h").hasClass('ResetAdded')) {
        $(".tabs--h").append("<button class='ex-btn' id='resetLocalStorage' type='button' name='button' >Сбросить списки</button>");
        $('.tabs--h').addClass('ResetAdded');
    }
    $("#resetLocalStorage").click(function() {
        localStorage.removeItem('names');
        localStorage.removeItem('userids');
    })

    //Создание списков -- Набор в списки вопросов
    var baningList = [];
    $(".q--li a[data-user]").each(function(item) {
        var dataId = $(this).attr("data-user");
        baningList.push(dataId);
    })
    var banNames = [];
    $(".q--li a[title]").each(function(item) {
        var titleName = $(this).attr("title");
        banNames.push(titleName);
    })

    //Создание списков когда зашёл на страницу ответа
    var answerById = [];
    $(".answer a[data-user]").each(function(item){
      var autorId = $(this).attr("data-user");
      answerById.push(autorId);
    })

    var answerByName = [];
    $(".author b").each(function(item){
      var autorName = $(this).text();
      answerByName.push(autorName);
    })


    // Уже имеющиеся в Локал Сторидж
    var listOfNames = [];
    if ("names" in localStorage) {
        var nameshideme = localStorage.getItem("names");
        var namesstringList = nameshideme.slice(1, -1);
        listOfNames = namesstringList.split(',');
    }
    var listOfIds = [];
    if ("userids" in localStorage) {
        var idshideme = localStorage.getItem("userids");
        var idstringList = idshideme.slice(1, -1);
        listOfIds = idstringList.split(',');
    }

    //Скрывать при нажатии
    $(".banByName").click(function() {
        var names = new Array;
        if ("names" in localStorage) {
            names = JSON.parse(localStorage.getItem("names"));
        }
        var getTitleUser = $(this).parent().prev().prev().attr("title");
        localStorage.setItem("names", JSON.stringify(names + getTitleUser + ','));
        $(this).parent().parent().remove('50');
    });
    $(".banByUser").click(function() {
        var userids = new Array;
        if ("userids" in localStorage) {
            userids = JSON.parse(localStorage.getItem("userids"));
        }
        var getDataUser = $(this).parent().prev().prev().attr("data-user");
        localStorage.setItem("userids", JSON.stringify(userids + getDataUser + ','));
        $(this).parent().parent().remove('50');
    });

    //Регулярно проверять и удалять вопросы
    function hidealltedy() {
        for (let i = 0; i < baningList.length; i++) {
            for (let x = 0; x < listOfIds.length; x++) {
                if (baningList[i] == listOfIds[x]) {
                    $("a[data-user='" + baningList[i] + "']").parent().fadeOut("fast");
                }else {}
            }
        }

        for (let i = 0; i < banNames.length; i++) {
            for (let x = 0; x < listOfNames.length; x++) {
                if (banNames[i] == listOfNames[x]) {
                    $("a[title='" + banNames[i] + "']").parent().fadeOut("fast");
                } else {}
            }
        }

        for (let i = 0; i < answerById.length; i++) {
          for (let x = 0; x < listOfIds.length; x++) {
            if (answerById[i] == listOfIds[x]) {
              $(".answer a[data-user='" + answerById[i] + "']").parent().find("span:contains(Не нравится)").trigger('click').parent().parent().parent().parent().fadeOut("fast");
              $(".answer a[data-user='" + answerById[i] + "']").parent().fadeOut("fast");
            }else {

            }
          }
        }

        for (let i = 0; i < answerByName.length; i++) {
          for (let x = 0; x < listOfNames.length; x++) {
            if (answerByName[i] == listOfNames[x]) {
              $( ".author:contains(" + answerByName[i] + ")" ).parent().parent().find("span:contains(Не нравится)").trigger('click').parent().parent().parent().parent().fadeOut("fast");
              $( ".author b:contains(" + answerByName[i] + ")" ).parent().parent().parent().fadeOut("fast");
            } else {}
          }
        }

    };

    hidealltedy();

}, 1000);
