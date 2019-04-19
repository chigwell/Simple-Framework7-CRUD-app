// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
    id: 'ru.crud.kitchensink',
    name: 'CRUD',
    root: '#app',
    theme: theme,
    data: function() {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
    methods: {
        helloWorld: function() {
            app.dialog.alert('Hello World!');
        },
    },
    routes: routes,
    init: function() {}, //init:function() 
    pageInit: function() {}, //pageInit:function() 
});



function loadList(callback) {
    var main = store.get('items')
    if (main === undefined || main === null || main === '') {
        store.set('items', [])
    } //if (main=== undefined || main === null || main === '')     
    try {
        var main = store.get('items')
        var res = ''
        for (var x = 0; x < main.length; x++) {
            res += '        <li class="swipeout" f-id="' + main[x].id + '"><div class="swipeout-content">'
            res += '          <a class="item-content item-link" href="/edit/' + main[x].id + '/">'
            res += '            <div class="item-media"><img src="' + (main[x].image) + '" class="lazy" style="    border-radius: 50%;width:44px;height:44px;" /></div>'
            res += '            <div class="item-inner">'
            res += '              <div class="item-title">' + main[x].name + '</div>'
            res += '            </div>'
            res += '          </a> </div>'
            res += '          <div class="swipeout-actions-right">'
            res += '            <a href="/edit/' + main[x].id + '/" class="color-blue alert-mark">Edit</a>'
            res += '            <a href="#" class="swipeout-delete">Delete</a>'
            res += '          </div>      '
            res += '        </li>  '
        } //for(var x = 0; x < main.length; x++) 
        if (main.length > 0) {
            $('.ul-list').html('')
            $('.ul-list').html(res)
            $('.swipeout').on('swipeout:deleted', function() {
                var id = parseInt(this.getAttribute('f-id'))
                var main0 = []
                var main1 = store.get('items')
                for (var y = 0; y < main1.length; y++)
                    if (parseInt(main1[y].id) != id)
                        main0.push({
                            id: main1[y].id,
                            name: main1[y].name,
                            desc: main1[y].desc,
                            image: main1[y].image
                        })
                store.set('items', main0)
                app.dialog.alert('Thanks, item #' + (parseInt(this.getAttribute('f-id')) + 1) + ' removed!');
                if (main0.length == 0) {
                    $('.ul-list').html('<li>' +
                        '     <a class="item-content item-link" href="/add/">' +
                        '       <div class="item-inner">' +
                        '         <div class="item-title">There are no items:( <span style="color:var(--f7-theme-color);text-decoration: underline;">Create one</span></div>' +
                        '       </div>' +
                        '     </a>' +
                        '   </li>')

                } //if(main0.length == 0)
            }) //$('.swipeout').on('swipeout:deleted', function ()    
        } //if(main.length > 0) 

    } catch (e) {
        console.log(e)
    }
    callback()
} //function loadList(callback) 
function main1() {
    // Pull-to-refresh
    var ptr = app.ptr.create('.ptr-content')
    ptr.on('refresh', (e) => {
        loadList(function() {
            app.ptr.get('.ptr-content').done()
        }) // loadList(function() //    ptr.done()//

    }) //ptr.on('ptr:refresh', (e) =>
    loadList(function() {

    }) // loadList(function() 
}
main1()

$(document).on('page:afterin', '.page[data-page="main"]', function(e) {
    main1()
}) //$(document).on('page:afterin', '.page[data-page="main"]', function(e) 

$(document).on('page:init', '.page[data-page="add"]', function(e) {
    $('.create').on('click', function() {
        var errors = ''
        var name = $('#name').val()
        var desc = $('#desc').val()
        var image = $('#image').val()

        if (name == '') {
            errors += 'Name field is empty! '
        } //if(name == '') 

        if (desc == '') {
            errors += 'Desc field is empty! '
        } //if(name == '') 

        if (errors != '')
            app.dialog.alert(errors, 'Error')
        else {
            var main1 = store.get('items')
            var l = main1.length
            if (image == '') {
                image = 'img/f7-icon.png'
            }
            main1.push({
                id: l,
                name: name,
                desc: desc,
                image: (image)
            })
            store.set('items', main1)
            $('.icon-back').click()
        }
    }) //$('.create').on('click',function()  

    $('body').find('#file').change(function() {
        app.preloader.show()

        function getFileContentAsBase64(path, callback) {
            try {
                function getBase64(file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        var rcs = reader.result
                        if (rcs > 7453827) {
                            app.preloader.hide()
                            app.alert('Image is too big (> than 8 MB)!', 'Error')
                            store.set('curr_dec_situation_for_images', 0)

                        } else {
                            $('body').find('#image').val(rcs)
                            app.preloader.hide()
                            store.set('curr_dec_situation_for_images', 0)

                        }
                    };
                    reader.onerror = function(error) {
                        app.alert(error, 'System error')
                        app.preloader.hide()
                        store.set('curr_dec_situation_for_images', 0)
                    };
                }

                var file = document.getElementById('file').files[0]
                getBase64(file); // prints the base64 string 
            } catch (e) {
                app.preloader.hide()
                store.set('curr_dec_situation_for_images', 0)
                var toastBottom = app.toast.create({
                    text: '#3.328 ' + e,
                    closeTimeout: 20000,
                })
                toastBottom.open()
                setTimeout(function() {
                    toastBottom.close();
                }, 1500)
            }
        } //function getFileContentAsBase64(path,callback){
        getFileContentAsBase64()

    }) //$('body').find('#file').change(function()             
}) //$(document).on('page:init', '.page[data-page="create"]', function(e) 



