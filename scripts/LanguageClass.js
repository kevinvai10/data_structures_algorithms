 class SofiaLang {
     
    static Load() {
        $("#lenguajemenu").html("<li><span class='fa fa-spinner fa-spin'></span> Cargando...</li>");

        $.get("/UserConfig/Languagemethod", function (array) {
            const Lenguajes = array;
            $("#lenguajemenu").html("");
            $.each(Lenguajes, function() {
                $("#lenguajemenu").append('<li><a href="#!" onclick="SofiaLang.Set(\'' + this.Code + '\');" lang="es-mx" data-lang="' + this.Code + '">' + ((this.Selected) ? '<span class="fa fa-check"></span> ' : '') + this.Text + '</a></li>');
                if (this.Selected) {
                    SofiaStorage.set("Lang", this.Code, true);
                    localStorage.removeItem('Language');
                    localStorage.setItem("Language", this.Code);
                    if(lang)
                    lang.change(this.Code);
                }                               
            });  
        });
    }

    static Set(code) {
        $.get("/UserConfig/SwitchLanguageConfig", { code: code }, function (obj) {
            if (obj.Lang) {
                //ok
                $("#lenguajemenu > li a span").remove();
                $("#lenguajemenu > li a[data-lang='" + code + "']").html('<span class="fa fa-check"></span> ' + obj.Name);

                lang.change(code);
                SofiaStorage.set("Lang", code, true);               
                localStorage.removeItem('Language');
                localStorage.setItem('Language', code);
                flag2 = true; //flag para actualizar kevinLeng

                if (flag) {
                    setLenguaje(code);
                    flag = false;
                }

                if (flag2)
                    setLenguaje(code);
            }
        });
    }

    static Translate(str, lang) {
        $.ajax({
            url: "https://api.microsofttranslator.com/V2/Http.svc/Translate",
            type: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': '079ac3d8055644b591e7933418ddaf53'
            },
            data: { text: str, from: 'es', to: lang },
            success: function (d) {
                alert(d);
            },
            fail: function (e) {
                alert(e);
            }
        });
    }
}

$(document).ready(function () {
   SofiaLang.Load();
});