$(document).on('page:init', '.page[data-page="edit"]', function(e) {
    var id = e.detail.router.url.replace(/\/edit\//, '').replace(/\//, '')
    store.set('id', id)
    $('.title-edit').html('Edit #' + (id + 1))

    var main1 = store.get('items')
    for (var y = 0; y < main1.length; y++)
        if (parseInt(main1[y].id) == id) {
            $('#name').val(main1[y].name)
            $('#desc').val(main1[y].desc)
            $('#image').val((main1[y].image))
            $('.image-preview').html('<img src="' + (main1[y].image) + '" class="lazy" style="    border-radius: 50%;width:44px;height:44px;" />')
        } //if(parseInt(main1[y].id) == id)

    $('.image-preview').on('click', function() {
        if ($(this).html() != '') {
            app.dialog.confirm('Are you sure that u want to delete image?', 'Confirmation', function() {
                $('#image').val('img/f7-icon.png')
                $('.image-preview').html('<img src="img/f7-icon.png" class="lazy" style="    border-radius: 50%;width:44px;height:44px;" />')
            }, function() {

            }) //app.dialog.confirm('Are you sure that u want to delete image?','Confirmation',function() 
        } //if($(this).html() != '') 
    }) //$('.image-preview').on('click',function() 


    $('.edit').on('click', function() {
        var errors = ''
        var name = $('#name').val()
        var desc = $('#desc').val()
        var image = $('#image').val()

        if (name == '') {
            errors += 'Name field is empty! '
        } //if(name == '') 

        if (desc == '') {
            errors += 'Desc field is empty! '
        } //if(name == '') 

        if (errors != '')
            app.dialog.alert(errors, 'Error')
        else {
            var main1 = store.get('items')
            var l = main1.length
            if (image == '') {
                image = 'img/f7-icon.png'
            }
            var main0 = []
            var main1 = store.get('items')
            for (var y = 0; y < main1.length; y++)
                if (parseInt(main1[y].id) != store.get('id'))
                    main0.push({
                        id: main1[y].id,
                        name: main1[y].name,
                        desc: main1[y].desc,
                        image: main1[y].image
                    }) //main0.push({
            else
                main0.push({
                    id: main1[y].id,
                    name: name,
                    desc: desc,
                    image: (image)
                }) //main0.push({
            store.set('items', main0)
            $('.icon-back').click()
        }
    }) //$('.edit').on('click',function()   


    $('body').find('#file').change(function() {
        app.preloader.show()

        function getFileContentAsBase64(path, callback) {
            try {
                function getBase64(file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        var rcs = reader.result
                        if (rcs > 7453827) {
                            app.preloader.hide()
                            app.alert('Image is too big (> than 8 MB)!', 'Error')
                            store.set('curr_dec_situation_for_images', 0)

                        } else {
                            $('body').find('#image').val(rcs)
                            $('.image-preview').html('<img src="' + rcs + '" class="lazy" style="    border-radius: 50%;width:44px;height:44px;" />')
                            app.preloader.hide()
                            store.set('curr_dec_situation_for_images', 0)

                        }
                    };
                    reader.onerror = function(error) {
                        app.alert(error, 'System error')
                        app.preloader.hide()
                        store.set('curr_dec_situation_for_images', 0)
                    };
                }

                var file = document.getElementById('file').files[0]
                getBase64(file); // prints the base64 string 
            } catch (e) {
                app.preloader.hide()
                store.set('curr_dec_situation_for_images', 0)
                var toastBottom = app.toast.create({
                    text: '#3.328 ' + e,
                    closeTimeout: 20000,
                })
                toastBottom.open()
                setTimeout(function() {
                    toastBottom.close();
                }, 1500)
            }
        } //function getFileContentAsBase64(path,callback){
        getFileContentAsBase64()

    }) //$('body').find('#file').change(function()     
}) //$(document).on('page:init', '.page[data-page="edit"]', function(e) 